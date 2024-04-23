import { Dispatch, SetStateAction, useState, useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Loader from "components/loader/Loader";
import {useGetRijksAPIByTypeQuery} from "../../../../redux/apis/RijksMuseumAPI";
import useRijksPagination from "./RijksPagination";
  interface TypeSelection {
    setTypeBoolean:Dispatch<SetStateAction<string>>   
    setPg:Dispatch<SetStateAction<number>>
    setCount:Dispatch<SetStateAction<number>>   
    setData: any
   
  }

export default function SelectTypes({setTypeBoolean, setPg, setCount, setData}:TypeSelection) {
  const [type, setType] = useState(``)
  const {data:rijksApiType, isFetching } = useGetRijksAPIByTypeQuery(type)
  const objectByType = rijksApiType?.facets?.filter((el: { name: string; }) => el.name ==="type")  
  
  // let [page, setPage] = useState(1);
  const PER_PAGE = 4;
  const dataSearch = useRijksPagination(rijksApiType?.artObjects, PER_PAGE);
  const count = Math.ceil(rijksApiType?.artObjects?.length / PER_PAGE); 

  const handleChange = (event: { target: { value: SetStateAction<string>}}) => {   
    setType(event.target.value);   
    setPg(1); 
    // setCondition(event.target.value)
    // setTypeBoolean(type) 
  };
  
  // console.log(type, rijksApiType)
  
  useEffect(()=>{  
    setTypeBoolean(type) 
    setCount(count)
    setData(dataSearch)      
  },[count, dataSearch, setCount, setData, setTypeBoolean, type])  

  if(isFetching)return <Loader/>
  // if (isLoading) return <Loader />;

  return(
      <div className='bg-white m-5 w-48 ' >   
      <FormControl variant="filled" sx={{ m: 1, minWidth: 176 }} >
        <InputLabel id="demo-simple-select-filled-label"  >Select Type </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"       
          value={type}
          onChange={handleChange}
        >
          <MenuItem value="" >
            <em>None</em>
          </MenuItem>
          {objectByType?.[0]?.facets?.map(({key}:{key:string}) => (
             <MenuItem           
             key={key}
             value={key}           
           >
             {key}
           </MenuItem>
         ))}        
         
        </Select>
      </FormControl>       
    </div>
  )
}


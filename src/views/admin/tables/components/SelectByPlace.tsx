import { Dispatch, SetStateAction, useState, useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Loader from "components/loader/Loader";
import {useGetRijksAPIByPlaceQuery} from "../../../../redux/apis/RijksMuseumAPI";
import useRijksPagination from "./RijksPagination";

  interface TypeSelection {
    setTypeBoolean:Dispatch<SetStateAction<string>>    
    setPg:Dispatch<SetStateAction<number>>
    setCount:Dispatch<SetStateAction<number>>  
    setData: any      
  }

export default function SelectByPlace({setTypeBoolean, setPg, setCount, setData}:TypeSelection) {
  const [place, setPlace] = useState(``)
  const {data:rijksApiPlace, isLoading } = useGetRijksAPIByPlaceQuery(place)

  const objectByType = rijksApiPlace?.facets?.filter((el: { name: string; }) => el.name ==="place"
)

// const placeAsc = new Set(objectByType)  
  // console.log(rijksApiPlace)
 
  const PER_PAGE = 4;
  const dataSearch = useRijksPagination(rijksApiPlace?.artObjects, PER_PAGE);
  const count = Math.ceil(rijksApiPlace?.artObjects?.length / PER_PAGE);  

  const handleChange = (event: { target: { value: SetStateAction<string>}}) => {   
    setPlace(event.target.value);   
    setPg(1);  
    setTypeBoolean(place) 
  }; 
  
  // console.log(rijksApiPlace)
  
  useEffect(()=>{  
    setTypeBoolean(place) 
    setCount(count)
    setData(dataSearch)        
  },[count, dataSearch, setCount, setData, setTypeBoolean, place])  

  // if(isFetching)return <Loader/> 
  if(isLoading)return <Loader/> 

  return(
      <div className='bg-white'>        
      <FormControl variant="filled" sx={{ m: 1, minWidth: 150 } }>
        <InputLabel id="demo-simple-select-filled-label" >Select Place </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"       
          value={place}
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


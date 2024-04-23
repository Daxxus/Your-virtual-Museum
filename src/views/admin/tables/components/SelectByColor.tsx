import { Dispatch, SetStateAction, useState, useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Loader from "components/loader/Loader";
import {useGetRijksAPIByColorQuery} from "../../../../redux/apis/RijksMuseumAPI";
import useRijksPagination from "./RijksPagination";

  interface TypeSelection {
    setTypeBoolean:Dispatch<SetStateAction<string>>    
    setPg:Dispatch<SetStateAction<number>>
    setCount:Dispatch<SetStateAction<number>>  
    setData: any      
  }

export default function SelectByColor({setTypeBoolean, setPg, setCount, setData}:TypeSelection) {
  const [dataColor, setColor] = useState(``)
  const {data:rijksApiColor, isLoading } = useGetRijksAPIByColorQuery(dataColor)

  const objectByType = rijksApiColor?.facets?.filter((el: { name: string; }) => el.name ==="normalized32Colors.hex"
) 
  const PER_PAGE = 4;
  const dataSearch = useRijksPagination(rijksApiColor?.artObjects, PER_PAGE);
  const count = Math.ceil(rijksApiColor?.artObjects?.length / PER_PAGE);  

  const handleChange = (event: { target: { value: SetStateAction<string>}}) => {   
    setColor(event.target.value);   
    setPg(1);  
    setTypeBoolean(dataColor) 
  };  
  // console.log(rijksApiColor)
  
  useEffect(()=>{  
    setTypeBoolean(dataColor) 
    setCount(count)
    setData(dataSearch)        
  },[count, dataSearch, setCount, setData, setTypeBoolean, dataColor])  
 
  if(isLoading)return <Loader/> 

  return(
      <div className='bg-white'>        
      <FormControl variant="filled" sx={{ m: 1, minWidth: 150 } }>
        <InputLabel id="demo-simple-select-filled-label" >Select Color </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"       
          value={dataColor}
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


import { Dispatch, SetStateAction, useState, useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Loader from "components/loader/Loader";
import {useGetRijksAPIByTechniqueQuery} from "../../../../redux/apis/RijksMuseumAPI";
import useRijksPagination from "./RijksPagination";

  interface TypeSelection {
    setTypeBoolean:Dispatch<SetStateAction<string>>    
    setPg:Dispatch<SetStateAction<number>>
    setCount:Dispatch<SetStateAction<number>>  
    setData: any      
  }

export default function SelectByTechnique({setTypeBoolean, setPg, setCount, setData}:TypeSelection) {
  const [technique, setTechnique] = useState(``)
  const {data:rijksApiTechnique, isLoading } = useGetRijksAPIByTechniqueQuery(technique)

  const objectByType = rijksApiTechnique?.facets?.filter((el: { name: string; }) => el.name ==="technique"
)
 
  const PER_PAGE = 4;
  const dataSearch = useRijksPagination(rijksApiTechnique?.artObjects, PER_PAGE);
  const count = Math.ceil(rijksApiTechnique?.artObjects?.length / PER_PAGE);  

  const handleChange = (event: { target: { value: SetStateAction<string>}}) => {   
    setTechnique(event.target.value);   
    setPg(1);  
    setTypeBoolean(technique) 
  };  
  
  useEffect(()=>{  
    setTypeBoolean(technique) 
    setCount(count)
    setData(dataSearch)        
  },[count, dataSearch, setCount, setData, setTypeBoolean, technique])  
 
  if(isLoading)return <Loader/> 

  return(
    <div className='bg-white m-5 w-48 ' >   
    <FormControl variant="filled" sx={{ m: 1, minWidth: 176 }} >
        <InputLabel id="demo-simple-select-filled-label" >Select Technique </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"       
          value={technique}
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


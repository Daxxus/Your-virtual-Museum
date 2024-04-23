import { Dispatch, SetStateAction, useState, useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Loader from "components/loader/Loader";
import {useGetRijksAPIByMaterialQuery} from "../../../../redux/apis/RijksMuseumAPI";
import useRijksPagination from "./RijksPagination";

  interface TypeSelection {
    setTypeBoolean:Dispatch<SetStateAction<string>>    
    setPg:Dispatch<SetStateAction<number>>
    setCount:Dispatch<SetStateAction<number>>  
    setData: any      
  }

export default function SelectByMaterial({setTypeBoolean, setPg, setCount, setData}:TypeSelection) {
  const [material, setMaterial] = useState(``)
  const {data:rijksApiMaterial, isLoading } = useGetRijksAPIByMaterialQuery(material)

  const objectByType = rijksApiMaterial?.facets?.filter((el: { name: string; }) => el.name ==="material"
)

// const materialAsc = new Set(objectByType)  
  // console.log(rijksApiMaterial)
 
  const PER_PAGE = 4;
  const dataSearch = useRijksPagination(rijksApiMaterial?.artObjects, PER_PAGE);
  const count = Math.ceil(rijksApiMaterial?.artObjects?.length / PER_PAGE);  

  const handleChange = (event: { target: { value: SetStateAction<string>}}) => {   
    setMaterial(event.target.value);   
    setPg(1);  
    setTypeBoolean(material) 
  }; 
  
  // console.log(rijksApiMaterial)
  
  useEffect(()=>{  
    setTypeBoolean(material) 
    setCount(count)
    setData(dataSearch)        
  },[count, dataSearch, setCount, setData, setTypeBoolean, material])  

  // if(isFetching)return <Loader/> 
  if(isLoading)return <Loader/> 

  return(
    <div className='bg-white m-5 w-48 ' >   
    <FormControl variant="filled" sx={{ m: 1, minWidth: 176 }} >
        <InputLabel id="demo-simple-select-filled-label" >Select Material </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"       
          value={material}
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


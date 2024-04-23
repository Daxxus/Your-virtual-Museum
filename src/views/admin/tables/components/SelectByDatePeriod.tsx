import { Dispatch, SetStateAction, useState, useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Loader from "components/loader/Loader";
import {useGetRijksAPIByDatePeriodQuery} from "../../../../redux/apis/RijksMuseumAPI";
import useRijksPagination from "./RijksPagination";

  interface TypeSelection {
    setTypeBoolean:Dispatch<SetStateAction<string>>    
    setPg:Dispatch<SetStateAction<number>>
    setCount:Dispatch<SetStateAction<number>>  
    setData: any      
  }

export default function SelectByDatePeriod({setTypeBoolean, setPg, setCount, setData}:TypeSelection) {
  const [datePeriod, setDatePeriod] = useState(``)
  const {data:rijksApiDatePeriod, isLoading } = useGetRijksAPIByDatePeriodQuery(datePeriod)

  const objectByType = rijksApiDatePeriod?.facets?.filter((el: { name: string; }) => el.name ==="dating.period"
)
 
  const PER_PAGE = 4;
  const dataSearch = useRijksPagination(rijksApiDatePeriod?.artObjects, PER_PAGE);
  const count = Math.ceil(rijksApiDatePeriod?.artObjects?.length / PER_PAGE);  

  const handleChange = (event: { target: { value: SetStateAction<string>}}) => {   
    setDatePeriod(event.target.value);   
    setPg(1);  
    setTypeBoolean(datePeriod) 
  };  
  
  useEffect(()=>{  
    setTypeBoolean(datePeriod) 
    setCount(count)
    setData(dataSearch)        
  },[count, dataSearch, setCount, setData, setTypeBoolean, datePeriod])  
 
  if(isLoading)return <Loader/> 

  return(
      <div className='bg-white'>        
      <FormControl variant="filled" sx={{ m: 1, minWidth: 180 } }>
        <InputLabel id="demo-simple-select-filled-label" >Select Date Period </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"       
          value={datePeriod}
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


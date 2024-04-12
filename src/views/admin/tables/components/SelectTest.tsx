import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Loader from "components/loader/Loader";
import {useGetRijksAPIByTypeQuery } from "../../../../redux/apis/RijksMuseumAPI";
import useRijksPagination from "./RijksPagination";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import RijksCard from "./RijksCard";
interface RijksProps  {
    links:{}
    longTitle:string
    productionPlaces:string[]
    principalOrFirstMaker: string
    webImage:string
    id:string
  }

export default function SelectVariants() {
  const [type, setType] = useState('')
  const {data:rijksApiType, isFetching } = useGetRijksAPIByTypeQuery(type)
  const objectByType = rijksApiType?.facets?.filter((el: { name: string; }) => el.name ==="type")
  const [selectedType, setSelectedType] = useState(false)

  let [page, setPage] = useState(1);
  const PER_PAGE = 4;
  const dataSearch = useRijksPagination(rijksApiType?.artObjects, PER_PAGE);
  const count = Math.ceil(rijksApiType?.artObjects?.length / PER_PAGE);

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
    setPage(1);
    setSelectedType(true)
  };

  const handlePagination = (e: React.ChangeEvent<unknown>, pg: number) => {
    setPage(pg);
    dataSearch.jump(pg); 
  }

  if(isFetching)return <Loader/>
//   console.log(rijksApiType)
//   console.log(type)
//   console.log(count)

  return (
    <div className='bg-white'>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 } }>
        <InputLabel id="demo-simple-select-filled-label" >Select Type </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
        //   className="bg-white"
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
      <Stack spacing={2}> 
              <div className="mt-1 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">

                {selectedType &&  dataSearch?.currentData()?.map(({links, longTitle, productionPlaces, principalOrFirstMaker, webImage,id}:RijksProps)=> (
                  <RijksCard key={id} link={links} title={longTitle} place={productionPlaces} web={webImage} maker={principalOrFirstMaker} />
                ) )}  
              </div> 

              <div>  
                {selectedType && 
                <Pagination                
                  showFirstButton 
                  showLastButton
                  count={count}                  
                  size="large"
                  page={page}
                  variant="text"  
                  sx={{button:{color: '#ffffff'}}}            
                  // shape="rounded"
                  color="primary"
                  onChange={handlePagination}
                /> }                    
              </div>
           </Stack>
    </div>
  );
}


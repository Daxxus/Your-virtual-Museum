import { useGetRijksAPIByNameQuery } from "../../../redux/apis/RijksMuseumAPI";
// import { useGetHarvardApiTypeQuery } from "../../../redux/apis/HarvardMuseumApi";
import Loader from "components/loader/Loader";
import React, { useState } from "react";
import Pagination from '@mui/material/Pagination';
import useRijksPagination from "./components/RijksPagination";

import Stack from '@mui/material/Stack';
// import { Select, Option } from '@mui/joy';
import RijksCard from "./components/RijksCard";
import MultipleSelectChip from "./components/SelectMulti";
import Container from '@mui/material/Container';
import { color } from "@chakra-ui/system";
import { colors } from "@mui/material";
interface RijksProps  {
  links:{}
  longTitle:string
  productionPlaces:string[]
  principalOrFirstMaker:string
  webImage:string
}

const Tables = () => { 
  const {data, isLoading} = useGetRijksAPIByNameQuery(``)
  const rijksApi = undefined ?? data
  console.log(rijksApi)

  let [page, setPage] = useState(1);
  const PER_PAGE = 4;
  const _DATA = useRijksPagination(rijksApi?.artObjects, PER_PAGE);
  const count = Math.ceil(rijksApi?.artObjects.length / PER_PAGE);

  const handleChange = (e: React.ChangeEvent<unknown>, pg: number) => {
    setPage(pg);
    _DATA.jump(pg);
  };
  // console.log(rijksData)
  //  console.log(useGetHarvardApiTypeQuery(`gallery`))

if(isLoading)return <Loader/>
  
  return (
    <main>
      <div className="bg-rijksMusem  bg-fixed sm:bg-local md:bg-scroll lg:bg-local xl:bg-fixed ...">         
     
          <Container maxWidth="sm" >         
              <div className="flex justify-center py-24 " >        
                <MultipleSelectChip selByName={rijksApi.facets} />
              </div>          
          </Container>
          
          <Stack spacing={2}> 
              <div className="mt-1 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">
                {_DATA.currentData().map(({links, longTitle, productionPlaces, principalOrFirstMaker, webImage}:RijksProps)=> (
                  <RijksCard key={longTitle} link={links} title={longTitle} place={productionPlaces} web={webImage} maker={principalOrFirstMaker} />
                ) )}        
              </div> 

              <div            
                className=""
              >                
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
                  onChange={handleChange}
                />
              </div>
             </Stack>
          
      </div>
    </main>
    
  );
};

export default Tables;

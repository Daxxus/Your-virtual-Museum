import { useGetRijksAPIByNameQuery, useGetRijksAPIByTypeQuery } from "../../../redux/apis/RijksMuseumAPI";
// import { useGetHarvardApiTypeQuery } from "../../../redux/apis/HarvardMuseumApi";
import Loader from "components/loader/Loader";
import React, { useState, useEffect } from "react";
import Pagination from '@mui/material/Pagination';
import useRijksPagination from "./components/RijksPagination";
import RijksSearch from "./components/RijksSearch";
import Stack from '@mui/material/Stack';
// import {Select, Option } from "@material-tailwind/react";
import RijksCard from "./components/RijksCard";
import MultipleSelectChip from "./components/SelectMulti";
import Container from '@mui/material/Container';
import SelectVariants from "./components/SelectTest";
interface RijksProps  {
  links:{}
  longTitle:string
  productionPlaces:string[]
  principalOrFirstMaker: string
  webImage:string
  id:string
}

const Tables = () => { 
  const {data: rijksApiSearch, isLoading} = useGetRijksAPIByNameQuery([])
  // const rijksApiSearch = undefined ?? data
  const [rijksNameSearch, setRijksNameSearch] = useState(rijksApiSearch?.artObjects)
  const [searchedName, setSearchedName] = useState("") 
  
  const {data:rijksApiType, isFetching } = useGetRijksAPIByTypeQuery(``)
  const [rijksTypeSelect, setRijksTypeSelect ] = useState(rijksApiType?.artObjects)
  const [selectedType, setSelectedType] = useState(``)
 
  const objectByType = rijksApiType?.facets?.filter((el: { name: string; }) => el.name ==="type")

  useEffect(()=> {
    const filterByName = rijksApiSearch?.artObjects?.filter((el: { principalOrFirstMaker: string; }) => el.principalOrFirstMaker.toLowerCase().includes(searchedName.toLowerCase()))     
    setRijksNameSearch(filterByName)
  },[ searchedName, rijksApiSearch ] )
  
  let [page, setPage] = useState(1);
  const PER_PAGE = 4;
  const dataSearch = useRijksPagination(rijksNameSearch, PER_PAGE);
  const count = Math.ceil(rijksNameSearch?.length / PER_PAGE);

  // console.log(rijksNameSearch)
  // console.log(rijksTypeSelect)
  // const selectByType = useRijksPagination(rijksTypeSearch, PER_PAGE)
  // const countType = Math.ceil(rijksTypeSearch?.length / PER_PAGE);

  const handleChange = (e: React.ChangeEvent<unknown>, pg: number) => {
    setPage(pg);
    dataSearch.jump(pg);    
  };

  //  console.log(useGetHarvardApiTypeQuery(`gallery`))
  // !isLoading ? <p>Loading...</p> : <div>Render actual content</div> 
if(isLoading)return <Loader/>
// if(isFetching)return <Loader/>
  
// rijksTypeSelect && console.log(rijksTypeSelect)     
  return (
    <main>
      <div className="bg-rijksMusem min-h-screen bg-cover bg-top bg-fixed sm:bg-local md:bg-scroll lg:bg-local xl:bg-fixed ...">         
          <RijksSearch search={(e: { target: { value: string; }; })=>setSearchedName(e.target.value.toLowerCase())}/>

          {/* <div className="mx-96 bg-white"  >       

          </div>      */}

          <Container maxWidth="sm" >         
             <div className="flex justify-center py-24 " >        
              {/* <MultipleSelectChip selectType={rijksApiType?.facets} /> */}
               <SelectVariants/>
             </div>    
          </Container>      
          
          <Stack spacing={2}> 
              <div className="mt-1 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">

                {searchedName &&  dataSearch?.currentData()?.map(({links, longTitle, productionPlaces, principalOrFirstMaker, webImage,id}:RijksProps)=> (
                  <RijksCard key={id} link={links} title={longTitle} place={productionPlaces} web={webImage} maker={principalOrFirstMaker} />
                ) )}  
              </div> 

              <div>  
                {searchedName && 
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
                /> }                    
              </div>
           </Stack>           

      </div>     
    </main>
    
  );
};

export default Tables;

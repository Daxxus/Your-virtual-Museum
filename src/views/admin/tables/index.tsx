import {useGetRijksAPIByNameQuery, useGetRijksAPIByTypeQuery} from "../../../redux/apis/RijksMuseumAPI";
import Loader from "components/loader/Loader";
import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import useRijksPagination from "./components/RijksPagination";
import RijksSearch from "./components/RijksSearch";
import Stack from "@mui/material/Stack";
import RijksCard from "./components/RijksCard";
// import MultipleSelectChip from "./components/SelectMulti";
import Container from "@mui/material/Container";
import SelectTypes from "./components/SelectTest";
import SelectByMaker from "./components/SelectByMaker";
import SelectByPlace from "./components/SelectByPlace";

interface RijksProps {
  links: {};
  longTitle: string;
  productionPlaces: string[];
  principalOrFirstMaker: string;
  webImage: string;
  id: string;
}
//  console.log(useGetHarvardApiTypeQuery(`gallery`))

const Tables = () => {
  const { data: rijksApiSearch, isLoading } = useGetRijksAPIByNameQuery([]);
  // const rijksApiSearch = undefined ?? data
  const [rijksNameSearch, setRijksNameSearch] = useState(rijksApiSearch?.artObjects);
  const [searchedName, setSearchedName] = useState("");
  const [count, setCount] = useState(0)
  let [dataType, setDataType] = useState(undefined)
  let [dataMaker, setDataMaker] = useState(undefined)
  let [dataPlace, setDataPlace] = useState(undefined)
 
  let [selectedType, setSelectedType] = useState(``)
  let [selectedMaker, setSelectedMaker] = useState(``)
  let [selectedPlace, setSelectedPlace] = useState(``)
      
  // const condition = () => {     
  //   if(selectedType){            
  //     // console.log(selectedType) 
  //     //  setSelectedMaker(``) 
  //     return type 
  //   } else if(selectedMaker){
  //     // console.log(selectedMaker) 
  //     return maker
  //   } else if(selectedPlace){
  //     // console.log(selectedDatePeriod) 
  //     return placeSpan
  //   }
  // }  
  
  useEffect(() => {  
    const filterByName = rijksApiSearch?.artObjects?.filter(
      (el: { principalOrFirstMaker: string }) =>
        el.principalOrFirstMaker
      .toLowerCase()
      .includes(searchedName.toLowerCase())
    );
    setRijksNameSearch(filterByName);      
  }, [searchedName, rijksApiSearch]);
  
  let [page, setPage] = useState(1);
  const PER_PAGE = 4;
  const dataSearch = useRijksPagination(rijksNameSearch , PER_PAGE)
  const countSearch = Math.ceil(rijksNameSearch?.length / PER_PAGE);
  
  
  const handlePagination = (e: React.ChangeEvent<unknown>, pg: number) => {
    setPage(pg);
    dataSearch.jump(pg);
    dataType.jump(pg);
    dataPlace.jump(pg);
    dataMaker.jump(pg);
    // setCount(Math.ceil(rijksNameSearch?.length / PER_PAGE))    
  };
  
   const type = dataType?.currentData()?.map(({links, longTitle, productionPlaces,     principalOrFirstMaker, webImage,id}:RijksProps)=> ( 
    <RijksCard key={id} link={links} title={longTitle} place={productionPlaces} web={webImage} maker={principalOrFirstMaker} />))
    
    const maker = dataMaker?.currentData()?.map(({links, longTitle, productionPlaces,     principalOrFirstMaker, webImage,id}:RijksProps)=> ( 
    <RijksCard key={id} link={links} title={longTitle} place={productionPlaces} web={webImage} maker={principalOrFirstMaker} />))  
    
    const place = dataPlace?.currentData()?.map(({links, longTitle, productionPlaces,     principalOrFirstMaker, webImage,id}:RijksProps)=> ( 
      <RijksCard key={id} link={links} title={longTitle} place={productionPlaces} web={webImage} maker={principalOrFirstMaker} />))       
      
      
    const selType = selectedType && type
    const selMaker = selectedMaker && maker
    const selPlace = selectedPlace && place

    // console.log(selType, selMaker, selPlace)
    if (isLoading) return <Loader />; 
 
  // console.log(dataType?.currentData())
  return (
    <main>
      <div className="... min-h-screen bg-rijksMusem bg-cover bg-fixed bg-top sm:bg-local md:bg-scroll lg:bg-local xl:bg-fixed">
        {/* <RijksSearch
          search={(e: { target: { value: string } }) =>
            setSearchedName(e.target.value.toLowerCase())
          }
        /> */}

        <Container maxWidth="sm">
          <div className="flex justify-center  bg-white ">         
            <SelectTypes setTypeBoolean={setSelectedType} setPg={setPage} setCount={setCount} setData={setDataType} />
            <SelectByMaker setTypeBoolean={setSelectedMaker} setPg={setPage} setCount={setCount} setData={setDataMaker} />            
            <SelectByPlace setTypeBoolean={setSelectedPlace} setPg={setPage} setCount={setCount} setData={setDataPlace} />            
          </div>
        </Container>
          <Stack spacing={2}>
            <div className="mt-1 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">           
              {selType}   {selPlace}  {selMaker}         
            </div>
            <div>
              {/* {pagina()} */}
              {(selType || selMaker || selPlace) && (
                  <Pagination
                    showFirstButton
                    showLastButton
                    count={count}
                    size="large"
                    page={page}
                    variant="text"
                    sx={{ button: { color: "#ffffff" } }}
                    // shape="rounded"
                    color="primary"
                    onChange={handlePagination}
                  />)}
            </div>
          </Stack>
      </div>
    </main>
  );
};

export default Tables;

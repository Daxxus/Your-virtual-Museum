// import {useGetRijksAPIByNameQuery} from "../../../redux/apis/RijksMuseumAPI";
// import Loader from "components/loader/Loader";
import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
// import useRijksPagination from "./components/RijksPagination";
// import RijksSearch from "./components/RijksSearch";
import Stack from "@mui/material/Stack";
import RijksCard from "./components/RijksCard";

import Container from "@mui/material/Container";
import SelectTypes from "./components/SelectTest";
import SelectByMaker from "./components/SelectByMaker";
import SelectByPlace from "./components/SelectByPlace";
import SelectByMaterial from "./components/SelectByMaterial";
import SelectByTechnique from "./components/SelectByTechnique";
// import SelectByDatePeriod from "./components/SelectByDatePeriod";
// import SelectByColor from "./components/SelectByColor";
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
  // const { data: rijksApiSearch, isLoading } = useGetRijksAPIByNameQuery([]);
  // const rijksApiSearch = undefined ?? data
  // const [rijksNameSearch, setRijksNameSearch] = useState(rijksApiSearch?.artObjects);
  // const [searchedName, setSearchedName] = useState("");
  const [count, setCount] = useState(0)
  const [dataType, setDataType] = useState(undefined)
  const [dataMaker, setDataMaker] = useState(undefined)
  const [dataPlace, setDataPlace] = useState(undefined)
  const [dataMaterial, setDataMaterial] = useState(undefined)
  const [dataTechnique, setDataTechnique] = useState(undefined)
  // const [dataDatePeriod, setDataDatePeriod] = useState(undefined)
  // const [dataColor, setDataColor] = useState(undefined)
 
  const [selectedType, setSelectedType] = useState(``)
  const [selectedMaker, setSelectedMaker] = useState(``)
  const [selectedPlace, setSelectedPlace] = useState(``)
  const [selectedMaterial, setSelectedMaterial] = useState(``)
  const [selectedTechnique, setSelectedTechnique] = useState(``)
  // const [selectedDatePeriod, setSelectedDatePeriod] = useState(``)
  // const [selectedColor, setSelectedColor] = useState(``)
  
  // useEffect(() => {  
  //   const filterByName = rijksApiSearch?.artObjects?.filter(
  //     (el: { principalOrFirstMaker: string }) =>
  //       el.principalOrFirstMaker
  //     .toLowerCase()
  //     .includes(searchedName.toLowerCase())
  //   );
  //   setRijksNameSearch(filterByName);      
  // }, [searchedName, rijksApiSearch]);
  
  let [page, setPage] = useState(1);
  // const PER_PAGE = 4;
  // const dataSearch = useRijksPagination(rijksNameSearch , PER_PAGE)
  // const countSearch = Math.ceil(rijksNameSearch?.length / PER_PAGE);
  
  
  const handlePagination = (e: React.ChangeEvent<unknown>, pg: number) => {
    setPage(pg);
    // dataSearch.jump(pg);
    dataType.jump(pg);
    dataPlace.jump(pg);
    dataMaker.jump(pg);
    dataMaterial.jump(pg)
    dataTechnique.jump(pg)
    // dataDatePeriod.jump(pg)
    // setCount(Math.ceil(rijksNameSearch?.length / PER_PAGE))    
  };
  
   const type = dataType?.currentData()?.map(({links, longTitle, productionPlaces,     principalOrFirstMaker, webImage,id}:RijksProps)=> ( 
    <RijksCard key={id} link={links} title={longTitle} place={productionPlaces} web={webImage} maker={principalOrFirstMaker} />))
    
    const maker = dataMaker?.currentData()?.map(({links, longTitle, productionPlaces,     principalOrFirstMaker, webImage,id}:RijksProps)=> ( 
    <RijksCard key={id} link={links} title={longTitle} place={productionPlaces} web={webImage} maker={principalOrFirstMaker} />))  
    
    const place = dataPlace?.currentData()?.map(({links, longTitle, productionPlaces,     principalOrFirstMaker, webImage,id}:RijksProps)=> ( 
      <RijksCard key={id} link={links} title={longTitle} place={productionPlaces} web={webImage} maker={principalOrFirstMaker} />))   

    const material = dataMaterial?.currentData()?.map(({links, longTitle, productionPlaces,     principalOrFirstMaker, webImage,id}:RijksProps)=> ( 
      <RijksCard key={id} link={links} title={longTitle} place={productionPlaces} web={webImage} maker={principalOrFirstMaker} />))    

    const technique = dataTechnique?.currentData()?.map(({links, longTitle, productionPlaces,     principalOrFirstMaker, webImage,id}:RijksProps)=> ( 
      <RijksCard key={id} link={links} title={longTitle} place={productionPlaces} web={webImage} maker={principalOrFirstMaker} />))   

    // const datePeriod = dataDatePeriod?.currentData()?.map(({links, longTitle, productionPlaces,     principalOrFirstMaker, webImage,id}:RijksProps)=> ( 
    //   <RijksCard key={id} link={links} title={longTitle} place={productionPlaces} web={webImage} maker={principalOrFirstMaker} />))        
      
    const selType = selectedType && type
    const selMaker = selectedMaker && maker
    const selPlace = selectedPlace && place
    const selMaterial = selectedMaterial && material
    const selTechnique = selectedTechnique && technique
    // const selDataPeriod = selectedDatePeriod && datePeriod     
  
  return (
    <main>
      <div className="... min-h-screen bg-rijksMusem bg-cover bg-fixed bg-top sm:bg-local md:bg-scroll lg:bg-local xl:bg-fixed">
        {/* <RijksSearch
          search={(e: { target: { value: string } }) =>
            setSearchedName(e.target.value.toLowerCase())
          }
        /> */}

        <Container maxWidth="lg" className="" >
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5 justify-center" >         
           <SelectTypes setTypeBoolean={setSelectedType} setPg={setPage} setCount={setCount} setData={setDataType} />
            <SelectByMaker setTypeBoolean={setSelectedMaker} setPg={setPage} setCount={setCount} setData={setDataMaker} />            
            <SelectByPlace setTypeBoolean={setSelectedPlace} setPg={setPage} setCount={setCount} setData={setDataPlace} />            
            <SelectByMaterial setTypeBoolean={setSelectedMaterial} setPg={setPage} setCount={setCount} setData={setDataMaterial} />            
            <SelectByTechnique setTypeBoolean={setSelectedTechnique} setPg={setPage} setCount={setCount} setData={setDataTechnique} />       
          </div> 
        </Container>
          <Stack spacing={2} mx={2}>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">           
              {selType} {selPlace} {selMaker} {selMaterial} {selTechnique}    
            </div>
            <div>              
              {(selType || selMaker || selPlace || selMaterial || selTechnique) && (
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

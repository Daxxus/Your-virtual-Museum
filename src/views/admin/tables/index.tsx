// import tableDataDevelopment from "./variables/tableDataDevelopment";
// import tableDataCheck from "./variables/tableDataCheck";
// import CheckTable from "./components/CheckTable";
// import tableDataColumns from "./variables/tableDataColumns";
// import tableDataComplex from "./variables/tableDataComplex";
// import DevelopmentTable from "./components/DevelopmentTable";
// import ColumnsTable from "./components/ColumnsTable";
// import ComplexTable from "./components/ComplexTable";
import { useGetRijksAPIByNameQuery } from "../../../redux/apis/RijksMuseumAPI";
// import { useGetHarvardApiTypeQuery } from "../../../redux/apis/HarvardMuseumApi";
import Loader from "components/loader/Loader";
// import { Select, Option } from '@mui/joy';
import RijksCard from "./components/RijksCard";
import MultipleSelectChip from "./components/SelectMulti";

const Tables = () => { 
  const {data, isLoading} = useGetRijksAPIByNameQuery(``)

  const rijksApi = undefined ?? data
  console.log(rijksApi)

  //  console.log(useGetHarvardApiTypeQuery(`gallery`))


if(isLoading)return <Loader/>
  
  return (
    <main>
      <div className="bg-rijksMusem w-full h-screen bg-fixed sm:bg-local md:bg-scroll lg:bg-local xl:bg-fixed ...">   
        <div className="mt-10" >        
          <MultipleSelectChip selByName={rijksApi.facets}/>
        </div>
     
      <div className="mt-5 h-full">
        <RijksCard/>
      </div>

      {/* <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2"></div> */}
    </div>
    </main>
    
  );
};

export default Tables;

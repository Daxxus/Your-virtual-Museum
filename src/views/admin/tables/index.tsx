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
// import BG from "./Images/amsterdam-2014855_1920.jpg"

const Tables = () => {
 
  const {data:rijksApi, isLoading} = useGetRijksAPIByNameQuery(`Rembrandt+van+Rijn`)

  console.log(rijksApi)

  //  console.log(useGetHarvardApiTypeQuery(`gallery`))


if(isLoading)return <Loader/>
  
  return (
    <div 
    className="bg-rijksMusem w-screen h-screen bg-fixed sm:bg-local md:bg-scroll lg:bg-local xl:bg-fixed ..."  
    
      >      
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        {/* <DevelopmentTable tableData={tableDataDevelopment} /> */}
        {/* <CheckTable tableData={tableDataCheck} /> */}
      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        {/* <ColumnsTable tableData={tableDataColumns} /> */}

        {/* <ComplexTable tableData={tableDataComplex} /> */}
      </div>
    </div>
  );
};

export default Tables;

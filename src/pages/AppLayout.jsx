//import { useState } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import AccomodationGraph from "../features/accomodation_graph/AccomodationGraph";
import AverageCosts from "../features/average_costs/AverageCosts";
import SearchBar from "../features/city_search/SearchBar";
import CostGraph from "../features/cost_graph/CostGraph";
import Expenses from "../features/expenses/Expenses";
import Header from "../ui/Header";
import useWindowDimensions from "../ui/useWindowSize";
import Loader from "../ui/Loader";
import Home from "../ui/Home";
import Error from "../ui/Error";

function AppLayout({showBar}) {
    const data = useSelector(state => state.costOfLiving);
    const [expandBar, setExpandBar] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);

    const {height, width} = useWindowDimensions();
    console.log(height, width);

    return(
        <>   
        <div className ={`bg-stone-200 w-full relative h-dvh ${width > 1080? "grid grid-rows-[1fr] grid-cols-[1fr_6fr]": ""}`}>
            <SearchBar showBar={showBar} width={width} expandBar={expandBar} showFormModal={showFormModal} setShowFormModal={setShowFormModal}/>

            {data.loading && <Loader />}

            {!data.loading && data.error !== "" && (
                <Error error={data.error} />
            )}

            {!data.loading && data.error === "" && data.city === "" && (
                <Home setExpandBar={setExpandBar} expandBar={expandBar} showFormModal={showFormModal} setShowFormModal={setShowFormModal}/>
            )}
            
           { (!data.loading && data.error === "" && data.city !== "") && <div className="bg-stone-200 sm:grid  
            flex flex-col gap-2
            xl:h-250
            sm:h-415
            md:h-auto
            xl:grid-rows-[0.3fr_0.3fr_3fr_3fr] 
            xl:grid-cols-[1fr_1fr-1fr_1fr] 
            xl:gap-3 px-10  pb-10 sm:pt-7 pt-5
            ">
                <Header />
                <AverageCosts width={width} data={data}/>
                <CostGraph data={data}/>
                <AccomodationGraph dataCity={data}/>
                <Expenses data={data}/>
            </div>}
 
        </div>
        </>

    )
}

export default AppLayout;
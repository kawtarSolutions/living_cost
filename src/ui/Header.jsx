import { useSelector } from "react-redux";


function Header() {
    const city = useSelector(state => state.costOfLiving.city);
    const country = useSelector(state => state.costOfLiving.country);
    return(
        <div className="bg-stone-200 xl:col-span-2 flex items-center justify-between pb-0">
            <h1 className="sm:text-xl md:text-2xl text-lg font-semibold tracking-wide">Dashboard</h1>
            <div className="flex gap-2">
                <p className="text-sm sm:text-base sm:font-stretch-normal capitalize">In {city},</p>
                <p className="text-sm sm:text-base sm:font-stretch-normal capitalize">{country}</p>
            </div>
        </div>
    )
}

export default Header;
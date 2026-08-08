function Cost({value, title, children}) {
    return(
        <div className="bg-stone-100 sm:h-19 w-full h-15 
        rounded-lg
        flex gap-2 items-center p-4 shadow-md 
        hover:shadow-lg transition-shadow duration-300 border border-blue-100">
            {children}
            <div className="flex flex-row sm:flex-col xl:flex-row
            sm:justify-between font-medium uppercase w-full gap-3 sm:gap-1">
                <p className="text-xs sm:text-sm md:text-md text-stone-600 font-semibold">{title !== "mode" && title}</p>
                <p className="text-xs sm:text-sm text-stone-600 font-bold">
                  {title === "mode"? `${value} ${title}`: `${value}$`}
                </p> 
            </div>      
        </div>
    )
}

export default Cost;




/*  function Cost({value, title, children}) {
    return(
        <div className="bg-stone-100 sm:h-19 w-full h-15 
        rounded-lg md:w-45 md:gap-2 lg:w-55 xl:w-65 2xl:w-82
        flex gap-2 items-center p-4 shadow-md 
        hover:shadow-lg transition-shadow duration-300 border border-blue-100">
            {children}
            <div className="flex flex-row md:flex-col xl:flex-row
            justify-between font-medium uppercase w-full">
                <p className="text-sm text-stone-600 font-semibold">{title !== "mode" && title}</p>
                <p className="text-sm text-stone-600 font-bold">
                  {title === "mode"? `${value} ${title}`: `${value} $`}
                </p> 
            </div>      
        </div>
    )
}

export default Cost;*/
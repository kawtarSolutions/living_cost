function BarIcon({setShowBar}) {
    return(
        <div className="z-100 left-1 top-5 absolute sm:top-8 bg-stone-100 flex flex-col gap-1 w-7 h-7 p-2 rounded-full" 
        onClick={() => setShowBar(x => !x)}>
            <div className="border border-stone-900 w-3"></div>
            <div className="border border-stone-900 w-3"></div>
            <div className="border border-stone-900 w-3"></div>
        </div>
    )
}

export default BarIcon;
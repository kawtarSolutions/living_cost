import { useSelector } from "react-redux";

function DetailedExpense({ items }) {
    const mode = useSelector(state => state.costOfLiving.mode);
    console.log(mode);
    return (
        <div className="px-4 pt-2 mx-3">
            {items.map((item) => (
                <div key={item.title} className="flex justify-between items-center mx-4 px-4 bg-stone-100 backdrop-blur-sm border border-stone-200 rounded-lg my-1.5 py-2.5 shadow-xs hover:bg-white/80 transition-all duration-200">
                    <div className="flex items-center gap-2">
                        {item.amount? <span className="text-sm text-stone-500 font-bold">{item.amount}</span>: ""}
                        <p className="text-sm text-stone-500 font-medium">{item.title}</p>
                        {(item.chosen || item.bestValue) && (
                            <span className="text-xs capitalize bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
                                {item.chosen? `${mode} pick`: "Best value"}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-stone-500 font-bold">{item.value}$</p>
                </div>
            ))}
        </div>
    );
}

export default DetailedExpense;
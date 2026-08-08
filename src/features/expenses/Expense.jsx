import { useState } from "react";
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import DetailedExpense from "./DetailedExpense";

function Expense({title, bgColor, items, icon}) {
    const [dropMenu, setDropMenu] = useState(false);
    return(
        <div className="flex flex-col">
          <div className={`flex justify-between items-center
          rounded-md p-2 shadow-xs shadow-blue-50`} style={{backgroundColor: bgColor}}>
            <div className="flex gap-3">
              {icon}
              <p className="text-sm text-stone-600 font-semibold">{title}</p>
            </div>
            <div onClick={() => setDropMenu((x) => !x)}>
              {dropMenu 
                ? <ArrowDropDownRoundedIcon sx={{ fontSize: 40 }} /> 
                : <ArrowDropUpRoundedIcon sx={{ fontSize: 40 }} />
              }
            </div>
          </div>
          {dropMenu && <DetailedExpense items={items}/>}
        </div>

    )
}

export default Expense;
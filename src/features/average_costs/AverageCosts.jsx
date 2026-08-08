import Cost from "./Cost";
import Salary from "../../assets/Salary";
import Transport from "../../assets/Transport";
import Budget from "../../assets/Budget";
import Bills from "../../assets/Bills";

function AverageCosts({data}) {

    const netSalary = data.net_salary.monthly_value;
    const billAndFees = data.bills_and_fees.monthly_average_cost;
    const mode = data.mode;
    const transportation = data.transportation.monthly_average_cost;


    return(
        <div className="pt-2 not-only-of-type:transition-all 
        flex items-center
        duration-100 xl:col-span-2 sm:h-full
        grid grid-cols-2 xl:grid-rows-1 gap-5 text-sm mb-0">
            <div className="flex flex-col xl:flex-row xl:gap-5 xl:h-19 gap-1 justify-between">
                <Cost value={netSalary} title="net salary">
                  <Salary />
                </Cost>
                <Cost value={billAndFees} title="bills and fees">
                  <Bills />
                </Cost>
            </div>

            <div className="flex flex-col xl:flex-row xl:h-19 xl:gap-5 gap-2 justify-between">
                <Cost value={transportation} title="transportation">
                    <Transport />
                </Cost>
                <Cost value={mode} title="mode">
                    <Budget />
                </Cost>
            </div>

           
        </div>
    )
}

export default AverageCosts;
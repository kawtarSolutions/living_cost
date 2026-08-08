import Expense from "./Expense";

function Expenses({data}) {

const detailedExpenses = [
  {
    value: data.bills_and_fees.monthly_details.monthly_electricity_heating_cost,
    color: "bg-amber-100",
    title: "Electricity & Heating"
  },
  {
    value: data.transportation.monthly_details.monthly_public_transport_cost,
    color: "bg-indigo-200",
    title: "Public Transport"
  },
  {
    value: data.entertainment.monthly_details.monthly_tennis_cost,
    color: "bg-orange-200",
    title: "Tennis"
  },
  {
    value: data.bills_and_fees.monthly_details.monthly_water_cost,
    color: "bg-amber-100",
    title: "Water"
  },
  {
    value: data.groceries.monthly_average_cost,
    color: "bg-pink-200",
    title: "Groceries"
  },
  {
    value: data.transportation.monthly_details.monthly_taxi_cost,
    color: "bg-indigo-200",
    title: "Taxi"
  },
  {
    value: data.entertainment.monthly_details.monthly_cinema_cost,
    color: "bg-orange-200",
    title: "Cinema"
  },
  {
    value: data.bills_and_fees.monthly_details.monthly_internet_cost,
    color: "bg-amber-100",
    title: "Internet"
  },
  {
    value: data.accommodations.monthly_details.monthly_studio_city_center_rent,
    color: "bg-blue-200",
    title: "Studio (City Center)"
  },
  {
    value: data.entertainment.monthly_details.monthly_gym_cost,
    color: "bg-orange-200",
    title: "Gym"
  },
  {
    value: data.transportation.monthly_details.monthly_gasoline_cost.total_cost,
    color: "bg-indigo-200",
    title: "Gasoline"
  },
  {
    value: data.entertainment.monthly_details.monthly_restaurant_cost,
    color: "bg-orange-200",
    title: "Restaurants"
  },
  {
    value: data.accommodations.monthly_details.monthly_studio_outside_center_rent,
    color: "bg-blue-200",
    title: "Studio (Outside Center)"
  },
  {
    value: data.entertainment.monthly_details.monthly_mcdo_cost,
    color: "bg-orange-200",
    title: "Fast Food"
  },
  {
    value: data.accommodations.monthly_details.monthly_family_apartment_city_center_rent,
    color: "bg-blue-200",
    title: "Apartment (City Center)"
  },
  {
    value: data.entertainment.monthly_details.monthly_theater_cost,
    color: "bg-orange-200",
    title: "Theater"
  },
  {
    value: data.accommodations.monthly_details.monthly_family_apartment_outside_center_rent,
    color: "bg-blue-200",
    title: "Apartment (Outside Center)"
  }
];


    return(
        <div className="bg-stone-100 rounded-lg border border-blue-100
        shadow-md hover:shadow-lg transition-shadow duration-300
        p-4 flex flex-col gap-1.5 capitalize overflow-y-scroll 
        hide-scrollbar sm:col-span-2 ">
           <h3 className="pl-1 font-bold tracking-tight text-blue-700 pb-2">Expenses</h3>
           {detailedExpenses.map(
            expense => <Expense value={expense.value} title={expense.title} bgColor={expense.color} key={expense.title}/>
           )}
        </div>
    )
}

export default Expenses;



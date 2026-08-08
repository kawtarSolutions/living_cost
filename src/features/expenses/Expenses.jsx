import Expense from "./Expense";
import SportsTennisOutlinedIcon from '@mui/icons-material/SportsTennisOutlined';
import ProductionQuantityLimitsRoundedIcon from '@mui/icons-material/ProductionQuantityLimitsRounded';
import CommuteRoundedIcon from '@mui/icons-material/CommuteRounded';
import PriceCheckRoundedIcon from '@mui/icons-material/PriceCheckRounded';
import HouseRoundedIcon from '@mui/icons-material/HouseRounded';


function Expenses({data}) {

const detailedExpenses = [
  {
    id: 5,
    title: "Entertainment",
    color: "#79C9C5",
    icon: <SportsTennisOutlinedIcon sx={{ color: '#57534E' }} />,
    items: [
      { value: data.entertainment.monthly_details.monthly_tennis_cost, title: "Tennis" },
      { value: data.entertainment.monthly_details.monthly_cinema_cost, title: "Cinema" },
      { value: Math.round(data.entertainment.monthly_details.monthly_gym_cost), title: "Gym" },
      { value: data.entertainment.monthly_details.monthly_restaurant_cost, title: "Restaurants" },
      { value: data.entertainment.monthly_details.monthly_mcdo_cost, title: "Fast Food" },
    ]
  },
  {
    id: 1,
    title: "Bills & Fees",
    color: "#AFDDFF",
    icon: <PriceCheckRoundedIcon sx={{ color: '#57534E' }} />,
    items: [
      { value: data.bills_and_fees.monthly_details.monthly_electricity_heating_water_cost, title: "Electricity, Heating & Water" },
      { value: data.bills_and_fees.monthly_details.monthly_mobile, title: "Mobile" },
      { value: data.bills_and_fees.monthly_details.monthly_internet_cost, title: "Internet" },
    ]
  },
  {
    id: 4,
    title: "Transportation",
    color: "#FD8A6B",
    icon: <CommuteRoundedIcon sx={{ color: '#57534E' }} />,
    items: [
      { value: data.transportation.monthly_details.monthly_public_transport_cost, title: "Public Transport", chosen: data.transportation.monthly_details.transport_type === "public" },
      { value: data.transportation.monthly_details.monthly_gasoline_cost, title: "Gasoline", chosen: data.transportation.monthly_details.transport_type === "car"},
    ]
  },
  {
    id: 2,
    title: "Groceries",
    color: "#78B3CE",
    icon: <ProductionQuantityLimitsRoundedIcon sx={{ color: '#57534E' }} />,
    items: [
      { value: data.groceries.monthly_details.milk, title: "Milk", amount: "8L" },
      { value: data.groceries.monthly_details.rice, title: "Rice" , amount: "2Kg"},
      { value: data.groceries.monthly_details.eggs, title: "Egg" , amount: "4x12"},
      { value: data.groceries.monthly_details.bread, title: "Bread", amount: "5Kg" },
      { value: data.groceries.monthly_details.cheese, title: "Cheese", amount: "1Kg" },
      { value: data.groceries.monthly_details.chicken, title: "Chicken", amount: "4Kg" },
      { value: data.groceries.monthly_details.beef, title: "Beef", amount: "2Kg" },
      { value: data.groceries.monthly_details.fruits_veggies, title: "Fruits & Veggies" },
    ]
  },
  {
    id: 3,
    title: "Accommodation",
    color: "#3F9AAE",
    icon: <HouseRoundedIcon sx={{ color: '#57534E' }} />,
    items: [
      { value: data.accommodations.monthly_details.monthly_studio_city_center_rent, title: "Studio (City Center)" },
      { value: data.accommodations.monthly_details.monthly_studio_outside_center_rent, title: "Studio (Outside Center)", bestValue: true },
      { value: data.accommodations.monthly_details.monthly_family_apartment_city_center_rent, title: "Apartment (City Center)" },
      { value: data.accommodations.monthly_details.monthly_family_apartment_outside_center_rent, title: "Apartment (Outside Center)" },
    ]
  },
];

    return(
        <div className="bg-stone-100 rounded-lg border border-blue-100
        shadow-md hover:shadow-lg transition-shadow duration-300
        py-4 flex flex-col gap-1.5 capitalize overflow-y-scroll 
        hide-scrollbar xl:col-span-2 px-6">
           <h2 className="text-stone-800 text-lg font-semibold tracking-tight mb-5 mt-1">
             Detailed Expenses
           </h2>
           {detailedExpenses.map(
            expense => <Expense key={expense.id} title={expense.title} bgColor={expense.color} items={expense.items} icon={expense.icon} amount={expense.amount}/>
           )}
        </div>
    )
}

export default Expenses;



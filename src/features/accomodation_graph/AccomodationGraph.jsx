import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="border rounded-lg px-4 py-3 shadow-xl" style={{ background: "#1a3a4a", borderColor: "#4988C4" }}>
        <p className="font-bold text-md mb-1" style={{ color: "#79C9C5" }}>{d.label}</p>
        <p className="text-sm" style={{ color: "#FFE2AF" }}>Rent: <strong>${d.y.toLocaleString()}</strong></p>
      </div>
    );
  }
  return null;
};

function AccomodationGraph({ dataCity }) {
  const data = [
    { label: "1BR City Center",    y: parseFloat(dataCity.accommodations.monthly_details.monthly_studio_city_center_rent) },
    { label: "1BR Outside Centre", y: parseFloat(dataCity.accommodations.monthly_details.monthly_studio_outside_center_rent) },
    { label: "3BR City Centre",    y: parseFloat(dataCity.accommodations.monthly_details.monthly_family_apartment_city_center_rent) },
    { label: "3BR Outside Centre", y: parseFloat(dataCity.accommodations.monthly_details.monthly_family_apartment_outside_center_rent) },
  ];

  const minValue = Math.min(...data.map(d => d.y));

  return (
    <div className="bg-stone-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 py-4 px-4 xl:w-150 border border-blue-100">
      <h2 className="text-stone-800 text-lg font-semibold tracking-tight mb-2">
        Rent Options
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 20, left: 0, bottom: 0 }}
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="label"
            tick={{ fontSize: 12, fill: "#1c1717" }}
            width={130}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(73, 136, 196, 0.1)" }} />
          <Bar dataKey="y" radius={[0, 4, 4, 0]} maxBarSize={50}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.y === minValue ? "#1C4D8D" : "#7AAACE"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex gap-7 alignn-center pt-1">
        <span className="text-xs capitalize bg-emerald-100 text-emerald-700 font-semibold px-2 py-1 rounded-full">
          best value
        </span>
        <p className="text-xs text-stone-600 font-semibold pt-1">{data.find((item) => item.y === minValue)?.label}</p>
      </div>
    </div>
  );
}

export default AccomodationGraph;
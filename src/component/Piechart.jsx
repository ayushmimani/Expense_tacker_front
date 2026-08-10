import { PieChart,Pie,Tooltip} from "recharts";

import { categorywise } from "../utils/categaorydata";


export default  function PieChartComponent() {

    const value = categorywise();
    // const COLORS = [
    // "#0088FE",
    // "#00C49F",
    // "#FFBB28",
    // "#FF8042"
    // ];

     const chartData = value.map(item => ({
        ...item,
        fill:
            item.category === "Food"
                ? "#0088FE"
                : item.category === "Travel"
                ? "red"
                : item.category === "Shopping"
                ? "#00C46F"
                : "#FF8042"
    }));
    console.log(value);
    
    return <>
     <PieChart width={400} height={400}>
        <Pie data={chartData} dataKey="amount" nameKey="category">
            
            </Pie>
        <Tooltip/>
     </PieChart>
    </>
}
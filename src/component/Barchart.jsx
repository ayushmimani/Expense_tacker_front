import { BarChart,XAxis,YAxis ,Bar} from "recharts"
//import { categorywise } from "../utils/categaorydata"
import data from "../utils/fakedata.json";

const Barchartcomponent = () => {


    const  getsummary=(data)=>{

    //const value = categorywise();

    let credit=0;
    let debit =0;


    data.forEach(item=>{
        if(item.type==='debit') debit+=item.amount
        else credit+=item.amount;
    });

    return [
        {name:'credit',amount:credit},
        {name:'debit',amount:debit}
    ];
    }


    const value = getsummary(data);
 console.log(value);
 

  return (
    <div>
        <BarChart width={400} height={400} data={value}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Bar dataKey="amount"></Bar>
        </BarChart>
    </div>
  )
}

export default Barchartcomponent;


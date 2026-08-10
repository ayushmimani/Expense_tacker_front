
import data from "../utils/fakedata.json";
export const categorywise =()=>{


    const result={};

    data.forEach(item=>{
        if(item.type==='debit'){
            result[item.category] =(result[item.category] ||0 )+ item.amount;
        }
    })

    return Object.keys(result).map(key=>({
        category:key,
        amount:result[key]
    }))

}


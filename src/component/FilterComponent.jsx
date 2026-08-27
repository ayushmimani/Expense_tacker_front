import { useDispatch, useSelector ,} from "react-redux";
import { downlaodreport } from "../utils/downloadreport";
import { uploadexpense } from "../utils/uploadexpense";
import { setexpense} from "../Slice/ExpenseSlice";
const apiurl = import.meta.env.VITE_API_URL;
import { toast } from "react-toastify";


const FilterComponent = ({openDeleteModal,setfilter}) => {
  console.log("DEBUG - setfilter is:", setfilter, typeof setfilter);
    const months = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const handlefilter = (e)=>{
      const {name,value} = e.target;

      setfilter((prev)=>({
        ...prev,
        [name]: value
      }))
    }


    const dispatch = useDispatch();
    const expense = useSelector(state=>state.expense.expenses);

    // bulk upload

    // upload 
      const uploadToServer = async (uploaddata) => {

         const dateToISO =(datestr)=>{
             if(!datestr) return new Date().toLocaleDateString();

             const [day,month,year] = datestr.split("/");

             return new Date(`${year}-${month.padStart(2,"0")}-${day.padStart(2,0)}`);
         }

        const updateformat = uploaddata.map((row)=>({
           ...row,
           date:dateToISO(row.date)
        }))


        console.log(updateformat);
        
      try {
        const response = await fetch(apiurl + 'bulk', {
          method: 'POST',
          credentials:"include",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ bulkexpense: updateformat }) // ✅ fixed key
        });
    
        const result = await response.json();

        if (result.success) {
          dispatch(setexpense([...expense, ...result.data])); // ✅ fixed
          toast.success("Bulk expenses uploaded successfully");
        } else {
          toast.error(result.message);
        }
    
      } catch (error) {
        console.error(error);
        toast.error("Upload failed");
      }
    };

    // modal funciotn



  return (
      <div className="flex items-center gap-2">
        <button
            onClick={()=>downlaodreport(expense)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            Download 
        </button>

          <button
            onClick={()=>openDeleteModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            BULK Delete 
        </button>

        <div>
           <input type="file" name="uploadexpense" onChange={(e)=>uploadexpense(e,uploadToServer)}/>
        </div>
        
     <span className="text-sm text-gray-600">Filter:</span>
        
        <div>
          <label>Type</label>
               <select className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                 name="type"
                 onChange={handlefilter}
               >
            <option value="">All</option>
            <option value="credit">credit</option>
            <option value="debit">debit</option>
          </select>
        </div>
  
          <div>
            <label>month</label>
                <select className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    name="month"
                    onChange={handlefilter}
              >
                <option value="">All</option>
                  {months.map((month,index)=>{
                    return(
                      <option key ={index} value={index+1}>{month}</option>
                    )
                  })}
              </select>
          </div>
 

       {/* delete modal */}
  </div>
  )
}

export default FilterComponent
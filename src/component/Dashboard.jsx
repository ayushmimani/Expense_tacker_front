import { useState,useEffect } from "react";
import PieChartComponent from "../component/Piechart";
import Barchartcomponent from "../component/Barchart";
import { useDispatch, useSelector } from "react-redux";
import { addexpense,removeexpense,udpatexpense,setexpense} from "../Slice/ExpenseSlice";
import { toast } from "react-toastify";
import FilterComponent from "./FilterComponent";


const apiurl = import.meta.env.VITE_API_URL;

const Dashboard = () => {

  const [showmodal, setShowmodal] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteId, setDeleteId] = useState([]);
  const [EditId, setEditId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dispatch = useDispatch();

  // useeffect on page load and set expense in redux
  useEffect(()=>{
    const getdata = async ()=>{
        try {
            const response  = await fetch(apiurl);
            const result = await response.json();
            console.log(result);
           dispatch(setexpense(result));
        } catch (error) {
          console.log(error);
        }
  }
  
    getdata();
  },[]);

  const expense = useSelector(state=>state.expense.expenses)

  
  const handlemodal = () => setShowmodal(true);
  const closemodal = () => setShowmodal(false);
  
  // delete row
  const openDeleteModal = (id) => {
   
//if(deleteId.length===0 && id=='' )  return;
      if(id){
      setDeleteId([id]);
      }else if(selectedIds.length==0){
        toast.error("Please at least one row to delete")
        return;
      }else{
        setDeleteId(selectedIds);
      }
      console.log(deleteId);
      
      setShowDeleteModal(true);
   
};

const closeDeleteModal = () => {

  setDeleteId([]);
  setShowDeleteModal(false);
};

const confirmDelete = async() => {

   const response = await fetch(apiurl,{
    method:"Delete",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      ids:deleteId
    })
   })
    const result = await response.json();

  console.log(result);
  if(result.success){
    
     dispatch(removeexpense(deleteId));
     setDeleteId([]);
     closeDeleteModal();
     toast.success("Expense deleted successfully!");
  }else{
      toast.error("Something went wrong!");
  }
  
};

  const [savedata, setsavedata] = useState({
    amount: "",
    category: "food",
    type: "credit",
  });


  // handle input change
  const handleChange = (e) => {
    
    
    setsavedata({
      ...savedata,
      [e.target.name]: e.target.value,
    });
  };

  // form submit
  const manageexpense = async(e) => {
    e.preventDefault();

    const newExpense = {
     // id: EditId ?? Date.now(),
      amount: Number(savedata.amount),
      category: savedata.category,
      type: savedata.type,
      date: EditId ? expense.find(item=> item._id==EditId)?.date:new Date().toLocaleDateString(),
    };
    

    if(EditId){
    console.log(newExpense);
    
      try {
       
         const result = await  fetch(apiurl+EditId, 
          {
            method:"PUT",
            headers:{
              "Content-Type":"application/json",
            },
             body:JSON.stringify(newExpense) 
          }
         )

         const data = await result.json();
         if(data.success){
           
           dispatch(udpatexpense(newExpense))
           toast.success("Expense updated successfully!");
         }else{
              toast.error(data.message);
         }
      } catch (error) {
        toast.error(error)
      }
      
    }else{
  
      
      try {
          const result = await fetch(apiurl,{
            method:'POST',
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify(newExpense) 
            
          })



            const data = await result.json();
            console.log(data);
            
            if(data.success){
                  dispatch(addexpense({...newExpense, _id:data.data._id,date:data.data.createdAt}));
                 toast.success("Expense added successfully!");
            }else{
              toast.error(data.message);
            }
           
      } catch (error) {
        toast.error(error);
        
      }
      
    }
    // reset form
    setsavedata({
      amount: "",
      category: "food",
      type: "credit",
    });
    setEditId(null);
    closemodal();

  };


  const update = (exoense)=>{
   setEditId(exoense._id);
  
   setsavedata({
  'amount':exoense.amount,
  'category':exoense.category,
  'type':exoense.type
   })
  setShowmodal(true);

  }

  const ischeck = (id)=>{
// select ALL OR NOT
 
   if(id==-1){
    if(selectedIds.length==0){
         setSelectedIds(()=>expense.map((row)=>(
           row._id
        )))
    }else{
      //   if all rows selected and click on allselect box than all rows are un select
      // logically remove all ids from the array
        setSelectedIds(()=>[]);
    }
  //  if single select than this else work
   }else{
        setSelectedIds((prev) => {
        if (prev.includes(id)) {
          return prev.filter(item => item !== id);
        }

        return [...prev, id];
      });
   }
  }
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handlemodal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          + Add Expense
        </button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Category Split</h2>
          <PieChartComponent />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Credit vs Debit</h2>
          <Barchartcomponent />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded shadow">
    <div className="flex justify-between items-center mb-4">
  
  {/* Left: Title */}
  <h2 className="text-lg font-semibold">Recent Transactions</h2>

  {/* Right: Filters */}
      <FilterComponent openDeleteModal={openDeleteModal}/>

</div>
      
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th>
                  <input type="checkbox" name= "selectall"  onChange={()=>ischeck(-1)} checked = {expense.length !== 0 && expense.length === selectedIds.length}/>
                </th>
                <th className="p-2">Sr .no</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Category</th>
                <th className="p-2">Type</th>
                <th className="p-2">Date</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>

            <tbody>
             
              {expense.map((d, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td>
                    <input type = "checkbox" name="checkbox" checked = {selectedIds.includes(d._id)} onChange={()=>ischeck(d._id)}/>
                  </td>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 font-medium">₹{d.amount}</td>
                  <td className="p-2">{d.category}</td>

                  <td className="p-2">
                    <span
                      className={`px-2 py-1 text-sm rounded ${
                        d.type === "debit"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {d.type}
                    </span>
                  </td>

                  <td className="p-2">{new Date(d.date).toLocaleDateString()}</td>

                  <td className="p-2 space-x-2">
                    <button onClick={()=>update(d)} className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                      Edit
                    </button>
                    <button onClick={()=>openDeleteModal(d._id)}  className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showmodal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">

            <h2 className="text-lg font-semibold mb-4">
              {EditId ? 'Update '  : 'Add ' } Expense
            </h2>

            <form onSubmit={manageexpense} className="space-y-4">

              <div>
                <label className="block text-sm mb-1">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={savedata.amount}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Category</label>
                <select
                  name="category"
                  value={savedata.category}
                  onChange={handleChange}
                  className="w-full border p-2"
                >
                 <option value="food">Food</option>
                  <option value="travel">Travel</option>
                  <option value="rent">Rent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Type</label>
                <select
                  name="type"
                  value={savedata.type}
                  onChange={handleChange}
                  className="w-full border p-2"
                >
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closemodal}
                  className="px-3 py-1 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
      {/* delete modal */}

      {showDeleteModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white p-6 rounded shadow w-full max-w-sm">

      <h2 className="text-lg font-semibold mb-4">
        Confirm Delete
      </h2>

      <p className="text-sm text-gray-600 mb-6">
        Are you sure you want to delete this expense?
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={closeDeleteModal}
          className="px-3 py-1 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={confirmDelete}
          className="bg-red-600 text-white px-4 py-1 rounded"
        >
          Delete
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
};

export default Dashboard;
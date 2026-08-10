import { useState } from "react";
import PieChartComponent from "../component/Piechart";
import Barchartcomponent from "../component/Barchart";
import { useDispatch, useSelector } from "react-redux";
import { addexpense,removeexpense,udpatexpense} from "../Slice/ExpenseSlice";

const Dashboard = () => {
  const [showmodal, setShowmodal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
   const [EditId, setEditId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [savedata, setsavedata] = useState({
    amount: "",
    category: "",
    type: "credit",
  });

  const dispatch = useDispatch();

  const expense = useSelector(state=>state.expense.expenses)

  const handlemodal = () => setShowmodal(true);
  const closemodal = () => setShowmodal(false);
  
  

  // handle input change
  const handleChange = (e) => {
    setsavedata({
      ...savedata,
      [e.target.name]: e.target.value,
    });
  };

  // delete row
  const openDeleteModal = (id) => {
  setDeleteId(id);
  setShowDeleteModal(true);
};

const closeDeleteModal = () => {
  setDeleteId(null);
  setShowDeleteModal(false);
};

const confirmDelete = () => {
  dispatch(removeexpense(deleteId));
  closeDeleteModal();
};
  // form submit
  const manageexpense = (e) => {
    e.preventDefault();

    const newExpense = {
      id: EditId ?? Date.now(),
      amount: Number(savedata.amount),
      category: savedata.category,
      type: savedata.type,
      date: EditId ? expense.find(item=> item.id==EditId)?.date:new Date().toLocaleDateString(),
    };

    if(EditId){
      dispatch(udpatexpense(newExpense))
    }else{
      dispatch(addexpense(newExpense));
    }
    

    // reset form
    setsavedata({
      amount: "",
      category: "",
      type: "credit",
    });
    setEditId(null);
    closemodal();

  };


  const update = (exoense)=>{
   setEditId(exoense.id);
  
   setsavedata({
  'amount':exoense.amount,
  'category':exoense.category,
  'type':exoense.type
   })
  setShowmodal(true);

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
        <h2 className="font-semibold mb-4">Recent Transactions</h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Category</th>
                <th className="p-2">Type</th>
                <th className="p-2">Date</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {expense.map((d, index) => (
                <tr key={d.id} className="border-t hover:bg-gray-50">
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

                  <td className="p-2">{d.date}</td>

                  <td className="p-2 space-x-2">
                    <button onClick={()=>update(d)} className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                      Edit
                    </button>
                    <button onClick={()=>openDeleteModal(d.id)}  className="bg-red-500 text-white px-2 py-1 rounded text-sm">
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
                  name="type"
                  value={savedata.type}
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
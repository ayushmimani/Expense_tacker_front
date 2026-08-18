import PieChartComponent from "../component/Piechart";
import Barchartcomponent from "../component/Barchart";
import { useCountUp } from "../hooks/useCountUp";

const Analytics = ({ expense = [] }) => {

  const totalCreditraw = expense
    .filter(item => item.type === 'credit')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalDebitraw= expense
    .filter(item => item.type === 'debit')
    .reduce((sum, item) => sum + item.amount, 0);

  

  const totalCredit = useCountUp(totalCreditraw)
 const totalDebit =useCountUp(totalDebitraw);

 const balanceraw  = totalCredit - totalDebit;
 const balance =useCountUp(balanceraw)
  return (
    <div className="p-4">

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        <div className="bg-green-100 p-5 rounded-xl shadow">
          <p className="text-sm text-gray-600">Total Credit</p>
          <h2 className="text-2xl font-bold text-green-700">
            ₹{totalCredit}
          </h2>
        </div>

        <div className="bg-red-100 p-5 rounded-xl shadow">
          <p className="text-sm text-gray-600">Total Debit</p>
          <h2 className="text-2xl font-bold text-red-700">
            ₹{totalDebit}
          </h2>
        </div>

        <div className="bg-blue-100 p-5 rounded-xl shadow">
          <p className="text-sm text-gray-600">Balance</p>
          <h2 className="text-2xl font-bold text-blue-700">
            ₹{balance}
          </h2>
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Category Split</h2>
          <PieChartComponent expense={expense} />
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Credit vs Debit</h2>
          <Barchartcomponent expense={expense} />
        </div>

      </div>

    </div>
  );
};

export default Analytics
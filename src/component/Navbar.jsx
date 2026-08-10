import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="bg-blue-300 flex justify-between p-3">
        
        <div>Expense Tracker</div>
        <div className="px-3">
            <Link to="/"  className="cursor-pointer">Dashboard</Link>
            <Link to="report" className="cursor-pointer">Report</Link>
        </div>
    

    </div>
  )
}

export default Navbar
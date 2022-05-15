import { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import App from "../App";




export default function Calculate() {
  const [basicsalary, setBasicsalary] = useState();
  const [othours, setOthours] = useState();
  const [otrate, setOtrate] = useState();
  const [totalsalary, setTotalsalary] = useState(basicsalary + othours*otrate);
  const [eID, setEID]=useState();

  function calculateTotalsalary() {
    setTotalsalary(basicsalary + othours*otrate);
  }

  return (
    
    <div className="calculation container">
      <h1 className="text-center">Total Salary </h1><br></br><br></br>
      <center>
      <div className="number-inputs mb-4">
        <input
          type="number"
          value={eID}
          onChange={(e) => setEID(+e.target.value)}
          placeholder="Enter the Employee ID"
        />
        </div>
      <div className="number-inputs mb-4">
        <input
          type="number"
          value={basicsalary}
          onChange={(e) => setBasicsalary(+e.target.value)}
          placeholder="Enter the basic salary"
        />
        </div>
        <div className="number-inputs mb-4">
        <input
          type="number"
          value={othours}
          onChange={(e) => setOthours(+e.target.value)}
          placeholder="Enter the OT hours "
        />
      </div>
      <div className="number-inputs mb-4">
        <input
          type="number"
          value={otrate}
          onChange={(e) => setOtrate(+e.target.value)}
          placeholder="Enter the OT Rate "
        />
      </div>

      <button onClick={calculateTotalsalary} className="btn btn-primary">Calculate</button><br></br>
      <h2>{totalsalary}</h2>
      
      </center>
     <center> <Link to="/post"><button className="btn btn-warning">salary Report</button></Link></center> 
    </div>
    
  );
  
}


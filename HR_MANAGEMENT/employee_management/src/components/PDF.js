import React from 'react';
import Pdf from "react-to-pdf";

const ref = React.createRef();

const PDF = (props) => {
  return (
    <>
      <div className="Post" ref={ref}>
      
  <div>
  <h1 className="text-center">Salary Report</h1>
  <center><img src="../emp.jpg"></img></center><br></br>    
  <table class="table table-primary">
  
    <tbody>
    <tr>
      <th>ID</th>
      <td>{props.ID}</td>  
    </tr>
    <tr>
      <th>Name</th>
      <td>{props.name}</td>
    </tr>
    <tr>
      <th>Basic Salary</th>
      <td>{props.basicsalary}</td> 
    </tr>
    <tr>
      <th>OT Hours</th>
      <td >{props.othours}</td>
    </tr>
    <tr>
      <th>Monthly Salary</th>
      <td className="text-decoration-underline">{props.totalsalary}</td>
    </tr>
  </tbody>
</table>
</div>

        
      </div>
      
      <center><Pdf targetRef={ref} filename="post.pdf">
        {({ toPdf }) => <button onClick={toPdf} className="btn btn-danger">Download as PDF</button>}
      </Pdf></center>
    </>
  );
}

export default PDF;
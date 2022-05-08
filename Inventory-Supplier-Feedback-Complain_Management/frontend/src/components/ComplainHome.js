import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = complains => {
  const doc = new jsPDF();
  const tableColumn = [ "Customer ID", "Complain Type", "Item Code", "Complain Date", "Complain Description"];
  const tableRows = [];
  complains.map(complains => {
    const complaindata = [
      
      complains.CustomerID,
      complains.ComplainType,
      complains.ItemCode,
      complains.ComplainDate,
      complains.Description,
      
 ];
    tableRows.push(complaindata);
  })
  doc.text("HDSC Supermarket", 70,8).setFontSize(13);
  doc.text("complain Summary Report", 14, 16).setFontSize(13);
  doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
  doc.save("COMPLAINSUMMARY.pdf");

}

export default class ComplainHome extends Component {
  constructor(props){
    super(props);

    this.state={
      complains:[]
    };

    

  }

  componentDidMount(){
    this.retrieveComplains();
  }

  retrieveComplains(){
    axios.get("/complain").then(res =>{
      if(res.data.success){
        this.setState({
        complains:res.data.existingComplains
      })
      console.log(this.state.complains)
    }
    });
  }

  onDelete = (id) =>{
    axios.delete(`/post/delete/${id}`).then((res) =>{
     alert("Delete Successfully");
    })
  }

  filterDate(complains,searchKey){

    const result = complains.filter((post) =>
    post.CustomerID.toLowerCase().includes(searchKey) ||
    post.ComplainType.toLowerCase().includes(searchKey) ||
    post.ItemCode.toLowerCase().includes(searchKey) ||
    post.ComplainDate.toLowerCase().includes(searchKey) ||
    post.Description.toLowerCase().includes(searchKey)
    
    )
    this.setState({complains:result})
  }

  handleSearchArea = (e) =>{
    const searchKey= e.currentTarget.value;

    axios.get("/complain").then(res =>{
      if(res.data.success){
 
  
        this.filterDate(res.data.existingComplains,searchKey)
      }
        
    });
  }
  render() {
    return (
      <div className="container">
        <h1 className="h3 mb-3 font-weight-normal">All Complains </h1>
        <div className="col-lg-3 mt-2 mb-2">
          <input 
          className="form-control"
          type="search"
          placeholder="Search"
          name="searchQuery"
          onChange={this.handleSearchArea}>

          </input>

        </div>
        <button
                  type="button"
                  style={{ backgroundColor: "#00000", padding: "7px" }}
                  class="btn btn-secondary btn-sm"
                  onClick={() => generatePDF(this.state.complains)}
                >
                  Download As PDF
                </button>
         <table className= "table table-striped">
           <thead>
             <tr>
               <th scope="col">Complain ID</th>
               <th scope="col">Customer ID</th>
               <th scope="col">Complain Type</th>
               <th scope="col">Item Code</th>
               <th scope="col">Complain Date</th>
               <th scope="col">Complain Description</th>
               <th scope="col">Action</th>
             </tr>

         </thead>
         <tbody>
           {this.state.complains.map((complains,index) => (
         
         <tr key={index}>
            
            <th scope="row">{index+1}</th>

            <td>
              <a href={`/complain/${complains._id}`} style={{textDecoration:'none'}}>
                {complains.CustomerID}
              </a>
            </td>
            <td>{complains.ComplainType}</td>
            <td>{complains.ItemCode}</td>
            <td>{complains.ComplainDate}</td>
            <td>{complains.Description}</td>
            <td>
              <a className="btn btn-warning" href={`/cedit/${complains._id}`}>
                <i className= "fas fa-edit"></i>&nbsp;Edit
              </a>
              &nbsp;
              <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(complains._id)}>
                <i className= "far fa-trash-alt"></i>&nbsp;Delete
              </a>
            </td>
          
         </tr>
           ))}
           </tbody>
        </table>
       
      
      
      <button className="btn btn-success"><a href="/cadd" style={{textDecoration:'none',color:'white'}}> Create New Complain</a></button>
      </div>
    )

  }
}


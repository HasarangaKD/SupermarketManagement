import React, { Component } from 'react'
import axios from 'axios'


export default class CreateComplain extends Component {

  constructor(props){
      super(props);
      this.state={
          CustomerID:"",
          ComplainType:"",
          ItemCode:"",
          ComplainDate:"",
          Description:"",

          IDError:"",
        TypeError:"",
        ItemError:"",
        ComplainDataError:"",
        DescriptionError:"" 
          
      }
  }

  validate =() =>{
    let IDError="";
    let TypeError="";
    let ItemError="";
    let ComplainDataError ="";
    let DescriptionError="";

    
    if(!this.state.CustomerID){
      IDError = "Field cannot be blank"
  }
  if(!this.state.ComplainType){
    TypeError = "Field cannot be blank"
  }
  if(!this.state.ItemCode){
      ItemError = "Field cannot be blank"
  }
  if(!this.state.ComplainDate){
    ComplainDataError = "Field cannot be blank"
  }
  if(!this.state.Description){
    DescriptionError = "Field cannot be blank"
  }
 

  
   if(IDError || TypeError || ItemError || ComplainDataError || DescriptionError){
       this.setState({IDError, TypeError, ItemError, ComplainDataError, DescriptionError,});
       return false;
   }

   return true;
};
  
  handleInputChange = (e) =>{
      const {name,value} = e.target;

      this.setState({
          ...this.state,
          [name]:value
      })
  }

  cancelCourse = () => { 
    this.setState({
    
    CustomerID:"",
    ComplainType:"",
    ItemCode:"",
    ComplainDate:"",
    Description:"",
    });
  }

  onSubmit = (e) =>{
      e.preventDefault();
      const isValid = this.validate();
      if (isValid){
      
      const {CustomerID,ComplainType,ItemCode,ComplainDate,Description} = this.state;

      const data = {
        CustomerID:CustomerID,
        ComplainType:ComplainType,
        ItemCode:ItemCode,
        ComplainDate:ComplainDate,
        Description:Description


      }

      console.log(data)
 

      axios.post("/post/save",data).then((res)  =>{
        if(res.data.success){
          alert("complain Add successfuly")
          this.setState(
            {
              CustomerID:"",
              ComplainType:"",
              ItemCode:"",
              ComplainDate:"",
              Description:"",

              IDError:"",
              TypeError:"",
        ItemError:"",
        ComplainDataError:"",
        DescriptionError:"" 
            }
          )
        }
      })
    }
  }
    render() {
      return(
        
     <form className="need-validation" noValidate>
       <h1 className="h3 mb-3 font-weight-normal">Create new Complain </h1>
        <div className="form-group">
          <label  className="form-label">Custmer ID</label>
          <input type="text" className="form-control" placeholder="Customer ID" id="CustomerID"name="CustomerID"value={this.state.CustomerID} onChange={this.handleInputChange}/>
          <div style={{ color: "red" }}>
                    {this.state.IDError}
                             </div>
        </div>
        <div className="form-group" >
          <label  className="form-label" >Complain Tytle</label>
          <input type="text" className="form-control" placeholder="Complain Tytle" id="ComplainType"name="ComplainType"value={this.state.ComplainType} onChange={this.handleInputChange}/>
          <div style={{ color: "red" }}>
                                 {this.state.TypeError}
                             </div>
        </div>
        <div className="form-group">
          <label  className="form-label">Item Code</label>
          <input type="text" className="form-control" id="ItemCode"  placeholder="Item Code" name="ItemCode"value={this.state.ItemCode} onChange={this.handleInputChange}/>
          <div style={{ color: "red" }}>
                                 {this.state.ItemError}
                             </div>
        </div>
        <div className="form-group">
          <label  className="form-label">Complain Date</label>
          <input type="DATE" className="form-control" id="ComplainDate"name="ComplainDate"value={this.state.ComplainDate} onChange={this.handleInputChange}/>
          <div style={{ color: "red" }}>
                                 {this.state.ComplainDataError}
                             </div>
        </div>
        <div className="form-group">
          <label  className="form-label">Complain Description</label>
          <input type="text" className="form-control" placeholder="Complain Description" id="Description"name="Description"value={this.state.Description} onChange={this.handleInputChange}/>
           <div style={{ color: "red" }}>
                                 {this.state.DescriptionError}
                             </div>
        </div>
        
       
        <button  className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
          <i className="far fa-check-square"></i>
          &nbsp; Add Complain
        </button>
      </form>
      )
  }
}

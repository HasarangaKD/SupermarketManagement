import React, { Component } from 'react'
import axios from 'axios'

export default class CreateFeedback extends Component {
    constructor(props){
        super(props);
        this.state={

            CustomerID:"",
            CustomerName:"",
            Email:"",
            feedbackDate:"",
            Description:"",

            
        IDError:"",
        NameError:"",
        EmailError:"",
        feedbackDataError:"",
        DescriptionError:"" 
            
        }
    }

    validate =() =>{
      let IDError="";
      let NameError ="";
      let EmailError="";
      let feedbackDataError ="";
      let DescriptionError="";

      
      if(!this.state.CustomerID){
        IDError = "Field cannot be blank"
    }
    if(!this.state.CustomerName){
        NameError = "Field cannot be blank"
    }
    if(!this.state.Email){
        EmailError = "Field cannot be blank"
    }
    if(!this.state.feedbackDate){
      feedbackDataError = "Field cannot be blank"
    }
    if(!this.state.Description){
      DescriptionError = "Field cannot be blank"
    }
   /*  if(!this.state.total_distance){
        faxError = "Field cannot be blank"
    }
    if(!this.state.total_distance){
        addresssError = "Field cannot be blank"
    }
    if(!this.state.cus_designation){
        designationError = "Field cannot be blank"
    }
    */
    if(!this.state.Email.includes("@")){
      EmailError = "Enter a valid email"
    } 

    
     if(IDError || NameError || EmailError || feedbackDataError || DescriptionError){
         this.setState({IDError, NameError, EmailError, feedbackDataError, DescriptionError,});
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
      CustomerName:"",
      Email:"",
      feedbackDate:"",
      Description:"",
      });
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const isValid = this.validate();
        if (isValid){
        
        const {CustomerID,CustomerName,Email,feedbackDate,Description} = this.state;
  
        const data = {
          CustomerID:CustomerID,
          CustomerName:CustomerName,
          Email:Email,
          feedbackDate:feedbackDate,
          Description:Description
  
  
        }
  
        console.log(data)
   
  
        axios.post("/feedback/save",data).then((res)  =>{
          if(res.data.success){
            alert("feedback Add successfuly")
            this.setState(
              {

                 /*  Vehicle_no: "",
                    Income_ID: "",
                    Drivername: "",
                    avg_fuel_economy: "",
                    Rate: "",
                    total_distance: "",
                    idError:"",
           nameError:"",
           dobError:"",
           emailError:"",
           phoneError:"",
           faxError:"",
           addresssError:"",
           designationError:"" */

                CustomerID:"",
                CustomerName:"",
                Email:"",
                feedbackDate:"",
                Description:"",

                IDError:"",
                NameError:"",
                EmailError:"",
                feedbackDataError:"",
                DescriptionError:""   
              }
            )
          }
        })
      }
    }

      render() {
        return (

          
       <form className="needs-validation" noValidate>
         <h1 className="h3 mb-3 font-weight-normal">Create new Feedback </h1>
          <div className="form-group">
            <label  className="form-label">Custmer ID</label>
            <input type="text" className="form-control" placeholder="Customer ID" id="CustomerID"name="CustomerID"value={this.state.CustomerID} onChange={this.handleInputChange}/>
            <div style={{ color: "red" }}>
                    {this.state.IDError}
                             </div>
          </div>
          <div className="form-group">
            <label  className="form-label">Customer Name</label>
            <input type="text" className="form-control" id="CustomerName" placeholder="Customer Name"name="CustomerName"value={this.state.CustomerName} onChange={this.handleInputChange}/>
             <div style={{ color: "red" }}>
                                 {this.state.NameError}
                             </div>
          </div>
          <div className="form-group">
            <label  className="form-label">Customer Email</label>
            <input type="Email" className="form-control" placeholder="Customer Email" id="Email"name="Email"value={this.state.Email} onChange={this.handleInputChange}/>
            <div style={{ color: "red" }}>
                                 {this.state.EmailError}
                             </div>
          </div>
          <div className="form-group">
            <label  className="form-label">Feedback Date</label>
            <input type="DATE" className="form-control" id="feedbackDate"name="feedbackDate"value={this.state.feedbackDate} onChange={this.handleInputChange}/>
            <div style={{ color: "red" }}>
                                 {this.state.feedbackDataError}
                             </div>
          </div>
          <div className="form-group">
            <label  className="form-label">Feedback Description</label>
            <input type="text" className="form-control" placeholder="Feedback Description" id="Description"name="Description"value={this.state.Description} onChange={this.handleInputChange}/>
            <div style={{ color: "red" }}>
                                 {this.state.DescriptionError}
                             </div>
          </div>
          
         
          <button  className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
            <i className="far fa-check-square"></i>
            &nbsp; submit
          </button>
        </form>
        )
    }

    
}

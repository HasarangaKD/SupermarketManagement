
import React, { Component } from 'react'
import axios from 'axios';

export default class EditFeedback extends Component {
    constructor(props){
        super(props);
        this.state={
            CustomerID:"",
            CustomerName:"",
            Email:"",
            feedbackDate:"",
            Description:""
        }
    }

    handleInputChange = (e) =>{
        const {name,value} = e.target;
    
        this.setState({
            ...this.state,
            [name]:value
        })
    }

    onSubmit = (e) =>{

  
        e.preventDefault();
        const id = this.props.match.params.id;
        const {CustomerID,CustomerName,Email,feedbackDate,Description} = this.state;
    
        const data = {
          CustomerID:CustomerID,
          CustomerName:CustomerName,
          Email:Email,
          feedbackDate:feedbackDate,
          Description:Description
    
    
        }
    
        console.log(data)
    
    
        axios.put(`/feedback/update/${id}`,data).then((res)  =>{
          if(res.data.success){
            alert("feedback update successfuly")
            this.setState(
              {
                CustomerID:"",
                CustomerName:"",
                Email:"",
                feedbackDate:"",
                Description:""
              }
            )
          }
        })
      }

      componentDidMount(){

        const id = this.props.match.params.id;
    
        axios.get(`/feedback/${id}`).then((res) =>{
          if(res.data.success){
              this.setState({ 
    
                CustomerID:res.data.feedbacks.CustomerID,
                CustomerName:res.data.feedbacks.CustomerName,
                Email:res.data.feedbacks.Email,
                feedbackDate:res.data.feedbacks.feedbackDate,
                Description:res.data.feedbacks.Description,
    
            });
          }
            console.log(this.state.feedbacks);
          
        });
      }

      render() {
        return(
       <form>
         <h1 className="h3 mb-3 font-weight-normal">Edit Feedback </h1>
          <div className="form-group">
            <label  className="form-label">Custmer ID</label>
            <input type="text" className="form-control" id="CustomerID"name="CustomerID"value={this.state.CustomerID} onChange={this.handleInputChange}/>
          </div>
          <div className="form-group">
            <label  className="form-label">Customer Name</label>
            <input type="text" className="form-control" id="CustomerName"name="CustomerName"value={this.state.CustomerName} onChange={this.handleInputChange}/>
          </div>
          <div className="form-group">
            <label  className="form-label">Customer Email</label>
            <input type="Email" className="form-control" id="Email"name="Email"value={this.state.Email} onChange={this.handleInputChange}/>
          </div>
          <div className="form-group">
            <label  className="form-label">Feedback Date</label>
            <input type="DATE" className="form-control" id="feedbackDate"name="feedbackDate"value={this.state.feedbackDate} onChange={this.handleInputChange}/>
          </div>
          <div className="form-group">
            <label  className="form-label">Complain Description</label>
            <input type="text" className="form-control" id="Description"name="Description"value={this.state.Description} onChange={this.handleInputChange}/>
          </div>
          
         
          <button  className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
            <i className="far fa-check-square"></i>
            &nbsp; update
          </button>
        </form>
        )
    }
}

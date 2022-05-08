import React, { Component } from 'react'

import axios from 'axios';

export default class FeedbackHome extends Component {
  constructor(props){
    super(props);

    this.state={
      feedbacks:[]
    };

    

  }

  componentDidMount(){
    this.retrieveFeedbacks();
  }

  retrieveFeedbacks(){
    axios.get("/feedback").then(res =>{
      if(res.data.success){
        this.setState({
        feedbacks:res.data.existingFeedbacks
      })
      console.log(this.state.feedbacks)
    }
    });
  }

  onDelete = (id) =>{
    axios.delete(`/feedback/delete/${id}`).then((res) =>{
     alert("Delete Successfully");
    })
  }

  filterDate(feedbacks,searchKey){

    const result = feedbacks.filter((post) =>
    post.CustomerID.toLowerCase().includes(searchKey) ||
    post.CustomerName.toLowerCase().includes(searchKey) ||
    post.Email.toLowerCase().includes(searchKey) ||
    post.feedbackDate.toLowerCase().includes(searchKey) ||
    post.Description.toLowerCase().includes(searchKey)
    
    )
    this.setState({feedbacks:result})
  }

  handleSearchArea = (e) =>{
    const searchKey= e.currentTarget.value;

    axios.get("/feedback").then(res =>{
      if(res.data.success){
 
  
        this.filterDate(res.data.existingFeedbacks,searchKey)
      }
        
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="h3 mb-3 font-weight-normal">All Feedbacks </h1>
        <div className="col-lg-3 mt-2 mb-2">
          <input 
          className="form-control"
          type="search"
          placeholder="Search"
          name="searchQuery"
          onChange={this.handleSearchArea}>

          </input>

        </div>
         <table className= "table table-striped">
           <thead>
             <tr>
               <th scope="col">Feedback ID</th>
               <th scope="col">Customer ID</th>
               <th scope="col">Customer Name</th>
               <th scope="col">Customer Email</th>
               <th scope="col">Feedback Date</th>
               <th scope="col">Feedback Description</th>
               <th scope="col">Action</th>
             </tr>

         </thead>
         <tbody>
           {this.state.feedbacks.map((feedbacks,index) => (
         
         <tr key={index}>
            
            <th scope="row">{index+1}</th>

            <td>
              <a href={`/feedback/${feedbacks._id}`} style={{textDecoration:'none'}}>
                {feedbacks.CustomerID}
              </a>
            </td>
            <td>{feedbacks.CustomerName}</td>
            <td>{feedbacks.Email}</td>
            <td>{feedbacks.feedbackDate}</td>
            <td>{feedbacks.Description}</td>
            <td>
              <a className="btn btn-warning" href={`/editfeed/${feedbacks._id}`}>
                <i className= "fas fa-edit"></i>&nbsp;Edit
              </a>
              &nbsp;

              <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(feedbacks._id)}>
                <i className= "far fa-trash-alt"></i>&nbsp;Delete
              </a>
            </td>
          
         </tr>
           ))}
           </tbody>
        </table>
       
      
      
      <button className="btn btn-success"><a href="/addfeed" style={{textDecoration:'none',color:'white'}}> Create New feedback</a></button>
      </div>
    )

  }

  
}

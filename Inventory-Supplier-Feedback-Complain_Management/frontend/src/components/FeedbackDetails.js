
import React, { Component } from 'react';
import axios from 'axios';

export default class FeedbackDetails extends Component {
    constructor(props){
        super(props);
    
        this.state={
          feedbacks:{}
        };
      }

      componentDidMount(){

        const id = this.props.match.params.id;
    
        axios.get(`/feedback/${id}`).then((res) =>{
          if(res.data.success){
              this.setState({ 
    
              feedbacks:res.data.feedbacks
    
            });
          }
            console.log(this.state.feedbacks);
          
        });
      }

      render(){

    
        const {CustomerID,CustomerName,Email,feedbackDate,Description} = this.state.feedbacks;
            return (
              <div  style={{marginTop:'20px'}}>
               <h4>{CustomerID}</h4>
               <hr/>
              
            <dl className="row">
              <dt className="col-sm-3">Customer Name</dt>
              <dd className="col-sm-9">{CustomerName}</dd>
    
              <dt className="col-sm-3">Customer Email</dt>
              <dd className="col-sm-9">{Email}</dd>
    
              <dt className="col-sm-3">Feedback Date</dt>
              <dd className="col-sm-9">{feedbackDate}</dd>
    
              <dt className="col-sm-3">Description</dt>
              <dd className="col-sm-9">{Description}</dd>
    
              
    
              </dl>
              </div>
            )
    
      }
}

import React, { Component } from 'react';
import axios from 'axios';

export default class ComplainDetails extends Component {
  
   constructor(props){
    super(props);

    this.state={
      complains:{}
    };
  }

  componentDidMount(){

    const id = this.props.match.params.id;

    axios.get(`/complain/${id}`).then((res) =>{
      if(res.data.success){
          this.setState({ 

          complains:res.data.complains

        });
      }
        console.log(this.state.complains);
      
    });
  }
  
 
  render(){

    
    const {CustomerID,ComplainType,ItemCode,ComplainDate,Description} = this.state.complains;
        return (
          <div  style={{marginTop:'20px'}}>
           <h4>{CustomerID}</h4>
           <hr/>
          
        <dl className="row">
          <dt className="col-sm-3">Complain Type</dt>
          <dd className="col-sm-9">{ComplainType}</dd>

          <dt className="col-sm-3">ItemCode</dt>
          <dd className="col-sm-9">{ItemCode}</dd>

          <dt className="col-sm-3">Complain Date</dt>
          <dd className="col-sm-9">{ComplainDate}</dd>

          <dt className="col-sm-3">Description</dt>
          <dd className="col-sm-9">{Description}</dd>

          

          </dl>
          </div>
        )

  }
}

import React, { Component } from 'react'
import axios from 'axios';

export default class EditComplain extends Component {

  constructor(props){
    super(props);
    this.state={
        CustomerID:"",
        ComplainType:"",
        ItemCode:"",
        ComplainDate:"",
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
    const {CustomerID,ComplainType,ItemCode,ComplainDate,Description} = this.state;

    const data = {
      CustomerID:CustomerID,
      ComplainType:ComplainType,
      ItemCode:ItemCode,
      ComplainDate:ComplainDate,
      Description:Description


    }

    console.log(data)


    axios.put(`/post/update/${id}`,data).then((res)  =>{
      if(res.data.success){
        alert("complain update successfuly")
        this.setState(
          {
            CustomerID:"",
            ComplainType:"",
            ItemCode:"",
            ComplainDate:"",
            Description:""
          }
        )
      }
    })
  }


  componentDidMount(){

    const id = this.props.match.params.id;

    axios.get(`/complain/${id}`).then((res) =>{
      if(res.data.success){
          this.setState({ 

            CustomerID:res.data.complains.CustomerID,
            ComplainType:res.data.complains.ComplainType,
            ItemCode:res.data.complains.ItemCode,
            ComplainDate:res.data.complains.ComplainDate,
            Description:res.data.complains.Description,

        });
      }
        console.log(this.state.complains);
      
    });
  }

  render() {
    return(
   <form>
     <h1 className="h3 mb-3 font-weight-normal">Edit Complain </h1>
      <div className="form-group">
        <label  className="form-label">Custmer ID</label>
        <input type="text" className="form-control" id="CustomerID"name="CustomerID"value={this.state.CustomerID} onChange={this.handleInputChange}/>
      </div>
      <div className="form-group">
        <label  className="form-label">Complain Tytle</label>
        <input type="text" className="form-control" id="ComplainType"name="ComplainType"value={this.state.ComplainType} onChange={this.handleInputChange}/>
      </div>
      <div className="form-group">
        <label  className="form-label">Item Code</label>
        <input type="text" className="form-control" id="ItemCode"name="ItemCode"value={this.state.ItemCode} onChange={this.handleInputChange}/>
      </div>
      <div className="form-group">
        <label  className="form-label">Complain Date</label>
        <input type="DATE" className="form-control" id="ComplainDate"name="ComplainDate"value={this.state.ComplainDate} onChange={this.handleInputChange}/>
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

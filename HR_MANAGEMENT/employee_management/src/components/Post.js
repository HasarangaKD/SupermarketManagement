import React, { Component } from 'react';
import PDF from './PDF';


class Post extends Component {
    state = {
        ID: '',
        name: '',
        basicsalary: '',
        othours:'',
        Totalsalary:'',
        postSubmitted: false
    }

    onChange = input => e => {
        this.setState({
            [input]: e.target.value
        });
    }

    sunmitPost = (e) => {
        
        if(!this.state.ID || !this.state.name){
            alert('All fields are required!');
            e.preventDefault();
        }else{
            this.setState({
                postSubmitted: true
            });
        }
    }
    

    render(){
        return(
            <>
                {  !this.state.postSubmitted ? 
                    (<div className="container"><br></br>
                     <form class="row g-3" method="post">
                    <div class="col-md-6">
                      <label for="inputEmail4" class="form-label">Employee ID</label>
                      <input  onChange={this.onChange('ID')} type="number" class="form-control" name="ID"/>
                    </div>
                    <div class="col-md-6">
                      <label for="inputPassword4" class="form-label">Name</label>
                      <input  onChange={this.onChange('name')} type="text" class="form-control" name="name"/>
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmail4" class="form-label">Basic Salary</label>
                      <input  onChange={this.onChange('basicsalary')} type="number" class="form-control" name="basicsalary"/>
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmail4" class="form-label">OT hours</label>
                      <input  onChange={this.onChange('othours')} type="number" class="form-control" name="othours"/>
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmail4" class="form-label">Calculated Monthy salary</label>
                      <input  onChange={this.onChange('totalsalary')} type="number" class="form-control" name="totalsalary'"/>
                    </div>
                    <div class="col-12">
                      <button type="submit" onClick={this.sunmitPost} class="btn btn-primary">Submit</button>
                    </div>
                  </form></div>) : (
                        <PDF ID={this.state.ID} name={this.state.name} basicsalary={this.state.basicsalary} othours={this.state.othours} totalsalary={this.state.totalsalary}/>
                    )
                }
            </>
        );
    }
}

export default Post;
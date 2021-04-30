import React, { Component } from 'react'
import Header from '../Header/Header'
import '../../plugins/fontawesome-free/css/all.min.css';
import '../../dist/css/adminlte.min.css';
import './font.css';
import Expire from '../Expire/Expire';
import axios from 'axios'
import Moment from 'moment';
export class Updatesale extends Component {
  constructor() {
    super();
    this.state = {
      input: {purchase_date:'',
              product_id:'',
              unit_price:'',
              quantity:''
              }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    let input = this.state.input;
    if(event.target.name===("purchase_date")){
      input[event.target.name] = Moment(event.target.value).format('DD-MM-YYYY');
    }
    else{
    input[event.target.name] = event.target.value;
    }
    this.setState({
      input
    });
  }
  handleSubmit(event) {
       
    event.preventDefault();
    
        console.log(this.state);
  
        alert('sales Updated');
        axios.post('http://localhost:3001/update_sales',this.state.input)
        .then(res=>{
          console.log(res)
        })
        .catch(error=>{
          console.log(error)
        })
        this.props.history.push('/sales');
  }
    render() {
        return (
            <div>
                <div class="hold-transition sidebar-mini">
                    
                    <div class="wrapper">
                    <Expire delay="300">
                    <div delay="2000" class="preloader flex-column justify-content-center align-items-center">
                        <img class="animation__shake" src="https://seeklogo.com/images/T/The_Athlete_s_Foot-logo-94CB1D9B3F-seeklogo.com.png" alt="AdminLTELogo" height="60" width="60"/>
                    </div>
                    
                    </Expire>
                        <Header/>

                        <div class="content-wrapper">
                            
                            <section class="content-header" style={{textAlign:"left"}}>
                                <h1>Fashion Feet Inventory Management</h1>
                            </section>
                            
                            
                                    
                                    <div class="card card-primary" style={{width:"40%"}}>
              <div class="card-header">
                <h3 class="card-title">Update Sales</h3>
              </div>
              {/* <!-- /.card-header -->
              <!-- form start --> */}
              <form onSubmit={this.handleSubmit} style={{textAlign:"left"}}>
                <div class="card-body">
                  <label>Purchase Date</label>&nbsp;
                  <input name="purchase_date" type="date" placeholder="Date" required onChange={this.handleChange}/><br/>
                  <label>Product ID</label>&nbsp;
                  <input name="product_id" type="text" placeholder="ID" required onChange={this.handleChange}/><br/>
                  <label>Unit Price</label>&nbsp;
                  <input name="unit_price" type="text" placeholder="Unit Price" required onChange={this.handleChange}/><br/>
                  <label>Quantity</label>&nbsp;
                  <input name="quantity" type="text" placeholder="Quantity" required onChange={this.handleChange}/><br/>
                  
                  
                </div>
                {/* <!-- /.card-body --> */}

                <div class="card-footer" >
                  <button style={{float:"left"}} type="submit" class="btn btn-primary">Submit</button>
                  <button type="button"  onClick={()=>{this.props.history.push('/sales');}} class="btn btn-primary" style={{float:"right",backgroundcolor:"white"}} >Cancel</button>
                </div>
              </form>
            </div>
                                
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Updatesale
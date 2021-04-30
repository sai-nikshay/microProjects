import React, { Component } from 'react'
import Header from '../Header/Header'
import '../../plugins/fontawesome-free/css/all.min.css';
import '../../dist/css/adminlte.min.css';
import './font.css';
import Expire from '../Expire/Expire';
import axios from 'axios';
export class Addproduct extends Component {
  constructor() {
    super();
    this.state = {
      input: {product_id:'',
              brand:'',
              category:'',
              name:'',
              size:'',
              quantity:0,
              cost_price:'',
              selling_price:''
              },
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
  
    this.setState({
      input
    });
  }
  handleSubmit(event) {
       
    event.preventDefault();
    
        console.log(this.state);
  
        // let input = {};
        // input["name"] = "";
        // input["email"] = "";
        // input["phone"] = "";
        // input["password"] = "";
        // input["confirmpassword"] = "";
        // this.setState({input:input});
        //this.props.history.push('/login');
        alert('Product Added');
        axios.post('http://localhost:3001/add_product',this.state.input)
        .then(res=>{
          console.log(res.data)
        })
        .catch(error=>{
          console.log(error)
        })
        this.props.history.push('/');
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
                <h3 class="card-title">Add Product</h3>
              </div>
              {/* <!-- /.card-header -->
              <!-- form start --> */}
              <form onSubmit={this.handleSubmit} method="post" style={{textAlign:"left"}}>
                <div class="card-body">
                  <label>Product ID</label>&nbsp;
                  <input name="product_id" type="text" placeholder="ID" required onChange={this.handleChange}/><br/>
                  <label>Brand</label>&nbsp;
                  <input name="brand" type="text" placeholder="Brand" required onChange={this.handleChange}/><br/>
                  <label>Category</label>&nbsp;
                  <input name="category" type="text" placeholder="Category" required onChange={this.handleChange}/><br/>
                  <label>Product name</label>&nbsp;
                  <input name="name" type="text" placeholder="Name" required onChange={this.handleChange}/><br/>
                  <label>size</label>&nbsp;
                  <input name="size" type="text" placeholder="Size" required onChange={this.handleChange}/><br/>
                  <label>Quantity</label>&nbsp;
                  <input name="quantity" type="number" placeholder="Quantity" required onChange={this.handleChange}/><br/>
                  <label>Cost Price</label>&nbsp;
                  <input name="cost_price" type="text" placeholder="Cost Price" required onChange={this.handleChange}/><br/>
                  <label>Selling Price</label>&nbsp;
                  <input name="selling_price" type="text" placeholder="Selling Price" required onChange={this.handleChange}/><br/>
                </div>
                {/* <!-- /.card-body --> */}

                <div class="card-footer" >
                  <button style={{float:"left"}} type="submit" class="btn btn-primary">Submit</button>
                  <button type="button" onClick={()=>{this.props.history.push('/');}} class="btn btn-primary" style={{float:"right",backgroundcolor:"white"}} >Cancel</button>
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

export default Addproduct

import React, { Component } from 'react'
import Header from '../Header/Header'
import '../../plugins/fontawesome-free/css/all.min.css';
import '../../dist/css/adminlte.min.css';
import './font.css';
import Expire from '../Expire/Expire';
import axios from 'axios'
export class Editproduct extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       product_id:this.props.match.params.id,
       input:[],
       posts:{
        quantity:0,
        cost_price:'',
        selling_price:''
       }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    let posts = this.state.posts;
    posts[event.target.name] = event.target.value;
  
    this.setState({
      posts
    });
  }
  handleSubmit(event) {
       
    event.preventDefault();
    
        console.log(this.state);

        alert('Product Edited');
        axios.put('http://localhost:3001/edit',this.state)
        .then(res=>{
          console.log(res)
        })
        .catch(error=>{
          console.log(error)
        })
        this.props.history.push('/');
  }
  componentDidMount(){
    axios.post('http://localhost:3001/editget',this.state)
    .then(res=>{
        console.log(res);
        this.setState({input:res.data})
    })
    .catch(error=>{
        console.log(error)
    })
}
    render() {
      const {input}=this.state
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
                <h3 class="card-title">Edit Product</h3>
              </div>
              {/* <!-- /.card-header -->
              <!-- form start --> */}
              <form  onSubmit={this.handleSubmit} style={{textAlign:"left"}}> 
                {
                  input.map((post)=>{
                  return(
                <div class="card-body">
                <label>Product ID : {post.product_id}</label><br/>
                <label>Brand :{post.brand}</label><br/>
                <label>Category : {post.category}</label><br/>
                <label>Name : {post.name}</label><br/>
                <label>Old Stock : {post.quantity}</label><br/>
                
                <label>New Stock</label>&nbsp;
                  <input name="quantity" type="number" placeholder="Quantity" required onChange={this.handleChange}/><br/>
                <label>Old Cost Price : {post.cost_price}</label><br/>
                
                <label>New Cost Price</label>&nbsp;
                  <input name="cost_price" type="text" placeholder="Cost Price" required onChange={this.handleChange}/><br/>
                

                <label>Old Selling Price : {post.selling_price}</label><br/>
                <label>New Selling Price</label>&nbsp;
                  <input name="selling_price" type="text" placeholder="Selling Price" required onChange={this.handleChange}/><br/>
                </div>
                
                

                
                  )
                  })
                }
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

export default Editproduct

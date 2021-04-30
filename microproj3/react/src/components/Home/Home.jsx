import React, { Component } from 'react'
import Header from '../Header/Header'
import '../../plugins/fontawesome-free/css/all.min.css';
import '../../dist/css/adminlte.min.css';
import './font.css';
import Expire from '../Expire/Expire';
import axios from 'axios'
export class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             posts:[]
        }
    }
    componentDidMount(){
        axios.get('http://localhost:3001/home')
        .then(res=>{
            console.log(res);
            this.setState({posts:res.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
    delpro=(proid) =>{
       
        
        
        
            axios.delete(`http://localhost:3001/del/${proid}`)
            .then(res=>{
              console.log(res)
            })
            .catch(error=>{
              console.log(error)
            })
           window.location.reload(false);
      }
    addpro=()=> {
        let path = `/add_product`;
        this.props.history.push(path);
      }

    render() {
        const {posts}=this.state;
        return (
            <div>
                <div class="hold-transition sidebar-mini">
                    
                    <div class="wrapper">
                    <Expire delay="800">
                    <div delay="2000" class="preloader flex-column justify-content-center align-items-center">
                        <img class="animation__shake" src="https://seeklogo.com/images/T/The_Athlete_s_Foot-logo-94CB1D9B3F-seeklogo.com.png" alt="AdminLTELogo" height="60" width="60"/>
                    </div>
                    </Expire>
                    
                        <Header/>

                        <div class="content-wrapper">
                            
                            <section class="content-header">
                                <h1>Fashion Feet Inventory Management</h1>
                            </section>
                            
                            <section class="content">
                                <div class="card">
                                    <div class="card-header">
                                    <h3 class="card-title">Stock Details</h3>
                                    
                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                                        <i class="fas fa-minus"></i></button>
                                        <button type="button" class="btn btn-tool" data-card-widget="remove" data-toggle="tooltip" title="Remove">
                                        <i class="fas fa-times"></i></button>
                                    </div>
                                    </div>
                                    <div class="card-body table-responsive p-0" style={{height: "400px"}}>
                                        <table class="table table-striped table-head-fixed text-nowrap">
                                            <thead>
                                                <tr>
                                                    <th style={{width: "10%"}} >Product ID</th>
                                                    <th style={{width: "10%"}}  >Brand</th>
                                                    <th style={{width: "10%"}}  >Category</th>
                                                    <th style={{width: "10%"}}  >Name</th>
                                                    <th style={{width: "10%"}}  >Size</th>
                                                    <th style={{width: "15%"}}  >Quantity</th>
                                                    <th style={{width: "10%"}}  >Cost Price</th>
                                                    <th style={{width: "10%"}}  >Selling Price</th>
                                                    <th style={{width: "20%"}}  > </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    posts.map((post)=>{
                                                        var barbg=""
                                                        if(post.quantity<=30){
                                                            barbg="progress-bar bg-danger";
                                                        }
                                                        else{
                                                            barbg="progress-bar bg-success"
                                                        }
                                                        return(
                                                            <tr key={post.product_id}>
                                                                <td>{post.product_id}</td>
                                                                <td>{post.brand}</td>
                                                                <td>{post.category}</td>
                                                                <td>{post.name}</td>
                                                                <td>{post.size}</td>
                                                                <td>
                                                                    <div class="progress progress-xs">
                                                                    <div class={barbg} style={{width: `${post.quantity}%`}} ></div>
                                                                    </div>
                                                                    <small>{post.quantity}</small>
                                                                </td>
                                                                <td>{post.cost_price}</td>
                                                                <td>{post.selling_price}</td>
                                                                <td class="project-actions text-right">
                                                                    <a class="btn btn-info btn-sm" href={"/edit/"+post.product_id}><i class="fas fa-pencil-alt"></i>Edit</a>
                                                                    &nbsp;
                                                                        <button type="button" style={{backgroundColor:"red",borderColor:"black"}} onClick={this.delpro.bind(this,post.product_id)} class="btn btn-info btn-sm">Delete<i class="fas fa-trash"></i></button>
                                                                    
                                                                </td>
                                                            </tr>
                                                            
                                                        )
                                                    })
                                                }
                                                
                                                
                                            </tbody>
                                        </table>
                                            <div style={{float:"left"}} class="card-footer clearfix">
                                                <button type="button" onClick={this.addpro} class="btn btn-primary float-right"><i class="fas fa-plus"></i> Add item</button>
                                            </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home

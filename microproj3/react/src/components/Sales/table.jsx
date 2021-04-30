import React, { Component } from 'react'


import '../../plugins/fontawesome-free/css/all.min.css';
import '../../dist/css/adminlte.min.css';
import './font.css';

import axios from 'axios'
export class table extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             posts:[]
        }
    }
    componentDidMount(){
        axios.get('http://localhost:3001/sales')
        .then(res=>{
            console.log(res);
            this.setState({posts:res.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
    render() {
        const {posts}=this.state;
        return (
            <div>
                <div class="card-body table-responsive p-0" style={{height: "400px"}}>
                                        <table id="tab" class="table table-striped table-head-fixed text-nowrap">
                                            <thead>
                                                <tr>
                                                    <th style={{width: "20%"}} >Purchase Date</th>
                                                    <th style={{width: "20%"}}  >Product ID</th>
                                                    <th style={{width: "20%"}}  >Unit Price</th>
                                                    <th style={{width: "20%"}}  >Quantity</th>
                                                    <th style={{width: "20%"}}  >Total Sales(in Rs)</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                    posts.map((post)=>{
                                                        
                                                        return(
                                                            <tr key={post.product_id}>
                                                                <td>{post.purchase_date}</td>
                                                                <td>{post.product_id}</td>
                                                                <td>{post.unit_price}</td>
                                                                <td>{post.quantity}</td>
                                                                <td>{post.total_sales}</td>
                                                                
                                                                
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                
                                                
                                                
                                                
                                            </tbody>
                                        </table>
                                            
                                    </div>
            </div>
        )
    }
}

export default table

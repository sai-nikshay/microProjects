import React, { Component } from 'react'
import '../../plugins/fontawesome-free/css/all.min.css';
import '../../dist/css/adminlte.min.css';
import './font.css';
export class Header extends Component {
    render() {
        return (
            <div>
             
		
                {/* <!-- Navbar --> */}
                <nav class="main-header navbar navbar-expand navbar-white navbar-light">
                {/* <!-- Left navbar links --> */}
                  <ul class="navbar-nav">
                    <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="/" role="button"> 
                                                      <i class="fas fa-bars"></i></a>
                    </li>
                    <li class="nav-item d-none d-sm-inline-block">
                    <a href="/" class="nav-link">Home</a>
                    </li>
                  </ul>
                </nav>
                {/* <!-- /.navbar --> */}
		
                <aside class="main-sidebar sidebar-dark-primary elevation-4">
                {/* <!-- Brand Logo --> */}
                  <a href="/" class="brand-link">
                    <img src="https://seeklogo.com/images/T/The_Athlete_s_Foot-logo-94CB1D9B3F-seeklogo.com.png"
                      alt=""
                              style={{backgroundColor: "white"}}
                      class="brand-image img-circle elevation-3"/>
                    <span class="brand-text font-weight-light">Fashion Feet</span>
                  </a>
                  {/* <!-- Sidebar --> */}
                  <div class="sidebar">
                    <nav class="mt-2">
                      <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li class="nav-item">
                        <a href="/add_product" class="nav-link">
                          <i class="nav-icon far fa-circle text-info"></i>
                          <p>Add Product</p>
                        </a>
                        </li>
                        <li class="nav-item">
                        <a href="/sales" class="nav-link">
                          <i class="nav-icon far fa-circle text-info"></i>
                          <p class="text">Sales Details</p>
                        </a>
                        </li>
                        <li class="nav-item">
                        <a href="/update_sales" class="nav-link">
                          <i class="nav-icon far fa-circle text-info"></i>
                          <p class="text">Update Sales</p>
                        </a>
                        </li>
                        
                      </ul>
                    </nav>
                  </div>
                  {/* <!-- /.sidebar --> */}
                </aside>
		
	
		
	 

            </div>
        )
    }
}

export default Header

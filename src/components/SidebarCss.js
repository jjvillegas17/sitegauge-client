import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class Sidebar extends Component {
  render() {
      return(
        <div id="sidebar" className="column" style={{
            position: "fixed",
            top: "40px",
            width: "20%", 
          }}>
            <Menu secondary vertical fluid>
                <Menu.Item as={Link} to='/'>
                    <i class="home icon"></i>
                    Dashboard
                </Menu.Item>
                <Menu.Item as={Link} to='/'>
                    <i class="google icon"></i>
                    Google
                </Menu.Item>
            </Menu>
        </div>
            <div class="ui secondary vertical fluid menu" style={{backgroundColor:"skyblue", minHeight: "100vh"}}>
                <br />
                <NavLink>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         <NavLink to="/" className="item">
                    <i class="home icon"></i>
                    Dashboard
                </NavLink>
                <a className="item">
                    <i class="google icon"></i>
                    Google
                </a>
                <a class="item">
                    <i class="facebook icon"></i>
                    Facebook
                </a>
                <a class="item">
                    <i class="twitter icon"></i>
                    Twitter
                </a>
                <a class="item">
                    <i class="upload icon"></i>
                    Upload Analytics
                </a>
                <a class="item">
                    <i class="add icon"></i>
                    Add A Website
                </a>
                <a class="item">
                    <i class="add icon"></i>
                    Add A Social Media
                </a>
                <a class="item">
                    <i class="minus icon"></i>
                    Delete an account
                </a>
            </div>
        </div>      
      );
      }
}

export default Sidebar;

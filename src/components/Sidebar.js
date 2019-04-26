import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
  render() {
      return(
        <div id="sidebar" className="column" style={{
            position: "fixed",
            top: "40px",
            width: "20%", 
          }}>
            <Menu secondary vertical fluid style={{
                backgroundColor:"#3cbcc3", 
                minHeight: "100vh"
            }}>
                <br />
                <Menu.Item as={Link} to='/dashboard'>
                    <i className="home icon"></i>
                    Dashboard
                </Menu.Item>
                <Menu.Item as={Link} to='/dashboard'>
                    <i className="google icon"></i>
                    Google
                </Menu.Item>
                <Menu.Item as={Link} to='/dashboard'>
                    <i className="facebook icon"></i>
                    Facebook
                </Menu.Item>
                <Menu.Item as={Link} to='/dashboard'>
                    <i className="twitter icon"></i>
                    Twitter
                </Menu.Item>
                <Menu.Item as={Link} to='/upload'>
                    <i className="upload icon"></i>
                    Upload Analytics
                </Menu.Item>
                <Menu.Item as={Link} to='/addWebsite'>
                    <i className="add icon"></i>
                    Add a Website
                </Menu.Item>
                <Menu.Item as={Link} to='/addSM'>
                    <i className="add icon"></i>
                    Add a Social Media
                </Menu.Item>
                <Menu.Item as={Link} to='/dashboard'>
                    <i className="minus icon"></i>
                    Delete an account
                </Menu.Item>
            </Menu>
        </div>
                  
      );
      }
}

export default Sidebar;

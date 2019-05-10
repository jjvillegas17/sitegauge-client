import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class SidebarAdmin extends Component {
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
                <span style={{fontSize: "17px"}}>
                <Menu.Item as={Link} to='/admin'>
                    <i className="user icon"></i>
                    Users
                </Menu.Item>
                <Menu.Item as={Link} to='/admin/block'>
                    <i className="times circle icon"></i>
                    Block User
                </Menu.Item>
                <Menu.Item as={Link} to='/admin/unblock'>
                    <i className="edit icon"></i>
                    Unblock User
                </Menu.Item>
                <Menu.Item as={Link} to='/admin/delete'>
                    <i className="minus icon"></i>
                    Delete User
                </Menu.Item>
               
                </span>
            </Menu>
        </div>
                  
      );
      }
}

export default SidebarAdmin;

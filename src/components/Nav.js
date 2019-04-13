import React, { Component } from 'react';
import './Nav.css';
class Nav extends Component {
  render() {
    return (
        <div className="ui secondary large tabular menu" style={{marginTop: "-10px"}}>
          <a href="/" className="item">
            <img className="ui mini image" src={require("./logo_30.png")} alt="logo"
              style={{width:"80px"}}
            />
          </a>
          <a href="/" className="item" style={{marginRight: "20px"}}>Login</a>
          <a href="/" className="item">Sign Up</a>
          <div className="right menu" > 
            <a href="/" className="item">
              <button className="ui button">
              Sign Up
              </button>
            </a>
            <a href="/" className="item">
              <button className="ui button">
              Sign Up
              </button>
            </a>
          </div>
        </div>
    );
  }
}

export default Nav;

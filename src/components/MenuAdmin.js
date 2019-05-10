import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class MenuAdmin extends Component {
    
    logout = (e, href) =>{
        e.preventDefault();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        this.props.history.push("/");
    }

    render() {
      return (
        <div className="ui huge borderless fixed fluid menu" style={{backgroundColor:"#3cbcc3"}}>
            <a href="/admin" className="header item"> SiteGauge</a>
            <div className="right menu">
                <a href="/" className="item" style={{fontSize: "17px"}} onClick={(e)=> {this.logout(e,"/")}}>Logout</a>
            </div>
        </div>
      );
    }
}

export default withRouter(MenuAdmin);
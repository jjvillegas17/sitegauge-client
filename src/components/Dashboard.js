import React, { Component } from 'react';
import Sidebar from './Sidebar';

class Dashboard extends Component {
  render() {
    return (
        <div>
            <div class="ui vertical left visible inverted sidebar menu" style={{backgroundColor:"skyblue"}}>
                <a href="/" class="item" style={{textAlign:"center"}}>
                    <img className="ui mini image" src={require("./logo_30.png")} style={{marginLeft:"70px", width: "80px"}}/>
                    SiteGauge
                </a> 
                <a href="/" class="item">
                    <i class="home icon"></i>
                    Dashboard
                </a>
                <a href="/" class="item">
                    <i class="google icon"></i>
                    Google
                </a>
                <a href="/" class="item">
                    <i class="facebook icon"></i>
                    Facebook
                </a>
                <a href="/" class="item">
                    <i class="twitter icon"></i>
                    Twitter
                </a>
                <a href="/" class="item">
                    <i class="upload icon"></i>
                    Upload Analytics
                </a>
                <a href="/" class="item">
                    <i class="add icon"></i>
                    Add A Website
                </a>
                <a href="/" class="item">
                    <i class="add icon"></i>
                    Add A Social Media
                </a>
                <a href="/" class="item">
                    <i class="minus icon"></i>
                    Delete an account
                </a>
            </div>
            <div class="pusher">
                <div className="ui menu">
                    <a href="/" className="item">Item 1</a>
                    <a href="/" className="item">Item 1</a>
                    <a href="/" className="item">Item 1</a>
                    <a href="/" className="item">Item 1</a>
                    <a href="/" className="item">Item 1</a>
                </div>
                <div className="ui fluid grid" style={{marginLeft:"10px"}}>
                    <div className="row">
                        <p>
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                            PPPPPPPPPPPPPPPPPPPPPPPPP
                        </p>
                    </div>
                <div className="ui cards">
                    <div className="ui card">
                        <div className="content">
                            Card 1
                        </div>
                    </div>
                    <div className="ui card">
                        <div className="content">
                            Card 2
                        </div>
                    </div>
                    <div className="ui card">
                        <div className="content">
                            Card 3
                        </div>
                    </div>
                    <div className="ui card">
                        <div className="content">
                            Card 4
                        </div>
                    </div>
                    <div className="ui card">
                        <div className="content">
                            Card 5
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Dashboard;

import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Menu from './Menu';

class D extends Component {
  render() {
    return (
    <div>
        <Menu/>
        <div className="ui grid">
            <div className="row">
                <Sidebar />
                <div id="content" className="column" style={{
                    marginLeft: "19%",
                    width: "81%",
                    marginTop: "2em",
                    paddingLeft: "1.5em"
                }}>
                    <div className="ui grid" style={{
                        paddingRight: "4em",

                    }}>
                        <div className="row">
                            <h1 className="ui huge header" style={{
                                fontSize:"36px"
                            }}>
                                Facebook
                            </h1>
                        </div>
                        <div className="ui divider" style={{marginTop:"-5px"}}></div>
                        <div className="row">
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
            </div>
        </div>
    </div>
    
    );
  }
}

export default D;

import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Menu from './Menu';

/* make a home component then accept a props that will
   identify which is to be rendered in the content part
*/

class AddWebsite extends Component {
    state = {
        type: 0
    }

    changeType = (type) => {
        this.setState({type:type});
        console.log(this.state.type);
    }

    render() {
        return (
            <div>
                <Menu />
                <div className="ui grid" style={{
                    paddingRight: "4em"
                }}>
                    <div className="row">
                        <Sidebar/>
                        <div id="content" className="column" style={{
                            marginLeft: "19%",
                            width: "81%",
                            marginTop: "2em",
                            paddingLeft: "1.5em"
                        }}>
                            <div className="ui centered grid" style={{
                                paddingRight: "4em",
                            }}>
                                <div className="row">
                                    <h1 className="ui huge header" style={{
                                        fontSize:"36px",
                                        margin: "20px"
                                    }}>
                                        Add a Website
                                    </h1>
                                </div>
                                <div className="ui raised very padded text container segment">
                                    <form className="ui form">
                                        <div className="field">
                                            <label>Type</label>
                                            <select className="ui fluid dropdown" onChange={this.changeType} >
                                                <option value="0">Facebook</option>
                                                <option value="1">Twitter</option>
                                            </select>
                                        </div>
                                        <div className="field">
                                            <button className="ui facebook button">
                                                <i className="facebook icon"></i>
                                                Sign in to Facebook
                                            </button>
                                        </div>
                                        <div className="field">
                                            <label>Pages</label>
                                            <select className="ui fluid dropdown" onChange={this.changeType} >
                                                <option value="0">My Fb Page1</option>
                                                <option value="1">My Fb Page2</option>
                                                <option value="2">My Fb Page3</option>
                                            </select>
                                        </div>
                                        <div className="field">
                                            <button className="ui primary button">
                                              Save
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddWebsite;

import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Menu from './Menu';
import { Grid } from 'semantic-ui-react';

/* make a home component then accept a props that will
   identify which is to be rendered in the content part
*/

class UploadAnalytics extends Component {
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
                                    Upload Analytics
                                </h1>
                            </div>
                            <div className="ui raised very padded text container segment">
                                <form className="ui form">
                                    <div className="field">
                                        <label>Type</label>
                                        <select class="ui fluid dropdown">
                                            <option value="Google">Google</option>
                                            <option value="Facebook">Facebook</option>
                                            <option value="Twitter">Twitter</option>
                                        </select>
                                    </div>
                                    <div className="field">
                                        <Grid>
                                            <Grid.Column textAlign="center">
                                                <label htmlFor="file" class="ui icon button">
                                                    <i class="file icon"></i>
                                                    Open File</label>
                                                <input type="file" id="file" style={{display:"none"}}/>   
                                            </Grid.Column>
                                        </Grid> 
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

export default UploadAnalytics;

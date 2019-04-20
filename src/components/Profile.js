import React, { Component, Fragment } from 'react';
import Sidebar from './Sidebar';
import Menu from './Menu';
import axios from 'axios';


class Profile extends Component {
	constructor(props) {
        super(props);

        this.state = {
        	user: '',
        	accounts: '',
        }
    }

	async componentDidMount(){
		axios.get(`https://sitegauge.io/api/${localStorage.getItem("userId")}/accounts`)
			.then((res) => {
				console.log(res.data);
				this.setState({ accounts: res.data});
			})
			.catch((err) => {
				console.log(err);
			});

		axios.get(`https://sitegauge.io/api/${localStorage.getItem("userId")}/info`)
			.then((res) => {
				console.log(res.data);
				this.setState({ user: res.data});
			})
			.catch((err) => {
				console.log(err);
			})

	}

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
                    	{
                    		this.state.user === '' || this.state.accounts === '' ?
                    		<Fragment>
                    		<div className="row">
	                    		<div className="ui active centered inline text loader">
	                                Loading Profile
	                            </div>
                            </div>
                            </Fragment>
                    		:
                    		<Fragment>
                    		<div className="row">
	                            <div className="left floated column">
	                                <h1 className="ui huge header" style={{
	                                    fontSize:"36px"
	                                }}>
	                                    {this.state.user.first_name + ' ' + this.state.user.last_name}
	                                </h1>
	                                <div>Email: {this.state.user.email}</div>
	                            </div>
	                        </div>
	                        <div className="ui divider" style={{marginTop:"-5px"}}></div>
	                        <div className="row">
	                        	<table className="ui celled striped table">
			                		<thead>
									    <tr>
									    	<th>
									    		<h3 className="ui medium header">
		                                			Facebook Pages
		                                		</h3>
											</th>
									    </tr>
								    </thead>
								    <tbody>
									    {
									    	this.state.accounts.pages.map(page => {
									    		console.log(page);
									    		return (
									    			<tr>
									    				<td>{page.page_name}</td>
									    			</tr>
									    		)
									    	})
									    }
								    </tbody>
								</table>
	                        </div>
	                        <div className="row">
	                        	<table className="ui celled striped table">
			                		<thead>
									    <tr>
									    	<th>
		                                		<h3 className="ui medium header">
		                                			Twitter Accounts
		                                		</h3>
											</th>
									    </tr>
								    </thead>
								    <tbody>
									    {
									    	this.state.accounts.twitters.map(twitter => {
									    		console.log(twitter);
									    		return (
									    			<tr>
									    				<td>@{twitter.username}</td>
									    			</tr>
									    		)
									    	})
									    }
								    </tbody>
								</table>
	                        </div>
	                        </Fragment>
                    	}
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    );
  }
}

export default Profile;
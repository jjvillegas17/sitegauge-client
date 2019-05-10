import React, { Component } from 'react';
import MenuAdmin from './MenuAdmin';
import SidebarAdmin from './SidebarAdmin';
import axios from 'axios';

class Home extends Component {
	constructor(props) {
        super(props);
        
        this.state = {
        	users: [],
            loaded: false,
        }
    }
    
    componentDidMount(){
    	this.getUsers();
    }

    getUsers = async () => {
    	const response = await axios.get(`https://sitegauge.io/api/users`); 
    	this.setState({ users: response.data });
    }

	render(){
		return(
			<div>
		        <MenuAdmin />
		        <div className="ui grid">
		            <div className="row">
		                <SidebarAdmin />
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
	                            <table className="ui striped table">
									<thead>
										<tr>
									        <th>Name</th>
									        <th>E-mail Address</th>
									        <th>Suspended</th>
									        <th>Date Created</th>
								        </tr>
									</thead>
									<tbody>
									{
										this.state.users.length === 0? 
										null
										:
										this.state.users.map(user => {
											return(
												<tr key={user.id}>
													<td>{user.first_name + " " + user.last_name}</td>
													<td>{user.email}</td>
													<td>{user.is_blocked === 0?  "NO": <i className="large window close outline code icon"></i>}</td>
													<td>{user.created_at}</td>
												</tr>
											)
										})
										
									}
									</tbody>
	                            </table>
	                            </div>
		                     </div>
		                </div>
		            </div>
		        </div>
		  	</div>
		)
	}
}



export default Home;

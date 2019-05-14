import React, { Component }from 'react';
import axios from 'axios';

class PageNotFound extends Component{
	constructor(props) {
        super(props);

        this.state = {
        	isAdmin: false,
        }
    }

    async componentDidMount(){
    	const userId = localStorage.getItem("userId");
		axios.get(`https://sitegauge.io/api/${userId}/info`)
			.then((res) => {
				if(res.data.is_admin === 1){
					this.setState({ isAdmin: true });	
				}
				else{
					this.setState({ isAdmin: false });
				}
			})
			.catch((err) => {
			})
    }

	render(){
		return (
			<div className="ui centered grid">
				<div className="row">
				</div>
				<div className="row">
				</div>
				<div className="row">
				</div>
				{
					this.state.isAdmin === true ?
						<div className="row">
							<h1 className="ui huge header">404: Page not Found. Redirect to <a href="/admin/">Home</a></h1>
						</div>
						:
						<div className="row">
							<h1 className="ui huge header">404: Page not Found. Redirect to <a href="/dashboard">Dashboard</a></h1>
						</div>	
				}

				
			</div>
		)
	}
	
}

export default PageNotFound;
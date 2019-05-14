import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default function adminRoute(Component) {

  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
        isAdmin: false,
      };
    }

    componentDidMount() {
		const userId = localStorage.getItem("userId");
		axios.get(`https://sitegauge.io/api/${userId}/info`)
			.then((res) => {
				if(res.data.is_admin === 1){
					this.setState({ loading: false, isAdmin: true });	
				}
				else{
					this.setState({ loading: false, redirect: true });
				}
			})
			.catch((err) => {
				this.setState({ loading: false, redirect: true });
			})
  	}

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (this.state.isAdmin === true) { // allow to go to admin page
        return (
	        <React.Fragment>
	          <Component {...this.props} />
	        </React.Fragment>
	    );
      }
      return <Redirect to="/dashboard" />;  // redirect non admin to dashboard
    }
  }

}
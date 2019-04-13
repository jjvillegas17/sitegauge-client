import React, { Component } from 'react';

const AuthContext = React.createContext();

class AuthProvider extends Component{
	state = {
		accessToken: this.props.data.token,
		isValid: true
	}
	render() {
		return (
			<AuthContext.Provider value={
				{
					state: this.state,
					logout: () => this.setState({isValid:false})
				}
			}>
				{this.props.children}
			</AuthContext.Provider>
		)
	}
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
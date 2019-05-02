import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            repeatPassword: '',
            firstName: '',
            lastName: '',
            emailError: '',
            repeatPassError: '',
            error: '',
            toRedirect: false,
        }
    }

    handleEmailChange = event => {
        this.setState({ email: event.target.value }, () => {
          this.validateEmail();
        });
    };

    handlePasswordChange = (event) =>{
        this.setState({
          password: event.target.value
        })
    }

    handleRepeatPasswordChange = (event) =>{
        this.setState({
          repeatPassword: event.target.value }, () => {
              this.validateRepeatPass();
        });
    }

    handleFnameChange = (event) =>{
        this.setState({
          firstName: event.target.value
        })
    }

    handleLnameChange = (event) =>{
        this.setState({
          lastName: event.target.value
        })
    }

    validateEmail = () =>{
        this.setState({
            emailError: /.+@.+\.[A-Za-z]+$/.test(this.state.email) ?  "" : "Enter a valid email" 
        });
    }

    validateRepeatPass = () =>{
        this.setState({
            repeatPassError: this.state.password === this.state.repeatPassword ?  "" : "Passwords don't match" 
        });
    }

    handleValidateEmail = (event) => {
        if(/.+@.+\.[A-Za-z]+$/.test(this.state.email)){
            return false;
        }
        return true;
    }

    handleSignup = (event) => {
        event.preventDefault();
      
        axios.post('https://sitegauge.io/api/register', {
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.repeatPassword,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        })
        .then((response) => {
            this.setState({
                toRedirect: true,
            });
        })
        .catch((error) => {
            console.log(Object.entries(error.response.data.message[0]));
            this.setState({
                error: Object.entries(error.response.data.message[0]),
                toRedirect: false
        });
      });
     }

    render() {
        if(this.state.toRedirect){
            return <Redirect to={
                {pathname: '/'}
            }/>;
        }

        console.log(this.state);
        return (
          <div className="ui grid container" style={{marginTop:"20px"}}>
            <div className="ui text container">
                    <div className="ui segment" style={{borderRadius:'20px', backgroundColor:"#3cbcc3"}}>
                        <div>
                            <h1 className="ui center aligned header">Sign Up</h1>
                            <div></div>
                        </div>
                        { this.state.error?
                            <div className="ui negative message">
                                <i className="close icon"></i>
                                <div className="header">
                                    Your sign up is unsuccessful
                                </div>
                                <ul className="list">
                                    {
                                        this.state.error.map(err => {
                                            console.log(err)
                                            return <li>{err[1][0]}</li>
                                        })
                                    }
                                </ul>
                            </div>
                            :
                            null
                        }
                        <form className="ui form" onSubmit={this.handleLogin}>
                            <div className={this.state.emailError === ''? 'field': 'field error'}>
                                <label>Email</label>
                                <div className="twelve wide field">
                                  <div className="field">
                                    <input 
                                        type="text" name="email"
                                        onChange={this.handleEmailChange}
                                        value={this.state.email} 
                                        placeholder="Email address" />
                                    <div style={{color:"#D8000C"}}>{this.state.emailError}</div>
                                  </div>
                                </div>
                            </div>
                            <div className="field">
                                <label>Name</label>
                                <div className="two fields">
                                  <div className="field">
                                    <input 
                                        type="text" name="firstName" 
                                        onChange={this.handleFnameChange}
                                        value={this.state.firstName}
                                        placeholder="First Name" />
                                  </div>
                                  <div className="field">
                                    <input 
                                        type="text" name="lastName" 
                                        onChange={this.handleLnameChange}
                                        value={this.state.lastName}
                                        placeholder="Last Name" />
                                  </div>
                                </div>
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <div className="twelve wide field">
                                  <div className="field">
                                    <input type="password"
                                        name="password1"
                                        onChange={this.handlePasswordChange}
                                        value={this.state.password} 
                                         placeholder="Password" />
                                  </div>
                                </div>
                            </div>
                            <div className="field">
                                <label>Repeat Password</label>
                                <div className="twelve wide field">
                                  <div className="field">
                                    <input 
                                        type="password" 
                                        name="repeatPassword"
                                        onChange={this.handleRepeatPasswordChange}
                                        value={this.state.repeatPassword} 
                                        placeholder="Repeat password" />
                                     <div style={{color:"#D8000C"}}>{this.state.repeatPassError}</div>
                                  </div>
                                 
                                </div>
                            </div>
                            <div className="ui center aligned grid" style={{marginTop:'30px', marginBottom:'10px'}}>
                                <div className="field">
                                    <div className="twelve wide field">
                                      <div className="field">
                                        <input 
                                            type="submit" 
                                            className="ui primary button"
                                            onClick={this.handleSignup} 
                                            style={{width:'120px'}}
                                            value="Submit"
                                        />
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;

import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            emailError: '',
            error: '',
            isAdmin: '',
            toRedirect: false,
            data: [],
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

    validateEmail = () =>{
        this.setState({
            emailError: /.+@.+\.[A-Za-z]+$/.test(this.state.email) ?  "" : "Enter a valid email" 
        });
    }

    handleValidateEmail = (event) => {
        if(/.+@.+\.[A-Za-z]+$/.test(this.state.email)){
            return false;
        }
        return true;
    }

    handleLogin = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        let data = [], toRedirect = false, isAdmin = '', isBlocked = ''; 
        await axios.post('https://sitegauge.io/api/login', {
            email: email,
            password: password
          })
          .then((response) => {
            console.log(response.data.data);
            if(response.data.data.is_blocked === 0){
                localStorage.setItem('accessToken', response.data.data.token);
                localStorage.setItem('userId', response.data.data.user_id);
                data = response.data;                
            }
            else{
                isBlocked = 1;
                this.setState({ error: "This account is blocked by the admin."})
            }

          })
          .catch((error) => {
            this.setState({
                error: error.response.data.message,
                toRedirect: false
            });

          });

        if(data.length === 0){
            return;
        }

        const userId = localStorage.getItem("userId");
        await axios.get(`https://sitegauge.io/api/${userId}/info`)
            .then(res => {
                isAdmin = res.data.is_admin;
                console.log(isAdmin);
                localStorage.setItem('x', isAdmin); 
                toRedirect = true;
            })
            .catch(error => {
                this.setState({
                    error: error.response.data.message,
                    toRedirect: false
                });
            })

        this.setState({ data: data, toRedirect: toRedirect, isAdmin: isAdmin});
    }

    render() {
        if(this.state.toRedirect){
            if(this.state.isAdmin === 1){
                return <Redirect to={
                    {pathname: '/admin'}
                }/>;
            }
            else{
                return <Redirect to={
                    {pathname: '/dashboard'}
                }/>;    
            }
            
        }

        return (
          <div className="ui grid container" style={{marginTop:"20px"}}>
            <div className="ui text container">
                    <div className="ui center aligned segment" style={{borderRadius:'20px', backgroundColor:"#3cbcc3"}}>
                        <div>
                            <h1 className="ui center aligned header">Log in to your account</h1>
                            <div></div>
                        </div>
                        { this.state.error?
                            <div className="ui negative message">
                                <i className="close icon"></i>
                                <div className="header">
                                    Your log in is unsuccessful
                                </div>
                                <ul className="list">
                                    <li>{this.state.error}</li>
                                </ul>
                            </div>
                            :
                            null
                        }
                        <form className="ui form" onSubmit={this.handleLogin}>
                            <div className={`field ${this.state.emailError ? 'error': ''}`}
                                 style={{marginTop:'30px'}}
                            >
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input 
                                        type="text" 
                                        placeholder="Email"
                                        name='email'
                                        value={this.state.email}
                                        onChange={this.handleEmailChange}
                                        onBlur={this.validateEmail}
                                    />
                                </div>
                                <div style={{color:"#D8000C"}}>{this.state.emailError}</div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input 
                                        type="password" 
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handlePasswordChange}
                                    />
                                </div>
                            </div>
                                <div className="ui center aligned grid" style={{marginTop:'10px'}}>
                                    <button 
                                        className="ui primary large button"
                                        disabled={this.handleValidateEmail()}
                                        style={{width:'120px'}}
                                     >Log In</button>
                                </div>
                        </form>
                        <div className="ui center aligned grid" style={{marginTop:'30px', marginBottom:'10px'}}>
                            <p>Don't have an account? <a href="/signup" style={{color: "red"}}>Sign Up</a></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;

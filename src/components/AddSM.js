import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Menu from './Menu';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import queryString from 'query-string';

class AddSM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 0,
            pages: [],
            accounts:[],
            page: '',
            errorLogIn: '',
            fbData: '',
            loading: false,
        }
    }

    changeType = (event) => {
        this.setState({type:parseInt(event.target.value, 10)});
    }

    componentWillMount(){
        const qs = queryString.parse(this.props.location.search);
        if(Object.keys(qs).length === 0){
            this.setState({ type:0 })
        }
        else{
            const acct = {
                id: qs.id,
                name: qs.name,
                username: qs.username,
                following: parseInt(qs.following,10),
                followers: parseInt(qs.followers,10),
                tweets: parseInt(qs.tweets,10),
                user_id: parseInt(localStorage.getItem("userId"),10),
            }
            this.setState({ type: parseInt(qs.type,10), accounts: acct })
        }
    }

    responseFacebook = (response) => {
        console.log(response.accessToken);
        axios.get(`https://sitegauge.io/login/facebook/callback?token=${response.accessToken}`)
            .then((response) => {
                this.setState({
                    pages: response.data
                });
            })
            .catch((error) => { 
                console.log(error); 
            });
    }                    

    handleAccountChange = (event) => {
        this.setState({
            page: event.target.value
        });
    }

    onTwitterSuccess = (e) => {
        e.preventDefault();
        axios.get(`https://sitegauge.io/login/twitter?userId=${localStorage.getItem("userId")}`)
            .then((response) => {
                console.log(response.data);
                window.location.href = response.data;
                // this.setState({
                //     pages: response.data
                // });
            })
            .catch((error) => { 
                console.log(error); 
            });
    }

    findPage = () => {
        return this.state.pages.find(obj => {
            return obj.id === this.refs.page.value;        
        });
    }

    appendAcct = (id) => {
        const userId = localStorage.getItem('userId');
        const key = {
            type: this.state.type,
            userId: userId,
        }

        if(!localStorage.getItem(JSON.stringify(key))){
            localStorage.setItem(JSON.stringify(key), JSON.stringify([id]));
        }
        else{
            const pages = JSON.parse(localStorage.getItem(JSON.stringify(key)));
            pages.push(id);
            localStorage.setItem(JSON.stringify(key), JSON.stringify(pages));
        }    
        
    }

    save = async (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const acct = this.state.type === 0 ?  
            {
                pageId: this.findPage().id,
                pageToken: this.findPage().token,
                pageName: this.findPage().name,
                userId: localStorage.getItem("userId"),
            }         
            :
            {
                id: this.state.accounts.id,
                name: this.state.accounts.name,
                username: this.state.accounts.username,
                following: this.state.accounts.following,
                followers: this.state.accounts.followers,
                tweets: this.state.accounts.tweets,
                userId: localStorage.getItem("userId")
            }
        
        const url = this.state.type === 0 ? 
            "https://sitegauge.io/api/fb/add-page" 
            : 
            "https://sitegauge.io/api/twitter/add-account";
         
        await axios.post(url,
            acct,
          )
        .then((response) => {
            console.log(response);
            // save accounts of user to localstorage if only there's no error
            this.appendAcct(this.state.type===0? acct.pageId : acct.id);
        })
        .catch((error) => { 
            console.log(error); 
        });

        if(this.state.type === 0){
            console.log(acct.pageId);
            await axios.get(`https://sitegauge.io/api/fb/${acct.pageId}/dashboard-metrics?pageToken=${acct.pageToken}`)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => { 
                console.log(error); 
            });    
        }

        // window.location.href = "/dashboard";

    }

    getAccounts = () => {
        if(this.state.type === 1 && this.state.accounts.length !== 0){
            console.log(1);
            return <option value="this.state.accounts.id" selected>@{this.state.accounts.username}</option>;
        }
        else if (this.state.type === 0 && this.state.pages.length !== 0){
            console.log(2);
            return (this.state.pages.map(function(object, i){
                return <option value={object.id} key={i}>{object.name}</option>
            })
            );
        }
        else{
            console.log(3)
            return <option value="none" selected>Select Account</option>;
        }
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
                                        Add a Social Media
                                    </h1>
                                </div>
                                <div className="ui raised very padded text container segment">
                                    <form className="ui form">
                                        <div className="field">
                                            <label>Type</label>
                                            <select className="ui fluid dropdown" value={this.state.type === 0? 0 : 1} onChange={this.changeType}>
                                                <option value="0">Facebook</option>
                                                <option value="1">Twitter</option>
                                            </select>
                                        </div>
                                        <div className="field">
                                            {
                                                this.state.type === 0? 
                                                    <FacebookLogin
                                                        appId="774972786221082" 
                                                        fields="name,email,picture"
                                                        scopes="public_profile, email, user_birthday"
                                                        callback={this.responseFacebook}
                                                        cssClass="ui facebook button"
                                                        textButton="Sign in to Facebook"
                                                    />
                                                    :
                                                    <button className="ui facebook button" 
                                                        onClick={this.onTwitterSuccess}
                                                    > Sign in to Twitter</button>
                                            }
                                        </div>
                                        <div className="field">
                                            {
                                                this.state.type === 0? 
                                                    <label>Pages</label> : <label>Accounts</label> 
                                            }                                            
                                            <select className="ui fluid dropdown" ref="page" onChange={this.handleAccountChange} >
                                                {this.getAccounts()}
                                            </select>
                                        </div>
                                        <div className="field">
                                            <button 
                                                onClick={this.save}
                                                className="ui primary button"
                                            >
                                              Save
                                            </button>
                                        </div>
                                        {
                                           this.state.loading === true?
                                            <div className="field">
                                                <div className="ui active centered inline text loader">
                                                    Saving analytics
                                                </div>
                                            </div>
                                            :
                                            null
                                        }   
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

export default AddSM;

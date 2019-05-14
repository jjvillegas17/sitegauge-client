import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Menu from './Menu';
import { Message } from 'semantic-ui-react';
import axios from 'axios';
/* make a home component then accept a props that will
   identify which is to be rendered in the content part
*/

const userId = localStorage.getItem("userId");

class UploadAnalytics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            file: '',
            accounts: [],
            pages: [],
            gaccounts:[],
            selectedAccount: '',
            loading: false,
            errorSaving: false,
        }
    }

    handleUpload = (e) => {
        this.setState({file: e.target.files[0]});
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const id = this.refs.account.value;

        if(this.refs.account.value === "none"){
            this.setState({errorSaving: true, loading: false});
            return;
        }

        let formData = new FormData();
        formData.append('file', this.state.file);

        this.setState({loading: true});
        if(this.state.type === 2){
            await axios.post(`https://sitegauge.io/api/twitter/${userId}/${id}/upload`,
                formData,
                {
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                }
              )
            .then((response) => {
                this.setState({errorSaving: false});
            })
            .catch((error) => { 
                console.log(error);
                this.setState({ errorSaving: true, loading: false});
            });
        }
        else if(this.state.type === 1){
            await axios.post(`https://sitegauge.io/api/fb/${userId}/${id}/upload`,
                formData,
                {
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                }
              )
            .then((response) => {
                this.setState({errorSaving: false});
            })
            .catch((error) => { 
                console.log(error);
                this.setState({ errorSaving: true, loading: false});
            });
        }
        else{
            const m = this.refs.metric.value;
            await axios.post(`https://sitegauge.io/api/google/${userId}/${id}/upload/${m}`,
                formData,
                {
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                }
              )
            .then((response) => {
                this.setState({errorSaving: false, loading: false});
            })
            .catch((error) => { 
                console.log(error); 
                this.setState({ errorSaving: true, loading: false});
            });   
        }

        if(this.state.type !== 0 && this.state.errorSaving === false){
            window.location.href = "/dashboard";    
        }
    }

    changeType = (e) => {
        if(e.target.value === "0"){
            this.getGAccounts();
        }    
        else if(e.target.value === "1"){
            this.getPages();
        }
        else{
            this.getTwitterAccts();
        }
        this.setState({type: parseInt(e.target.value,10)});
    }

    getGAccounts = () => {
        const userId = localStorage.getItem("userId");
        axios.get(`https://sitegauge.io/api/google/${userId}/accounts`)
            .then((res) => {
                this.setState({ gaccounts: res.data});
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getPages = () => {
        const userId = localStorage.getItem("userId");
        axios.get(`https://sitegauge.io/api/fb/${userId}/pages`)
            .then((res) => {
                this.setState({ pages: res.data});
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getTwitterAccts = () => {
        const userId = localStorage.getItem("userId");
        axios.get(`https://sitegauge.io/api/twitter/${userId}/accounts`)
            .then((res) => {
                this.setState({ accounts: res.data});
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getAccounts = () => {
        let accts;
        if(this.state.type === 0){
            accts = this.state.gaccounts;
        }
        else if(this.state.type === 1){
            accts = this.state.pages;
        }
        else if(this.state.type === 2){
            accts = this.state.accounts;
        }
        else{
            return (<option value="none" key="none">Select Account</option>);
        }

        if(accts.length !== 0){
            return (accts.map(account => {
                if(this.state.type === 2){
                    return <option value={account.id} key={account.id}>@{account.username}</option>
                }
                else if(this.state.type === 1){
                    return <option value={account.id} key={account.id}>{account.page_name}</option>
                }
                else{
                    return <option value={account.profile_id} key={account.profile_id}>{account.profile_name}</option> 
                } 
            }
            ));
        }
        else{
            return <option value="none" selected>Select Account</option>;
        }
    }

    renderError() {
        if(this.state.errorSaving === true){
            return(
                <div className="ui three column centered grid">
                    <div className="ui centered row" style={{marginTop: "-30px", marginBottom: "10px"}}>
                        <Message negative floating style={{ width: "350px"}}>Error saving! Please try again.</Message>
                    </div>
                </div>
            )
        }
        else{
            return (null);
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
                                    Upload Analytics
                                </h1>
                            </div>
                            <div className="ui raised very padded text container segment">
                            {
                                this.renderError()
                            }
                                <form className="ui form">
                                    <div className="field">
                                        <label>Type</label>
                                        <select className="ui fluid dropdown"
                                            onChange={this.changeType}
                                        >
                                            <option value="none" selected>Select Type</option>;
                                            <option value="0">Google</option>
                                            <option value="1">Facebook</option>
                                            <option value="2">Twitter</option>
                                        </select>
                                    </div>
                                     <div className="field">
                                        <div className="row">
                                            <strong>Accounts</strong>
                                            <select className="ui fluid dropdown" 
                                                ref="account"
                                            >
                                                {this.getAccounts()}
                                            </select>
                                        </div>
                                    </div>
                                    { this.state.type === 0?
                                        <div className="field">
                                            <div className="row">
                                                <strong>Metric</strong>
                                                <select className="ui fluid dropdown" 
                                                    ref="metric"
                                                >
                                                   <option value="Users">Users</option>
                                                   <option value="Sessions">Sessions</option>
                                                   <option value="New Users">New Users</option>
                                                   <option value="Sessions Per User">Sessions Per User</option>
                                                   <option value="Pageviews">Pageviews</option>
                                                   <option value="Pages Per Session">Pages Per Session</option>
                                                   <option value="Avg Session Duration">Avg Session Duration</option>
                                                   <option value="Bounce Rate">Bounce Rate</option>
                                                </select>
                                            </div>
                                        </div>
                                        :
                                        null
                                    }
                                    <div className="field">
                                        <div className="row">
                                            <label htmlFor="file" className="ui icon button">
                                                    <i className="file icon"></i>
                                                    Open File</label>
                                            <input type="file" 
                                                id="file" 
                                                onChange={this.handleUpload}
                                                style={{display:"none"}}
                                            />
                                        </div>
                                        <div className="row">
                                                {'  '}{this.state.file.name}
                                        </div>
                                        <div className="row">
                                            <button
                                                className="ui button"
                                                onClick={this.handleSubmit}
                                                style={{ width: "100px", marginTop: "15px"}}
                                            >
                                                Upload
                                            </button>
                                        </div>
                                        {
                                           this.state.loading === true?
                                            <div className="row" style={{ marginTop: "15px"}}>
                                                <div className="ui active centered inline text loader">
                                                    Saving analytics
                                                </div>
                                            </div>
                                            :
                                            null
                                        } 
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

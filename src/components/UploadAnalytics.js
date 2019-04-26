import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Menu from './Menu';
import axios from 'axios';
/* make a home component then accept a props that will
   identify which is to be rendered in the content part
*/

class UploadAnalytics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 0,
            file: '',
            accounts: [],
            pages: [],
            gaccounts:[],
            selectedAccount: '',
            loading: false,
        }
    }

    handleUpload = (e) => {
        this.setState({file: e.target.files[0]});
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const id = this.refs.account.value;
        let formData = new FormData();
        formData.append('file', this.state.file);

        this.setState({loading: true});
        console.log(formData);
        if(this.state.type === 2){
            await axios.post(`https://sitegauge.io/api/twitter/${id}/upload`,
                formData,
                {
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                }
              )
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => { 
                console.log(error); 
            });
        }
        window.location.href = "/dashboard";
    }

    changeType = (e) => {
        if(e.target.value === 0){

        }
        else if(e.target.value === 1){

        }
        else{
            this.getTwitterAccts();
        }
        this.setState({type: parseInt(e.target.value,10)});
    }

    getTwitterAccts = () => {
        const userId = localStorage.getItem("userId");
        axios.get(`https://sitegauge.io/api/twitter/${userId}/accounts`)
            .then((res) => {
                console.log(res);
                this.setState({ accounts: res.data});
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getAccounts = () => {
        if(this.state.accounts.length !== 0){
            return (this.state.accounts.map(account => {
                if(this.state.type === 2){
                    return <option value={account.id} key={account.id}>@{account.username}</option>
                }
                else if(this.state.type === 1){
                    return <option value={account.id} key={account.id}>{account.page_name}</option>
                }
                else{ // google

                } 
            }
            ));
        }
        else{
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
                                    Upload Analytics
                                </h1>
                            </div>
                            <div className="ui raised very padded text container segment">
                                <form className="ui form">
                                    <div className="field">
                                        <label>Type</label>
                                        <select className="ui fluid dropdown"
                                            onChange={this.changeType}
                                        >
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
                                                onChange={this.handleAccountChange}
                                            >
                                                {this.getAccounts()}
                                            </select>
                                        </div>
                                    </div>
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

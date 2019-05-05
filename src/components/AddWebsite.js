import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Menu from './Menu';
import { Message } from 'semantic-ui-react';
import axios from 'axios';
import queryString from 'query-string';

/* make a home component then accept a props that will
   identify which is to be rendered in the content part
*/
const userId = localStorage.getItem("userId");

class AddWebsite extends Component {
    state = {
        token: '',
        refreshToken: '',
        created: '',
        expiresIn: '',
        accounts: [],
        account: '',
        property: '',
        profile: '',
        email:'',
        loading: false,      
        errorFetching: false,
        errorSaving: false,
    }

    handleLogin = (e) => {
        e.preventDefault();
        axios.get(`https://sitegauge.io/login/google`)
            .then((res) => {
                console.log(res.data);
                window.location.href = res.data;
            })
            .catch((err) => {
                console.log(err);
            })
    }

    async componentDidMount(){
        const qs = queryString.parse(this.props.location.search);
        console.log(qs);
        if(Object.keys(qs).length === 0){
            return
        }

        axios.get(`https://sitegauge.io/api/google/get-accounts?token=${qs.access_token}`)
            .then((res) => {
                this.setState({
                    accounts: res.data, 
                    account: res.data[0],
                    property: res.data[0].properties[0],
                    profile: res.data[0].properties[0].views[0],
                });
            })
            .catch((err) => {
                this.setState({errorFetching: true})
                console.log(err);
            })

        this.setState({ token: qs.access_token, refreshToken: qs.refresh_token, email: qs.email,
                expiresIn: parseInt(qs.expires_in, 10) , created: qs.created
         });
    }

    changeAccount = (e) => {        
        const account = JSON.parse(e.target.value);
        // const account = this.state.accounts.find(obj => {
        //   return obj.accountId === e.target.value
        // });
        this.setState({ account: account, property: account.properties[0], profile: account.properties[0].views[0] });
    }

    changeProperty = (e) => {
        this.setState({ property: JSON.parse(e.target.value) });
        // console.log(this.state);
    }

    changeView = (e) => {
        console.log(JSON.parse(e.target.value));
        this.setState({ profile: JSON.parse(e.target.value) });
    }

    save = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("userId");
        
        this.setState({loading: true});
        
        await axios.post(`https://sitegauge.io/api/google/${userId}/add-account`, {
            dateCreated:this.state.property.dateCreated,
            profileId: this.state.profile.profileId,
            profileName: this.state.profile.profileName,
            propertyId: this.state.property.propertyId,
            propertyName: this.state.property.propertyName,
            userId: localStorage.getItem("userId"),
            email: this.state.email,
            token: this.state.token,
            refreshToken: this.state.refreshToken,
            created: this.state.created,
            expiresIn: this.state.expiresIn
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
                this.setState({errorSaving: true, loading: false}); 
            });

        await axios.get(`https://sitegauge.io/api/google/${this.state.profile.profileId}/get-acquisition-metrics?token=${this.state.token}`)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => { 
                console.log(error);
                this.setState({errorSaving: true, loading: false});  
            });

        await axios.get(`https://sitegauge.io/api/google/${userId}/${this.state.profile.profileId}/get-audience-metrics?token=${this.state.token}`)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => { 
                console.log(error);
                this.setState({errorSaving: true, loading: false});  
            });

        await axios.get(`https://sitegauge.io/api/google/${this.state.profile.profileId}/get-behavior-metrics?token=${this.state.token}`)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => { 
                console.log(error);
                this.setState({errorSaving: true, loading: false});  
            });

        if(this.state.errorSaving === false){
            window.location.href = "/dashboard";            
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
        else if(this.state.errorFetching === true){
            return(
                <div className="ui three column centered grid">
                    <div className="ui centered row" style={{marginTop: "-30px", marginBottom: "10px"}}>
                        <Message negative floating style={{ width: "350px"}}>Error getting account! Please try again.</Message>
                    </div>
                </div>
            )
        }
        else{
            return (null)
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
                                        Add a Website
                                    </h1>
                                </div>
                                <div className="ui raised very padded text container segment">
                                {
                                    this.renderError()
                                }
                                   <button className="ui facebook button"
                                       onClick={this.handleLogin}
                                   >
                                       Sign in to Google
                                   </button>
                                   <form className="ui form">
                                       <div className="field">
                                       </div>
                                   {
                                       this.state.accounts.length === 0? 
                                       null
                                       :
                                        <div className="field">
                                            <label>Accounts</label>
                                            <select className="ui fluid dropdown" onChange={this.changeAccount}>
                                                {    
                                                    this.state.accounts.map(acc => {
                                                        return <option value={JSON.stringify(acc)} 
                                                                        key={acc.accountId}
                                                               >{acc.accountName}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                           
                                   }
                                   {
                                       this.state.account === '' ?
                                       null
                                       :
                                       <div className="field">
                                            <label>Properties</label>
                                            <select className="ui fluid dropdown" onChange={this.changeProperty}>
                                                {   
                                                    this.state.account.properties.map(property => {
                                                        return <option 
                                                                value={JSON.stringify(property)} 
                                                                key={property.propertyId}>{property.propertyName}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                   }
                                   {
                                       this.state.property === '' ?
                                       null
                                       :
                                       <div className="field">
                                            <label>Views</label>
                                            <select className="ui fluid dropdown" onChange={this.changeView}>
                                                {   
                                                    this.state.property.views.map(profile => {
                                                        return <option 
                                                                 value={JSON.stringify(profile)} 
                                                                 key={profile.profileId}>{profile.profileName}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                   }
                                   {
                                       this.state.accounts.length === 0?
                                       null
                                       :
                                       <div className="field">
                                            <button 
                                                onClick={this.save}
                                                className="ui primary button"
                                            >
                                              Save
                                            </button>
                                        </div>
                                   }
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

export default AddWebsite;

import React, { Component, Fragment } from 'react';
import Sidebar from './Sidebar';
import Menu from './Menu';
import axios from 'axios';
import FacebookPage from './FacebookPage';
import TwitterAccount from './TwitterAccount';
import GoogleAccount from './GoogleAccount';

class D extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pages: [],
            twitters: [],
            googles: [],
            loaded: false,
            isAnalyticsLoaded: true,
        }
    }

    getPages = () => {
        const userId = localStorage.getItem("userId");
        return axios.get(`https://sitegauge.io/api/fb/${userId}/pages`)
    }

    getTwitters =  () => {
        const userId = localStorage.getItem("userId");
        return axios.get(`https://sitegauge.io/api/twitter/${userId}/accounts`)
    }

    getGoogles = () => {
        const userId = localStorage.getItem("userId");
        return axios.get(`https://sitegauge.io/api/google/${userId}/accounts`)
    }

    async componentDidMount(){
        try{
            const pages = await this.getPages();  
            this.setState({ pages: pages.data });  
        }
        catch(err){
            console.log(err);
        }

        try{
            const twitters = await this.getTwitters();
            this.setState({ twitters: twitters.data });  
        }
        catch(err){
            console.log(err);
        }

        try{
            const googles = await this.getGoogles();
            this.setState({ googles: googles.data });  
        }
        catch(err){
            console.log(err);
        }
    }

    formatDate = (date) => {
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();

        if (month.length < 2){
            month = '0' + date.getUTCMonth();  
        } 

        if (day.length < 2){
            day = '0' + date.getUTCDate();
        }

        return [date.getUTCFullYear(), month, day].join('-');
    }

  render() {
    return (
    <div>
        <Menu/>
        <div className="ui grid">
            <div className="row">
                <Sidebar />
                <div id="content" className="column" style={{
                    marginLeft: "19%",
                    width: "81%",
                    marginTop: "2em",
                    paddingLeft: "1.5em"
                }}>
                    {/*<div className="ui two column centered grid">
                        <div className="ui centered row">
                        <Message negative floating style={{ width: "350px"}}>Error loading! Please refresh</Message>
                        </div>
                    </div>*/}
                    <div className="ui grid" style={{
                        paddingRight: "4em",

                    }}>
                        {this.state.pages.length === 0? 
                            null:
                            <Fragment>
                            <div className="four column row">
                                    <h1 className="ui huge header" style={{
                                        fontSize:"36px"
                                    }}>
                                        Facebook
                                    </h1>
                            </div>
                            <div className="ui divider" style={{marginTop:"-15px"}}></div>
                            </Fragment>
                        }
                        {
                            this.state.pages.length === 0? 
                            null 
                            :
                            this.state.pages.map(page => {
                                return (
                                    <FacebookPage id={page.id} name={page.page_name} token={page.access_token} key={page.id} />
                                )
                            })
                        }
                        {this.state.twitters.length === 0? 
                            null:
                            <Fragment>
                            <div className="four column row">
                                    <h1 className="ui huge header" style={{
                                        fontSize:"36px"
                                    }}>
                                        Twitter
                                    </h1>
                            </div>
                            <div className="ui divider" style={{marginTop:"-5px"}}></div>
                            </Fragment>
                        }
                        {
                            this.state.twitters.length === 0? 
                            null 
                            :
                            this.state.twitters.map(twitter => {
                                return (
                                    <TwitterAccount 
                                        id={twitter.id} username={twitter.username} 
                                        followers={twitter.followers} following={twitter.following}
                                        tweets={twitter.tweets} key={twitter.id} />
                                )
                            })
                        }
                        {this.state.googles.length === 0?
                            null:
                            <Fragment>
                            <div className="four column row">
                                    <h1 className="ui huge header" style={{
                                        fontSize:"36px"
                                    }}>
                                        Google
                                    </h1>
                            </div>
                            <div className="ui divider" style={{marginTop:"-5px"}}></div>
                            </Fragment>
                        }
                        {
                            this.state.googles.length === 0? 
                            null 
                            :
                            this.state.googles.map(google => {
                                return (
                                    <GoogleAccount 
                                        data={google} key={google.profile_id}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    );
  }
}

export default D;
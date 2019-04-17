import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Menu from './Menu';
import axios from 'axios';
import FacebookPage from './FacebookPage';

class D extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pages: [],
            accounts: [],
            loaded: false,
        }
    }

    getPages = () => {
        const userId = localStorage.getItem("userId");
        return axios.get(`https://sitegauge.io/api/fb/${userId}/pages`);
    }

    getTwitters =  () => {
        const userId = localStorage.getItem("userId");
        return axios.get(`https://sitegauge.io/api/twitter/${userId}/accounts`);
    }

    async componentDidMount(){
        const pages = await this.getPages();
        const twitters = await this.getTwitters();
        axios.get(`https://sitegauge.io/api/twitter/Papajjay/update-account?token=1051570758-PkX7uIurnr8Jibr3Q2ycvXyRjcVp7i72URnF0wc&tokenSecret=6riQfa9rHko8yG21PlYsiMHU0ebH4cJFir5hkWcuN1RII`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        this.setState({ pages: pages.data});  
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
                    <div className="ui grid" style={{
                        paddingRight: "4em",

                    }}>    
                        <div className="four column row">
                            <div className="left floated column">
                                <h1 className="ui huge header" style={{
                                    fontSize:"36px"
                                }}>
                                    Facebook
                                </h1>
                            </div>
                            <div className="right floated column">
                                <button className="ui button">
                                    Download FB Insights
                                </button>
                            </div>
                        </div>
                        <div className="ui divider" style={{marginTop:"-5px"}}></div>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    );
  }
}

export default D;
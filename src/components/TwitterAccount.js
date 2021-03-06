import React, { Component, Fragment } from 'react';
import TweetMetric from './TweetMetric';
import { CSVLink } from "react-csv";
import axios from 'axios';

const userId = localStorage.getItem("userId");

class TwitterAccount extends Component{
    constructor(props) {
        super(props);

        this.state = {
            username:props.username,
            id: props.id,
            followers: 'props.followers',
            following: props.following,
            tweets: props.tweets,
            tweetMetrics: [],
            loaded: false,
        }
    }

    download = () => {
      let metrics = [];    
      if(this.state.tweetMetrics.length !== 0){
        this.state.tweetMetrics.forEach((metric) => {
          const m = Object.assign({}, metric);
          m.text = m.text.split("\n").join(" ");
          metrics.push(m);
        })
        return metrics;        
      }

      return [{}];
    }

    async componentDidMount(){
        const res = await this.updateAccount();
        const res1 = await this.fetchMetrics();
        
        this.setState({
            tweetMetrics: res1.data,               
            tweets: res.data.tweets,
            followers: res.data.followers,
            following: res.data.following,
            loaded: true,
        });
    }

    fetchMetrics = () => {
        return axios.get(`https://sitegauge.io/api/twitter/${userId}/${this.state.id}/tweet-metrics`);
    }

    updateAccount = () =>{
        return axios.get(`https://sitegauge.io/api/twitter/${this.props.username}/update-account`);
    }

    render(){
        if(this.state.loaded === false){
            return ( 
                <div className="row">
                    <div className="ui active centered inline text loader">
                        Fetching analytics
                   </div>
               </div>
            )
        }
    	return (
    		<Fragment>
    			<div className="four column row">
                    <h2 className="ui header">@{this.state.username}</h2>    
                    <div className="right floated column">
                        <button className="ui button" style={{ width: "190px"}}>
                            <CSVLink data={this.download()}>Download Tweets</CSVLink>
                        </button>
                    </div>
                </div>
                <div className="ui six column centered row">
	                <div className="column">
                		<div className="ui card" style={{ width: "150px", backgroundColor:"#438945"}}>
                			<div className="content">
							    <div className="header">{this.state.tweets}</div>
							    <div className="meta">Tweets</div>
							</div>
                		</div>
	              	</div>
	              	<div className="column">
	              		<div className="ui card" style={{ width: "150px", backgroundColor:"#438945"}}>
                			<div className="content">
							    <div className="header">{this.state.following}</div>
							    <div className="meta">Following</div>
							</div>
                		</div>
	              	</div>
	              	<div className="column">
	              		<div className="ui card" style={{ width: "150px", backgroundColor:"#438945"}}>
                			<div className="content">
							    <div className="header">{this.state.followers}</div>
							    <div className="meta">Followers</div>
							</div>
                		</div>
	              	</div>
                </div>
                <div className="ui row">
                	<table className="ui striped table">
                		<thead>
						    <tr>
						      <th>Tweet</th>
                              <th>Likes</th>
                              <th>Retweets</th>
						      <th>Impressions</th>
						      <th>Engagements</th>
						      <th>Engagement Rate</th>
						    </tr>
					    </thead>
					    <tbody>
                        {
                            this.state.tweetMetrics.map(tweetMetric => {
                                return <TweetMetric props={tweetMetric} key={tweetMetric.id}/>
                            })
                        }
					    </tbody>
                	</table>
                </div>
    		</Fragment>
    	)
    }
}

export default TwitterAccount;
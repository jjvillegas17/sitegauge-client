import React, { Component, Fragment } from 'react';
import TweetMetric from './TweetMetric';
import axios from 'axios';


class TwitterAccount extends Component{
    constructor(props) {
        super(props);

        this.state = {
            username:props.username,
            id: props.id,
            followers: props.followers,
            following: props.following,
            tweets: props.tweets,
            tweetMetrics: [],
        }
    }

    async componentDidMount(){
        await this.fetchMetrics();
    }

    fetchMetrics = () => {
        axios.get(`https://sitegauge.io/api/twitter/${this.state.id}/tweet-metrics`)
            .then((res) => {
                // console.log(res.data);
                this.setState({tweetMetrics: res.data});
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render(){
    	return (
    		<Fragment>
    			<div className="four column row">
                    <h2 className="ui header">@{this.state.username}</h2>    
                    <div className="right floated column">
                                    <button className="ui button" style={{ width: "190px"}}>
                                        Download Twitter Analytics
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
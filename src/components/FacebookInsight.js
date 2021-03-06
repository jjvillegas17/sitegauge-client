import React, { Component, Fragment } from 'react';
import PostStats from './PostStats';
import axios from 'axios';
import { Accordion, Icon, Popup } from 'semantic-ui-react'

const deftns = {
	"Your Page": "Page likes that came from people who visited your Page",
	"Search" : "Page likes that came from people who saw you Page or post in search",
	"Restored Likes From Reactivated Accounts": "Page likes that came from people who reactivated their Facebook profile",
	"Page Suggestions": "Page likes that came from people saw your Page in a list of suggested Pages",
	"Ads": "Page likes that came from people who saw your Page or post in an ad",
	"News Feed" : "Page likes that came from people who saw content posted by your Page or about your Page in News Feed",
	"Other": "Page likes that came from other sources"
};

class FacebookInsight extends Component {
	constructor(props) {
        super(props);

        this.state = {
        	peakDates: [],
        	topPosts: [],
        	topLikeSources: [],
        	bestDatesToPost: [],
        	activeIndexs: [],
        	loaded: false,
        }
    }

    componentDidMount = async () => {
    	await this.updateMetricsFans();
    	const res1 = await this.fetchLikePeakDates();
    	const res2 = await this.fetchTopPost();
    	const res3 = await this.fetchTopLikeSources();
    	const res4 = await this.fetchBestTimeToPost();

    	this.setState({
    		bestDatesToPost: res4.data,
    		topPosts: res2.data,
    		peakDates: res1.data,
    		topLikeSources: res3.data,
    		loaded: true,
    	})
    }

    updateMetricsFans = () => {
    	return axios.get(`https://sitegauge.io/api/fb/${this.props.id}/dashboard-metrics-fans?pageToken=${this.props.token}`)
    }

    fetchBestTimeToPost = () => {
    	return axios.get(`https://sitegauge.io/api/insights/fb/${this.props.id}/best-time-to-post`)

    }

    fetchTopPost = () => {
    	return axios.get(`https://sitegauge.io/api/insights/fb/${this.props.id}/most-engaged-post`)

    }

 	fetchLikePeakDates = () => {
 		return axios.get(`https://sitegauge.io/api/insights/fb/${this.props.id}/like-peak-dates`)

 	}

 	fetchTopLikeSources = () => {
 		return axios.get(`https://sitegauge.io/api/insights/fb/${this.props.id}/top-like-source`)
	
 	}

  	handleClick = (e, titleProps) => {
	    const { index } = titleProps;
	    const { activeIndexs } = this.state;
	    const newIndex = activeIndexs;

	    const currentIndexPosition = activeIndexs.indexOf(index);
		if (currentIndexPosition > -1) {
	  		newIndex.splice(currentIndexPosition, 1);
		} 
		else {
	  		newIndex.push(index);
		}
	this.setState({ activeIndexs: newIndex });
  	};


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
    	const { activeIndexs } = this.state;
    	
    	return(
    		<Fragment>
    		<div className="row">
                <h3 className="ui header">{this.props.name}</h3>
            </div>
            <div className="row">
    			<Accordion styled fluid>
			        <Accordion.Title
			          active={activeIndexs.includes(0)}
			          index={0}
			          onClick={this.handleClick}
			        >
			          <Icon name="dropdown" />
			          <strong style={{ fontSize: "15px"}}> 
			          	What are the dates of the current year wherein there are peaks in the increase of new likes?
			          </strong>
			        </Accordion.Title>
			        <Accordion.Content active={activeIndexs.includes(0)}>
			        	{
			        		this.state.peakDates.length === 0?
			        		<p>Currently, there are no peaks in the increase of new likes can be seen yet.</p>
			        		:	
			        		this.state.peakDates.map((date,i) => {
			        			return (
			        				<div className="item" key={i}>
			        					<i className="calendar alternate icon"></i>
			        					<span style={{fontSize:"20px"}}>{" " + date.date_retrieved}</span> 
			        					<span style={{color:"green"}}><i className="caret up icon"></i>{date.avg}%</span>	 
			        				</div>
			        			)
			        		})
			        	}
		        		{
		        			this.state.peakDates.length === 0?
		        			null
		        			:
		        			<p><br/>These particular dates stand out  in the increase of new likes of your page.
			        	The percent of increase is beside the date. Look at the posts you published around these days as the <strong>type</strong> and 
			        	<strong> content</strong> of those posts are the most engaging to the users.</p>
		        		}
			        </Accordion.Content>

			        <Accordion.Title
			          active={activeIndexs.includes(1)}
			          index={1}
			          onClick={this.handleClick}
			        >
			          <Icon name="dropdown" />
			          <strong style={{ fontSize: "15px"}}> 
			          What is my top post of all time in terms of most engaged users?
			          </strong>
			        </Accordion.Title>
			        <Accordion.Content active={activeIndexs.includes(1)}>
			         {
			         	this.state.topPosts.length===0?
			         	<p>You have not published posts yet.</p> 
			         	:
			         	<table className="ui striped table">
	                		<thead>
							    <tr>
							      <th>Type</th>
	                              <th>Message</th>
	                              <th>Targeting</th>
  							      <th>Impressions</th>
							      <th>Engaged users</th>
  							      <th>Reactions</th>
							      <th>Comments</th>
							      <th>Published on</th>
							    </tr>
						    </thead>
						    <tbody>
	                        {
	                            this.state.topPosts.map(post => {
	                                return <PostStats props={post} key={post.id}/>
	                            })
	                        }
						    </tbody>
                		</table>
			         }
			        </Accordion.Content>

			        <Accordion.Title
			          active={activeIndexs.includes(2)}
			          index={2}
			          onClick={this.handleClick}
			        >
			          <Icon name="dropdown" />
			          <strong style={{ fontSize: "15px"}}> 
			          What are my top like sources?
			          </strong>
			        </Accordion.Title>
			        <Accordion.Content active={activeIndexs.includes(2)}>
			         {
			         	this.state.topLikeSources.length===0?
			         	<p>No metrics can be seen.</p> 
			         	:
			         	this.state.topLikeSources.map((like,i) => {
		        			return (
		        				<div className="item" key={i}>
		        					<i className="thumbs up outline icon"></i>
		        					{i === 0?
		        						<strong>Last week:</strong>: <strong>Last month:</strong>
		        					}
		        					<Popup trigger={<span>{"  " + Object.keys(like)}</span>} content={deftns[Object.keys(like)]} inverted />
		        				</div>
		        			)
		        		})
			         }
			         {
			         	this.state.topLikeSources.length===0?
			         	null
			         	:
			         	<p><br/>Analyzing the sources of fans for your page can help 
				         you determine content and channels where you should invest more time to 
				         attract new fans.</p>
			         }
			        </Accordion.Content>

			        <Accordion.Title
			          active={activeIndexs.includes(3)}
			          index={3}
			          onClick={this.handleClick}
			        >
			          <Icon name="dropdown" />
			          <strong style={{ fontSize: "15px"}}> 
			          When are the best times to publish my posts?
			          </strong>
			        </Accordion.Title>
			        <Accordion.Content active={activeIndexs.includes(3)}>
			         {
			         	this.state.bestDatesToPost.length===0?
			         	<p>There are no metrics retrieved yet.</p> 
			         	:
			         	this.state.bestDatesToPost.map((dates,i) => {
			         		return(
			         			<div key={i}>
			         			{i === 0 ? <span style={{fontSize: "18px"}}>Last week</span>: <span style={{fontSize: "18px"}}>Last month</span>}
				         		{dates.map((date,j) => {
				         			return(
			        				<div className="item" key={j}>
			        					<i className="clock icon"></i>
			        					{date.hour > 12 ? 
			        						<span>{date.hour-12 + ":00  PM" }</span>
			        						:
			        						<span>{date.hour + ":00  PM"}</span>
			        					}
			        				</div>
			        				)
				         		})
				         		}
				         		{i === 1? null: <br/>}
				         		</div>
			         		)
		        			
		        		})
			         }
			         {
			         	this.state.bestDatesToPost.length===0?
			         	null
			         	:
			         	<p><br/>Based from your metrics last week and last month, publish your posts on the hours of day
				         listed above as such hours are where your fans will most likely see your post.    
				         </p>
			         }
			         
			        </Accordion.Content>
			   </Accordion>
    		</div>
    		</Fragment>
    	)
    }

}

export default FacebookInsight;

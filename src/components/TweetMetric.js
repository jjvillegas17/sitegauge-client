import React from 'react';

const TweetMetric = (props) => {
	return (
		<tr>
	      <td><a href={props.props.link}>{props.props.text.substring(0,100)}</a></td>
	      <td>{props.props.likes}</td>
	      <td>{props.props.retweets}</td>
	      <td>{props.props.impressions}</td>
	      <td>{props.props.engagements}</td>
	      <td>{props.props.engagement_rate}</td>
	    </tr>
	)
}

export default TweetMetric;

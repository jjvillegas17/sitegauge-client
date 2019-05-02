import React from 'react';

const getIcon = (type) => {
	if(type === "photo")
		return <i className="images icon"></i>
}

const PostStats = (props) => {
	return (
		<tr>
		  <td>{getIcon(props.props.type)}</td>
	      <td><a href={props.props.link}>{props.props.message.substring(0,100)}</a></td>
	      <td>{props.props.targeting}</td>
	      <td>{props.props.impressions}</td>
	      <td>{props.props.engaged_users}</td>
	      <td>{props.props.likes + props.props.love + props.props.wow + props.props.haha +
	      		props.props.sad + props.props.angry
	      }</td>
	      <td>{props.props.comments}</td>
	      <td>{props.props.created_time}</td>
	    </tr>
	)
}

export default PostStats;
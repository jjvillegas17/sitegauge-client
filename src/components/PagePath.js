import React from 'react';

const PagePath = (props) => {
	let viewRate = (props.props.pageviews / props.total.pageviews)*100;
	viewRate = viewRate.toFixed(2);
	return (
		<tr>
	      <td>{props.props.page_path}</td>
	      <td>{props.props.pageviews}</td>  
	      <td>{viewRate}%</td>    
	    </tr>
	)
}

export default PagePath;

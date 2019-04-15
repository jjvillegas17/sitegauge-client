import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


const MetricCard = (props) => {
	return (
		<div className="ui card">
	        <div className="content"> 
	            <div className="header">{props.metric}</div> 
	            <i className="angle double up green icon"></i>
	        </div>
	        <div className="content">
	            <h5 className="ui subheader">{props.state.startDate.format("YYYY-MM-DD")} - {props.state.endDate.format("YYYY-MM-DD")}</h5>
	        </div>
	        <div className="content" style={{ marginLeft: "-25px" }}>
	            <LineChart width={280} height={250} data={Object.values(props.state.fbData[0].page_metrics)}
	              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
	              <CartesianGrid strokeDasharray="3 3" />
	              <XAxis dataKey="date_retrieved" />
	              <YAxis />
	              <Tooltip />
	              <Legend />
	              <Line type="monotone" dataKey={props.metric.toLowerCase()} stroke="#8884d8" />
	            </LineChart>
	        </div>
	    </div>
    )
} 

export default MetricCard;
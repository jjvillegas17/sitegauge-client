import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';


const transformStr = (str) => {
	let newStr = "";
	for (let i = 0; i < str.length; i++) {
		if(str.charAt(i) === '_'){
			newStr += '  ';
			continue;	
		}

		if(i === 0){
			newStr += str.charAt(i).toUpperCase();
			continue;
		}

		newStr += str.charAt(i);
	}

	return newStr;
}
const MetricCard = (props) => {
	return (
		<div className="ui card">
	        <div className="content" style={{backgroundColor: "#438945"}}> 
	            <div className="header">{transformStr(props.metric)}</div> 
	        </div>
	        <div className="content">
	            <h5 className="ui subheader">
	            	{props.startDate.format("YYYY-MM-DD")} - {props.endDate.format("YYYY-MM-DD")}
	            </h5>
	        </div>
	        <div className="content" style={{ marginLeft: "-25px" }}>
	            <LineChart width={280} height={250} data={props.state}
	              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
	              <CartesianGrid strokeDasharray="3 3" />
	              <XAxis dataKey="date_retrieved"/>
	              <YAxis />
	              <Tooltip />
	              <Line type="monotone" name={transformStr(props.metric)} dataKey={props.metric} stroke="#8884d8" />
	            </LineChart>
	        </div>
	    </div>
    )
} 

export default MetricCard;
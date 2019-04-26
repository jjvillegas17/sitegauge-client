import React, { Component, Fragment } from 'react';
import GoogleAudience from './GoogleAudience';
import MetricCard from './MetricCard';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import axios from 'axios';
import originalMoment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(originalMoment);

// profileId: props.data.profile_id,
// profileName: props.data.profile_name,
// propertyId: props.data.property_id,
// propertyName: props.data.property_name,
// email: props.data.email,
// token: props.data.token,
// refreshToken: props.data.refresh_token,

const audience = ['sessions', 'users', 'new_users', 'sessions_per_user', 
            'pageviews', 'pageviews_per_session', 'avg_session_duration', 'bounce_rate'];

class GoogleAccount extends Component{
	constructor(props){
		super(props);

		const today = moment();

		this.state = {
			audienceMetrics: [],
            behaviorMetrics: [],
            acquisitionMetrics: [],
            isOpen: false,
            startDate: today.clone().subtract(10, "days"),
            endDate: today.clone().subtract(3, "days"),
            minDate: moment(props.data.date_created),
            maxDate: today,
		}
	}

	async componentDidMount(){
        await this.fetchMetrics();
    }

    onSelect = (date, states) => {
        this.fetchMetrics(date.start, date.end);
        this.setState({  startDate: date.start, endDate: date.end });
    }

    onToggle = () => {
         this.setState({ isOpen: !this.state.isOpen });
    }

	fetchMetrics = (startD, endD) => {
        const start = typeof startD !== 'undefined' ? 
              startD.format("YYYY-MM-DD") : this.state.startDate.format("YYYY-MM-DD");
        const end = typeof  endD !== 'undefined' ? 
              endD.format("YYYY-MM-DD") : this.state.endDate.format("YYYY-MM-DD");

        console.log(start);
        console.log(end);
        console.log(this.props.data.profile_id);
        axios.get(`https://sitegauge.io/api/google/${this.props.data.profile_id}/fetch-metrics?start=${start}&end=${end}`)
            .then((res) =>{
                this.setState({audienceMetrics: Object.values(res.data.audience),
                     acquisitionMetrics: Object.values(res.data.acquisition),
                     behaviorMetrics: Object.values(res.data.behavior),
                 });
            })
            .catch((err) =>{
                console.log(err);
            })
	}

	renderSelectionValue = () => {
        return (
          <Fragment>
            {this.state.startDate.format("YYYY-MM-DD")}
            {" - "}
            {this.state.endDate.format("YYYY-MM-DD")}
          </Fragment>
        );
    }

	render(){

		return (
			<Fragment>
				<div className="row">
                    <h2 className="ui header">{this.props.data.property_name}</h2>
                </div>
                <div className="six column row">
                    <div className="column" style={{ marginTop:"10px", marginLeft: "-10px"}} >
                        <h3 className="ui header">Audience</h3>
                    </div>
                    <div className="column" style={{ marginLeft:"-25px"}} >
                        <input
                            type="button"
                            value={this.state.isOpen? "Apply date" : "Pick a date range" }
                            className="ui button"
                            onClick={this.onToggle}
                            style={{ width: "150px"}}
                        />
                    </div>
                    {
                        this.state.isOpen ?
                        <Fragment> 
                            <div className="column">
                                <DateRangePicker
                                    value={this.state.value}
                                    onSelect={this.onSelect}
                                    singleDateRange={true}
                                    minimumDate={this.state.minDate.toDate()}
                                    maximumDate={this.state.maxDate.toDate()}
                                />
                            </div>
                            <div className="column"></div>
                            <div className="column">{this.renderSelectionValue()}</div>
                        </Fragment>
                        :
                        <Fragment> 
                            <div className="column">{this.renderSelectionValue()}</div>
                        </Fragment>
                    }
                </div>
                <div className="row">
                    {
                        this.state.audienceMetrics.length === 0? 
                            <div className="ui active centered inline text loader">
                                Fetching analytics
                           </div>
                           :
                           <div className="ui cards">
                               {
                                   audience.map(metric => {
                                       console.log(metric);
                                       return (                                
                                           <MetricCard 
                                               state={this.state.audienceMetrics} 
                                               metric={metric}
                                               startDate={this.state.startDate}
                                               endDate={this.state.endDate}
                                               key={metric}
                                           />    
                                       )
                                   })
                               }
                           </div>
                    }
                </div>
                <div className="row">
                    <h3 className="ui header">Channel Grouping</h3>
                </div>
                <div className="row">
                    {
                        this.state.acquisitionMetrics.length === 0? 
                           <div className="ui active centered inline text loader">
                                Fetching analytics
                           </div>
                           :
                           <BarChart
                            width={900}
                            height={300}
                            data={this.state.acquisitionMetrics}
                            margin={{
                              top: 20, right: 5, left: 0, bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date_retrieved" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="direct" stackId="a" fill="#8884d8" />
                            <Bar dataKey="social" stackId="a" fill="#82ca9d" />
                            <Bar dataKey="referral" stackId="a" fill="#3FEEE6" />
                            <Bar dataKey="organic_search" stackId="a" fill="#190061" />
                            <Bar dataKey="other" stackId="a" fill="#82cd7d" />
                          </BarChart>
                    }
                </div>
			</Fragment>
		)
	}
}

export default GoogleAccount;
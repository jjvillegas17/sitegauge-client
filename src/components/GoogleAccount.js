import React, { Component, Fragment } from 'react';
import MetricCard from './MetricCard';
import { Message } from 'semantic-ui-react';
import PagePath from './PagePath';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import axios from 'axios';
import { CSVLink } from "react-csv";
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
            'pageviews', 'pages_per_session', 'avg_session_duration', 'bounce_rate'];

class GoogleAccount extends Component{
	constructor(props){
		super(props);

		const today = moment();

		this.state = {
			audienceMetrics: [],
            behaviorMetrics: [],
            pageviewsTotal: 0,
            acquisitionMetrics: [],
            isOpen: false,
            startDate: today.clone().subtract(10, "days"),
            endDate: today.clone().subtract(3, "days"),
            minDate: moment(props.data.date_created),
            maxDate: today,
            errorLoading: false,
		}
	}

  download = (param) => {
      let metrics = [];
      let state;

      if(param === "audience"){
        state = this.state.audienceMetrics;
      }
      else if(param === "acquisition"){
        state = this.state.acquisitionMetrics;
      }
      else{
        state = this.state.behaviorMetrics;
      }

      if(state.length !== 0){
        state.forEach((metric) => {
          const m = Object.assign({}, metric);
          delete m.created_at; delete m.updated_at;
          if(param === "audience" || param === "acquisition"){
            delete m.id;
          }
          metrics.push(m);
        })
        return metrics;        
      }
      return [{}];

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

	fetchMetrics = async (startD, endD) => {
        const start = typeof startD !== 'undefined' ? 
              startD.format("YYYY-MM-DD") : this.state.startDate.format("YYYY-MM-DD");
        const end = typeof  endD !== 'undefined' ? 
              endD.format("YYYY-MM-DD") : this.state.endDate.format("YYYY-MM-DD");

        try{
          const metrics = await axios.get(`https://sitegauge.io/api/google/${this.props.data.profile_id}/fetch-metrics?start=${start}&end=${end}`);
          console.log(metrics);
          this.setState({audienceMetrics: Object.values(metrics.data.audience),
                  acquisitionMetrics: Object.values(metrics.data.acquisition),
                  behaviorMetrics: Object.values(metrics.data.behavior),
                  pageviewsTotal: metrics.data.pageviews_total});
        }
        catch(error){
          console.log(error);
          this.setState({errorLoading: true});
        }

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

    getAudience = () => {
      if(this.state.errorLoading === true){
            return (
                <div className="ui three column centered grid">
                    <div className="ui centered row">
                        <Message negative floating style={{ width: "350px"}}>Error loading! Please refresh</Message>
                    </div>
                </div>
            )
        }
        else{
            if(this.state.audienceMetrics.length === 0 && this.state.acquisitionMetrics.length === 0 && this.state.behaviorMetrics.length === 0){
              return (
                <div className="ui active centered inline text loader">
                  Fetching analytics
                </div>
              )
            }
            else{
              return(
              <div className="ui cards">
                 {
                   audience.map(metric => {
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
             )
            }       
        }
    }

    getAcquisition = () => {
        if(this.state.errorLoading === true){
            return (
                <div className="ui three column centered grid">
                    <div className="ui centered row">
                        <Message negative floating style={{ width: "350px"}}>Error loading! Please refresh</Message>
                    </div>
                </div>
            )
        }
        else{
            if(this.state.audienceMetrics.length === 0 && this.state.acquisitionMetrics.length === 0 && this.state.behaviorMetrics.length === 0){
              return (
                <div className="ui active centered inline text loader">
                  Fetching analytics
                </div>
              )
            }
            else{
              return(
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
             )
            }       
        }
    }

    getBehavior = () => {
        if(this.state.errorLoading === true){
            return (
                <div className="ui three column centered grid">
                    <div className="ui centered row">
                        <Message negative floating style={{ width: "350px"}}>Error loading! Please refresh</Message>
                    </div>
                </div>
            )
        }
        else{
            if(this.state.audienceMetrics.length === 0 && this.state.acquisitionMetrics.length === 0 && this.state.behaviorMetrics.length === 0){
              return (
                <div className="ui active centered inline text loader">
                  Fetching analytics
                </div>
              )
            }
            else{
              return(
                <table className="ui striped table">
                    <thead>
                        <tr>
                          <th>Page</th>
                          <th>Pageviews</th>
                          <th>% Pageviews</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.behaviorMetrics.map((metric,i) => {
                            return <PagePath props={metric} total={this.state.pageviewsTotal} key={i}/>
                        })
                    }
                    </tbody>
                </table>
             )
            }       
        }
    }

	render(){

		return (
			<Fragment>
				  <div className="four column row">
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
              <div className="column">
              </div>
              <div className="column">
              </div>
              <div className="column">
                <button className="ui button" style={{ width: "190px"}}>
                    <CSVLink data={this.download("audience")}>Download Audience</CSVLink>
                </button>
              </div>
          </div>
          <div className="row">
              {
                  this.getAudience()
              }
          </div>
          <div className="six column row">
              <h3 className="ui header">Channel Grouping</h3>
              <div className="column">
              </div>
              <div className="column">
              </div>
              <div className="column">
              </div>
              <div className="column">
              </div>
              <div className="column">
                <button className="ui button" style={{ width: "190px"}}>
                    <CSVLink data={this.download("acquisition")}>Download Channels</CSVLink>
                </button>
              </div>
          </div>
          <div className="row">
              {
                  this.getAcquisition()
              }
          </div>
          <div className="eight column row">
              <h3 className="ui header">Top 10 Most Visited Pages</h3>
              <div className="column">
              </div>
              <div className="column">
              </div>
              <div className="column">
              </div>
              <div className="column">
              </div>  
              <div className="column">
              </div>  
              <div className="column">
                <button className="ui button" style={{ width: "190px", marginLeft: "-25px"}}>
                    <CSVLink data={this.download("behavior")}>Download Pages</CSVLink>
                </button>
              </div>
          </div>
          <div className="row">
            {
              this.getBehavior()
            }
          </div>
			</Fragment>
		)
	}
}

export default GoogleAccount;
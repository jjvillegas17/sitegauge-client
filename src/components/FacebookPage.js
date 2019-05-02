import React, { Component, Fragment } from 'react';
import MetricCard from './MetricCard';
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import axios from 'axios';
import { CSVLink } from "react-csv";
import originalMoment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(originalMoment);


const pm = ['views', 'impressions', 'engagements', 'posts_engagements', 
            'content_activity', 'negative_feedback', 'new_likes', 'video_views'];

class FacebookPage extends Component{
    constructor(props) {
        super(props);

        const today = moment();

        this.state = {
            pageName:props.name,
            pageId: props.id,
            pageToken: props.token,
            pageMetrics: [],
            isOpen: false,
            startDate: today.clone().subtract(10, "days"),
            endDate: today.clone().subtract(3, "days"),
            minDate: today.clone().subtract(10, "days"),
            maxDate: today.clone().subtract(3, "days"),
            errorLoading: false,
        }
    }

    async componentDidMount(){
        try{
            await this.updateMetricsDb();
        } catch(error){
            console.log("error");
            this.setState({errorLoading: true});
        }

        const minDate = await this.getMinDate(this.state.pageId);
        const fetchMetrics = await this.fetchMetrics();

        this.setState({ minDate: new Date(minDate.data.data)});
        this.setState({pageMetrics: Object.values(fetchMetrics.data.data.page_metrics)});
    }

    updateMetricsDb = () => {
        console.log(this.state.pageId);
        console.log(this.state.pageToken);
        return axios.get(`https://sitegauge.io/api/fb/${this.state.pageId}/dashboard-metrics?pageToken=${this.state.pageToken}`)
    } 

    fetchMetrics = (startD, endD) => {
        const start = typeof startD !== 'undefined' ? 
              startD.format("YYYY-MM-DD") : this.state.startDate.format("YYYY-MM-DD");
        const end = typeof  endD !== 'undefined' ? 
              endD.format("YYYY-MM-DD") : this.state.endDate.format("YYYY-MM-DD");

        // add userId to params & dynamic fb page id
        return axios.get(`https://sitegauge.io/api/fb/${this.state.pageId}/fetch-metrics?start=${start}&end=${end}`)
    }

    getMinDate = (pageId) => {
        return axios.get(`https://sitegauge.io/api/fb/${pageId}/min-date`)
    }

    onToggle = () => {
         this.setState({ isOpen: !this.state.isOpen });
    }

    onSelect = async (date, states) => {
        const metrics = await this.fetchMetrics(date.start, date.end);
        this.setState({ pageMetrics: Object.values(metrics.data.data.page_metrics) });
        this.setState({  startDate: date.start, endDate: date.end });
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

    checkError = () => {   // get the function to props that will update the errorLoading state
        // of D.js, then check in D.js if error loading and output a modal
        if(this.state.errorLoading === true){
            return (
                <h3 className="ui header"> Could not fetch analytics data. Try reloading</h3>
            )
        }
        else{
            return (
                this.state.pageMetrics.length === 0? 
                <div className="ui active centered inline text loader">
                    Fetching analytics
               </div>
               :
               <div className="ui cards">
                   {
                       pm.map(metric => {
                           return (                                
                               <MetricCard 
                                   state={this.state.pageMetrics} 
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

    render(){
        return(
            <Fragment>
                <div className="four column row">
                    <h2 className="ui header">{this.state.pageName}</h2>    
                    <div className="right floated column">
                                    <button className="ui button" style={{ width: "190px"}}>
                                        <CSVLink data={this.state.pageMetrics}>Download Insights</CSVLink>
                                    </button>
                                </div>
                </div>
                <div className="six column row">
                    <div className="column" style={{ marginTop:"10px", marginLeft: "-10px"}} >
                        <h3 className="ui header">Page Summary</h3>
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
                                    minimumDate={this.state.minDate}
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
                        this.checkError()
                    }
                </div>
            </Fragment>
        )
    }
}

export default FacebookPage;
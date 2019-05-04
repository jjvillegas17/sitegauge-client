import React, { Component, Fragment } from 'react';
import MetricCard from './MetricCard';
import { Message } from 'semantic-ui-react'
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
            startDate: today.clone().subtract(8, "days"),
            endDate: today.clone().subtract(1, "days"),
            minDate: today.clone().subtract(8, "days"),
            maxDate: today.clone().subtract(1, "days"),
            errorLoading: false,
        }
    }

    download = () => {
      let metrics = [];    
      if(this.state.pageMetrics.length !== 0){
        this.state.pageMetrics.forEach((metric) => {
          const m = Object.assign({}, metric);
          delete m.created_at; delete m.updated_at; delete m.id; delete m.uploader_id;
          metrics.push(m);
        })
        console.log(metrics);
        return metrics;        
      }

      return [{}];
    }

    async componentDidMount(){
        try{
            const metrics =  await this.updateMetricsDb();
        } catch(error){
            this.setState({errorLoading: true});
        }

        const minDate = await this.getMinDate(this.state.pageId);
        const fetchMetrics = await this.fetchMetrics();

        this.setState({ minDate: new Date(minDate.data.data)});
        this.setState({pageMetrics: Object.values(fetchMetrics.data.data.page_metrics)});
    }

    updateMetricsDb = () => {
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
                <div className="ui three column centered grid">
                    <div className="ui centered row">
                        <Message negative floating style={{ width: "350px"}}>Error loading! Please refresh</Message>
                    </div>
                </div>

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
                                        <CSVLink data={this.download()}>Download Insights</CSVLink>
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
import React, { Component, Fragment } from 'react';
import Sidebar from './Sidebar';
import Menu from './Menu';
import axios from 'axios';
import MetricCard from './MetricCard';
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(originalMoment);

class D extends Component {
    constructor(props) {
        super(props);

        const today = moment();
        this.state = {
            pages: [],
            fbData: [],
            date: moment.range(today.clone().subtract(7, "days"), today.clone().subtract(3, "days")),
            isOpen: false,
            startDate: today.clone().subtract(7, "days"),
            endDate: today.clone().subtract(3, "days"),
            maxDate: today.clone()
        }
    }

    async componentDidMount(){
        const pages = await this.getPages();

        this.setState({ pages: pages.data});

        let end = new Date();
        end.setDate(end.getUTCDate() - 3);
        let start= new Date( end.getUTCFullYear(), end.getUTCMonth() - 1, end.getUTCDate() + 1); 

        start = this.formatDate(start);
        end = this.formatDate(end);


        let requests = []; 
        this.state.pages.forEach(page => {
            requests.push(axios.get(`https://sitegauge.io/api/fb/${page.id}/fetch-metrics?start=${start}&end=${end}`))
        });

        axios.all(requests).then(results => {
            results.forEach(response => {
                this.setState({
                    fbData: [...this.state.fbData, response.data.data]
                })
            })
        });   
    }

    // getMinDate = (pageId) => {
    //     axios.get(`https://sitegauge.io/api/fb/${pageId}/min-date`)
    //         .then((response) => {
    //             this.setState({ date.start: response.data});
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }

    onSelect = () => {

    }

    formatDate = (date) => {
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();

        if (month.length < 2){
            month = '0' + date.getUTCMonth();  
        } 

        if (day.length < 2){
            day = '0' + date.getUTCDate();
        }

        return [date.getUTCFullYear(), month, day].join('-');
    }

    getPages = () => {
        const userId = localStorage.getItem("userId");
        return axios.get(`https://sitegauge.io/api/fb/${userId}/pages`)
    }

    onToggle = () => {
         this.setState({ isOpen: !this.state.isOpen });
    }

    onSelect = (date, states) => {
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

  render() {
      
    return (
    <div>
        <Menu/>
        <div className="ui grid">
            <div className="row">
                <Sidebar />
                <div id="content" className="column" style={{
                    marginLeft: "19%",
                    width: "81%",
                    marginTop: "2em",
                    paddingLeft: "1.5em"
                }}>
                    <div className="ui grid" style={{
                        paddingRight: "4em",

                    }}>
                        {
                            this.state.fbData.length === 0 ? 
                            <div className="row">
                                <div className="ui active centered inline text loader">
                                    Fetching analytics
                               </div>
                           </div>
                           :
                           <Fragment>
                                <div className="four column row">
                                    <div className="left floated column">
                                        <h1 className="ui huge header" style={{
                                            fontSize:"36px"
                                        }}>
                                            Facebook
                                        </h1>
                                    </div>
                                    <div className="right floated column">
                                        <button className="ui button">
                                            Download FB Insights
                                        </button>
                                    </div>
                                </div>
                                <div className="ui divider" style={{marginTop:"-5px"}}></div>
                                <div className="six column row">
                                    <div className="column" style={{ marginTop:"10px"}} >
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
                                    <div className="ui cards">
                                        <MetricCard state={this.state} metric="Views"/>
                                    </div>
                                </div>
                           </Fragment>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    );
  }
}

export default D;
import React, { Component, Fragment } from 'react';
import Sidebar from './Sidebar';
import Menu from './Menu';
import FacebookInsight from './FacebookInsight';
import axios from 'axios';

class Insights extends Component {
	constructor(props) {
        super(props);

        this.state = {
        	pages: [],
            twitters: [],
            googles: [],
            loaded: false,
        }
    }

    getPages = () => {
        const userId = localStorage.getItem("userId");
        return axios.get(`https://sitegauge.io/api/fb/${userId}/pages`)
    }

    getTwitters =  () => {
        const userId = localStorage.getItem("userId");
        return axios.get(`https://sitegauge.io/api/twitter/${userId}/accounts`)
    }

    getGoogles = () => {
        const userId = localStorage.getItem("userId");
        return axios.get(`https://sitegauge.io/api/google/${userId}/accounts`)
    }

	async componentDidMount(){
        const pages = await this.getPages();
        const twitters = await this.getTwitters();
        const googles = await this.getGoogles();

        this.setState({ pages: pages.data, twitters: twitters.data, googles: googles.data});  
    }

    render(){
    	return(
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
			                	<div className="row">
			                		<h1 className="ui huge header" style={{
                                        fontSize:"36px"
                                    }}>
                                        Insights
                                    </h1>
			                	</div>
			                	{this.state.pages.length === 0? 
		                            null:
		                            <Fragment>
		                            <div className="row">
		                                    <h1 className="ui huge header" style={{
		                                    }}>
		                                        Facebook
		                                    </h1>
		                            </div>
		                            <div className="ui divider" style={{marginTop:"-5px"}}></div>
		                            </Fragment>
		                        }
		                        {this.state.pages.length === 0? 
		                            null 
		                            :
		                            this.state.pages.map(page => {
		                                return (
		                                    <FacebookInsight id={page.id} name={page.page_name} token={page.access_token} key={page.id} />
		                                )
		                            })
                        	   }
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
    	)
    }
}

export default Insights;

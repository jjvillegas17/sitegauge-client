import React, { Component } from 'react';
import Login from './components/Login';
import D from './components/D';
import UploadAnalytics from './components/UploadAnalytics';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddWebsite from './components/AddWebsite';
import Profile from './components/Profile';
import AddSM from './components/AddSM';
import Insights from './components/Insights';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/signup" component={Signup} exact />
          <ProtectedRoute exact path="/dashboard" component={D}/>
          <Route path="/insights" component={Insights} exact />
          <Route path="/upload" component={UploadAnalytics} exact />
          <Route path="/addWebsite" component={AddWebsite} exact />
          <ProtectedRoute exact path="/addSM" component={AddSM}/>
          <Route path="/profile" component={Profile} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

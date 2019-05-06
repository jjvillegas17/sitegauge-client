import React, { Component } from 'react';
import Login from './components/Login';
import D from './components/D';
import UploadAnalytics from './components/UploadAnalytics';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddWebsite from './components/AddWebsite';
import Profile from './components/Profile';
import AddSM from './components/AddSM';
import Insights from './components/Insights';
import DeleteAccount from './components/DeleteAccount';
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
          <ProtectedRoute exact path="/insights" component={Insights} />
          <ProtectedRoute exact path="/delete" component={DeleteAccount} />
          <ProtectedRoute exact path="/upload" component={UploadAnalytics} />
          <ProtectedRoute exact path="/addWebsite" component={AddWebsite} />
          <ProtectedRoute exact path="/addSM" component={AddSM}/>
          <ProtectedRoute exact path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

import React, { Component } from 'react';

import { Router, Route } from 'react-router';
import history from './histrory';

import HomeComponent from './pages/landing/home/HomeComponent';
import DashboardComponent from './pages/admin/dashboard/DashboardComponent';


class App extends Component {
  render() {
    return (

      <Router history={history} forceRefresh={true}>
        <div>
          <Route exact path={'/'} component={HomeComponent} />
          <Route path={'/solicitudes'} component={DashboardComponent} />
        </div>
      </Router>

    );
  }
}

export default App;





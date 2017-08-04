import React from 'react';
import ReactDOM from 'react-dom';
import Connect from './components/connect.jsx';
import Notifications from './components/notifications.jsx';
import LeaderBoard from './components/leader-board.jsx';
import Profile from './components/profile.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navClass: ''
    };
  }

  navClass(location) {

    let map = {
      connected: 'pink',
      leaderBoard: 'green',
      profile: 'blue'
    };

    this.setState({
      navClass: map[location]
    });
  }

  render() {
    return (
      <div>
        <Router>

          <div>
            {/*<div className={this.state.navClass}>*/}
            <div className={this.state.navClass}>
              <div><Link className="nav-item" to="/">Home</Link></div>
              <div><Link className="nav-item" to="/connected">Connect</Link></div>
              <div><Link className="nav-item" to="/leaderBoard">Leader Board</Link></div>
              <div><Link className="nav-item" to="/notifications">Notifications</Link></div>

            </div>

            <Route exact path="/" render={(...props) => {
              return <Profile {...props}
                       navClass={this.navClass.bind(this)} />;
            }} />

            <Route path="/leaderBoard" render={(...props) => {
              return <LeaderBoard {...props}
                       fromNav={true}
                       navClass={this.navClass.bind(this)} />;
            }} />

            <Route path="/notifications" component={Notifications} />

            <Route path="/connected" render={(...props) => {
              return <Connect {...props}
                       navClass={this.navClass.bind(this)} />;
            }} />
          </div>
        </Router>

      </div>
    );
  }
}
ReactDOM.render(<App/>, document.getElementById('root'));

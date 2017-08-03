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
      connected: 'blue',
      leaderBoard: 'lavender',
      profile: 'grey'
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
            <ul className={this.state.navClass}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/connected">Connect</Link></li>
              <li><Link to="/leaderBoard">Leader Board</Link></li>
              <li><Link to="/notifications">Notifications</Link></li>
            </ul>

            <Route exact path="/" render={(...props) => {
              return <Profile {...props}
                       navClass={this.navClass.bind(this)} />;
            }} />

            <Route path="/leaderBoard" render={(...props) => {
              return <LeaderBoard {...props}
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

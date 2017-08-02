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
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/connected">Connect</Link></li>
              <li><Link to="/leaderBoard">Leader Board</Link></li>
              <li><Link to="/notifications">Notifications</Link></li>
            </ul>

            <Route exact path="/" component={Profile} />
            <Route path="/leaderBoard" component={LeaderBoard} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/connected" render={(...props) => <Connect {...props} />}/>
          </div>
        </Router>

      </div>
    );
  }
}
ReactDOM.render(<App/>, document.getElementById('root'));

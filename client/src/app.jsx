import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import Connect from './components/connect.jsx';
import Waiting from './components/waiting.jsx';
import Gameboard from './components/gameboard.jsx';
import ViewBars from './components/viewbars.jsx';
import Signal from './components/signal.jsx';
import LeaderBoard from './components/leader-board.jsx';
import Profile from './components/profile.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      matched: false,
      opponent: '',
      player1: '',
      player2: '',
      name: '',
      serial: ''
    };
  }

  componentWillMount() {
    this.socket = io.connect();

    this.socket.on('matched', function(obj) {
      console.log(obj);
      this.setState({
        matched: true,
        opponent: obj.opponent
      });

      if (obj.left) {
        this.setState({
          player1: localStorage.getItem('name'),
          player2: obj.opponent
        });
      } else {
        this.setState({
          player1: obj.opponent,
          player2: localStorage.getItem('name')
        });
      }
    }.bind(this));

    this.socket.on('testConnection', function(currentConnection) {
      console.log('current connection is ', currentConnection);
    });

  }

  handleConnect() {

    let name = document.getElementById('nickname').value;
    let serial = document.getElementById('serial').value;

    serial = serial.toUpperCase();
    this.setState({ name, serial });

    console.log('handle connect called');
    [
      ['name', name],
      ['serial', serial]
    ]
      .forEach(item => localStorage.setItem(item[0], String(item[1])));

    this.socket.emit('streamConnection', { name, serial });
  }

  handlePlay() {

    console.log('we made it to play here');
    // this.setState({ connected: true });
    // debugger;
    // window.history.pushState({}, null, '/profile');
    {/*<Redirect to="/your-new-location" push />*/}
    // withRouter(({ history }) => {
    //   history.push()
    //   console.log('handle play ', history);
    // });
    // this.socket.emit('connectPlayers', { name: this.state.name, serial: this.state.serial });

  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/leaderBoard">Leader Board</Link></li>
            </ul>

            <Route exact path="/" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/leaderBoard" component={LeaderBoard} />
            <Route path="/connected"
                   render={(...props) =>
                     <Connect {...props}
                       handlePlay={this.handlePlay.bind(this)}
                       handleConnect={this.handleConnect.bind(this)}
                     />
                   }/>
            <Button />
          </div>
        </Router>
        {(this.state.connected && !this.state.matched) && <Waiting />}

      </div>
    );
//     let main = null;
//
//     //NOT CONNECTED
//     if (!this.state.connected) {
//       main =
// // <<<<<<< HEAD
// //         <div>
// //           {<ViewBars socket={this.socket}/>}
// //           <Connect
// //             handlePlay={this.handlePlay.bind(this)}
// //             handleConnect={this.handleConnect.bind(this)}
// //           />
// //         </div>;
// // =======
//       <div>
//       <Connect
//       handlePlay={this.handlePlay.bind(this)}
//       handleConnect={this.handleConnect.bind(this)}
//       />
//       <Signal socket={this.socket}/>
//       </div>;
// // >>>>>>> upstream/master
//     }
//     //WAITING FOR OPPONENT
//     if (this.state.connected && !this.state.matched) {
//       main =
//         <div>
//           <Waiting />
//         </div>;
//
//     }
//
//     //READY TO PLAY
//     if (this.state.connected && this.state.matched) {
//       main =
//         <div>
//           <Gameboard opponent={this.state.opponent}
//             socket={this.socket}
//             player1={this.state.player1}
//             player2={this.state.player2}/>
//         </div>;
//     }
//     return (
//       <div>
//         {main}
//       </div>
//     );
  }
}

const Button = withRouter(({ history}) => (
  <button
    type='button'
    onClick={() => { history.push('/connected') }}
  >
    Click Me!
  </button>
));

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

ReactDOM.render(<App/>, document.getElementById('root'));
// ReactDOM.render(<h1>hello world</h1>, document.getElementById('root'));

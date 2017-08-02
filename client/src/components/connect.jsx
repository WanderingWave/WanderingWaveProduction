import React from 'react';
// import ViewBars from './viewbars.jsx';
import Signal from './signal.jsx';
import io from 'socket.io-client';
import Waiting from './waiting.jsx';
import Gameboard from './gameboard.jsx';

class Connect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      playButton: false,
      matched: false,
      searching: false,
      name: '',
      serial: '',
      opponent: '',
      player1: '',
      player2: ''

    };
    this.name = localStorage.getItem('name') || '';
    this.serial = localStorage.getItem('serial') || '';
  }

  componentWillMount() {
    this.socket = io.connect();

    this.socket.on('matched', function(obj) {
      console.log(obj);
      this.setState({
        matched: true,
        searching: false,
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

  handlePlay() {
    this.setState({searching: true});
    this.socket.emit('startPlaying', { name: this.state.name, serial: this.state.serial });
  }

  handleConnect() {

    let name = document.getElementById('nickname').value;
    let serial = document.getElementById('serial').value;
    serial = serial.toUpperCase();
    this.setState({ name, serial });

    localStorage.setItem('name', name);
    localStorage.setItem('serial', serial);

    console.log('time to connect for a stream');
    this.setState({
      connected: true,
      playButton: true
    });

    this.socket.emit('streamConnection', {name, serial});

  }
  render() {
    console.log('this are the props ', this.props);
    return (
      <div>
        {!this.state.matched &&
        <div>
          <h1 className='welcome-message'> Welcome Back! </h1>
          <h3 className='instructions'> Enter a nickname and your headset number to start a game</h3>
          <input className='nickname'
                 id="nickname"
                 placeholder="James"
                 defaultValue={this.name}
          />
          <input className='serial'
                 id="serial"
                 placeholder="3D62 or 5394"
                 defaultValue={this.serial}
          />
          <button onClick={this.handleConnect.bind(this)}>Connect</button>
          <button onClick={this.handlePlay.bind(this)} disabled={!this.state.playButton}>Play</button>
        </div>
        }

        {this.state.connected && <Signal socket={this.socket} />}
        {(this.state.connected && this.state.searching) && <Waiting />}
        {(this.state.connected && this.state.matched) &&
        <Gameboard opponent={this.state.opponent}
                   socket={this.socket}
                   player1={this.state.player1}
                   player2={this.state.player2}
        />}
      </div>
    );
  }
}

export default Connect;

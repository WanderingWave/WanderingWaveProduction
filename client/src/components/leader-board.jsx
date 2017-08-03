import React from 'react';
import io from 'socket.io-client';

class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: []
    };
  }

  componentDidMount() {
    this.socket = io.connect();
    this.socket.emit('leaderBoard');
    this.socket.on('leaderBoard', (top) => {
      this.setState(top);
    });
  }

  render() {
    return (
      <div>
        <h3>Leader Board</h3>
        <table>
          <tbody>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Wins</th>
          </tr>
          {this.state.top.map((player, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{player.display}</td>
                <td>{player.games_won}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default LeaderBoard;

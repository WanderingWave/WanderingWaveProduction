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

      console.log('leaderboard connected ------', top);
    });
  }


  updateLeaderBoard() {
    console.log('button clicked');

    this.socket.emit('gameOver', {winner: 1, loser: 2, key: 5, winnerName: 'john'});
  }

  render() {
    return (
      <div>

        <button onClick={this.updateLeaderBoard.bind(this)}> update leader </button>
        <h1>Leader Board</h1>
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

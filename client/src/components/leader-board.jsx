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
    this.props.navClass('leaderBoard');
  }

  render() {
    return (
      <div>
           <div className="hero-leaderboard"></div>
       <h1 className="leaderboard">Leader Board</h1>
        <table className="leaderboard-table">
          <tbody>
          <tr>
            <th className="table-title-leaderboard">Rank</th>
            <th className="table-title-leaderboard">Name</th>
            <th className="table-title-leaderboard">Wins</th>
          </tr>
          {this.state.top.map((player, index) => {
            return (
              <tr key={index}>
                <td className="row-entry-leaderboard">{index + 1}</td>
                <td className="row-entry-leaderboard">{player.display}</td>
                <td className="row-entry-leaderboard">{player.games_won}</td>
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

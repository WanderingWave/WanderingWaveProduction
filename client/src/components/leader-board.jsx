import React from 'react';
import io from 'socket.io-client';

class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: [],
      pictureClass: ''
    };
  }

  componentDidMount() {
    this.socket = io.connect();
    this.socket.emit('leaderBoard');
    this.socket.on('leaderBoard', (top) => {
      this.setState(top);
    });
    this.props.navClass('leaderBoard');
    this.setState({
      pictureClass: this.props.fromNav ? 'hero' : 'gameOver'
    });
  }


  render() {
    return (
      <div>
        <div className={this.state.pictureClass}></div>
        <table className="leaderboard-table">
          <tbody>
          <tr>
            <th className="table-title">Rank</th>
            <th className="table-title">Name</th>
            <th className="table-title">Wins</th>
          </tr>
          {this.state.top.map((player, index) => {
            return (
              <tr key={index}>
                <td className="row-entry">{index + 1}</td>
                <td className="row-entry">{player.display}</td>
                <td className="row-entry">{player.games_won}</td>
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

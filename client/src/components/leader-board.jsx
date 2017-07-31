import React from 'react';

class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboard: []
    };
  }

  componentDidMount() {
    axios.get('/api/games/leaderBoard')
      .then(({data}) => {
        this.setState({leaderboard: data});

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>this is the leaderboard</div>
    );
  }
}

export default LeaderBoard;

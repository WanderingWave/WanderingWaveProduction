import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import ProfileInfo from './profile-info.jsx';
import MatchHistory from './match-history.jsx';

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      games: [],
      name: '',
      rank: ''
    };
  }

  componentWillMount() {
    this.socket = io.connect();

    axios.get('/api/profiles/userProfileInfo')
      .then(({data}) => {

        this.socket.emit('playerRank', {userId: data.id});
        this.socket.on('playerRank', ({rank}) => {
          this.setState({rank});
        });

        this.setState({profile: data});
        localStorage.setItem('userId', data.id);
        localStorage.setItem('display', data.display);

        return axios.get(`/api/games/gamesHistory/${data.id}`);
      })
      .then(({data}) => {
        console.log('the games are 55555555555555 ', data);

        this.setState({games: data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {
    return (
      <div>
        <ProfileInfo profile={this.state.profile} rank={this.state.rank} />
        <MatchHistory
          games={this.state.games}
          user={this.state.profile.display}
        />
      </div>
    );
  }
}

export default Profile;

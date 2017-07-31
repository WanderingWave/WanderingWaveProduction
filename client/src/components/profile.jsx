import React from 'react';
import axios from 'axios';
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

    axios.get('/api/profiles/userProfileInfo')
      .then(({data}) => {
        this.setState({profile: data});

        return axios.get(`/api/games/gamesHistory/${data.id}`);
      })
      .then(({data}) => {
        console.log('the games are ', data);

        this.setState({games: data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <ProfileInfo profile={this.state.profile} />
        {this.state.games.length &&
        <MatchHistory
          games={this.state.games}
          user={this.state.profile.display}
        />}
      </div>
    );
  }
}

export default Profile;

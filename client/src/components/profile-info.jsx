import React from 'react';

const ProfileInfo = ({profile}) => {
  console.log('this is the profile obj ', profile);
  return (
    <div>
      <h1>{profile.display}</h1>
      <h3>Rank: 3</h3>
      <h3>Wins: {Math.floor(profile.games_won / profile.games_played * 100)}%</h3>
      <hr />
    </div>
  );
};

export default ProfileInfo;

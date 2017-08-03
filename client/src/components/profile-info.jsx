import React from 'react';

const ProfileInfo = ({profile, rank}) => {
  console.log('this is the profile obj ', profile);
  return (
    <div>
      <h1>{profile.display}</h1>
      <h3>Rank: {rank}</h3>
      <h3>
        Wins: {profile.games_won ?
        Math.floor(profile.games_won / profile.games_played * 100) + "%" :
        "0%"}
      </h3>
      <hr />
    </div>
  );
};

export default ProfileInfo;

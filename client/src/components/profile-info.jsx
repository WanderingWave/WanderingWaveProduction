import React from 'react';


const ProfileInfo = ({profile, rank}) => {
  console.log('this is the profile obj ', profile);
  return (
    <div>
     <div className="hero-profile"></div>
     <div className="profile-hero-container">
      <h1 className="profile-hero-item-name">{profile.display}</h1>
      <div className="profile-hero-item">
        <h3 className="profile-number">{rank}</h3>
        <h3 className="profile-caption">Rank</h3>
      </div>
      <div className="profile-hero-item">
        <h3 className="profile-number">{profile.games_won ?
        Math.floor(profile.games_won / profile.games_played * 100) + "%" :
        "0%"}</h3>
        <h3 className="profile-caption">Games Won</h3>
      </div>
     </div>
    </div>
  );
};

export default ProfileInfo;

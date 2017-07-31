import React from 'react';

const MatchHistory = ({games, user}) => {
  console.log('the games are ***********', games);
  return (
    <div>
      <h3>Match History</h3>
      {games.map((game, index) => {
        return (
          <div className={game.win ? 'green' : 'red'} key={index}>
            {user} vs {game.display}
          </div>
        );
      })}
      <hr />
    </div>
  );
};

export default MatchHistory;

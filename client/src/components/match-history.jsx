import React from 'react';

const MatchHistory = ({games, user}) => {
  return (
    <div>
      <table className="leaderboard-table">
        <tbody>
        <tr>
          <th className="table-title-profile">Opponent</th>
          <th className="table-title-profile">Result</th>
        </tr>
        {games.map((game, index) => {
          return (
            <tr key={index}>
              <td className="row-entry-profile">{game.display}</td>
              <td className="row-entry-profile"> {game.win ? 'W' : 'L'}</td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
};

export default MatchHistory;

import React from 'react';

const MatchHistory = ({games, user}) => {
  return (
    <div>
      <h3>Match History</h3>
      <table>
        <tbody>
        <tr>
          <th>Opponent</th>
          <th>Result</th>
        </tr>
        {games.map((game, index) => {
          return (
            <tr key={index}>
              <td>{game.display}</td>
              <td>{game.win ? 'W' : 'L'}</td>
            </tr>
          );
        })}
        </tbody>
      </table>
      <hr />
    </div>
  );
};

export default MatchHistory;

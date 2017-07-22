import React from 'react';

class Gameboard extends React.Component {

  constructor(props) {
    super(props);
    this.opponent = props.opponent;
  }

  render() {
    return (
      <div>
        <h1>You must be more calm than {this.opponent}</h1>
        <h1> Gameboard goes here </h1>
      </div>
    );
  }
}

export default Gameboard;

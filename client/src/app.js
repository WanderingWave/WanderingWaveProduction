import React from 'react';
import ReactDOM from 'react-dom';
import Gameboard from './components/gameboard.js';
import SetHeadset from './components/set-headset.js';
import io from 'socket.io-client';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			view: 'setHeadset',
			playerA: '',
			playerB: ''
		};
		this.changeView = this.changeView.bind(this);
		this.setView = this.setView.bind(this);
		this.setPlayer = this.setPlayer.bind(this);
	}

	setPlayer(serial) {
		if (serial === '3D62') {
			this.setState({playerA: serial});
			this.setState({playerB: '489F'});
		} else {
			this.setState({playerA: '489F'});
			this.setState({playerB: '3D62'});
		}
		this.setView('gameBoard');
	}

	setView(view) {
		this.setState({view: view});
	}

  changeView() {
		if (this.state.view === 'setHeadset') {
			return <SetHeadset setPlayer={this.setPlayer} setView={this.setView} />;
		} else {
			return <Gameboard playerA={this.state.playerA} playerB={this.state.playerB} />;
		}
	}

	render() {
		return (
			<div>
				{this.changeView()}
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));

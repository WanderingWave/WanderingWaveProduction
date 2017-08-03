import React from 'react';

class Signal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      leftEar: null,
      leftForehead: null,
      rightForehead: null,
      rightEar: null
    };
  }

  componentWillMount() {
    this.props.socket.on('signalStrength', (signal) => {
      this.setState({
        leftEar: signal[0],
        leftForehead: signal[1],
        rightForehead: signal[2],
        rightEar: signal[3]
      });
    });
  }

  render() {

    let signalStrength = {
      leftEar: null,
      leftForehead: null,
      rightEar: null,
      rightForehead: null
    }

    const good = {
      background: 'green'
    }

    const fair = {
      background: 'yellow'
    }

    const poor = {
      background: 'red'
    }

    for (var key in this.state) {
      if (this.state[key] === 1) {
        signalStrength[key] = good
      }
      if (this.state[key] === 2) {
        signalStrength[key] = fair
      }
      if (this.state[key] >= 3) {
        signalStrength[key] = poor
      }
    }

    return (
      <div>
          <h3 className='press-play-when-all'>Press play when all the circles are filled</h3>

            <div className='outer'>
              <div className="circle" style={signalStrength.leftForehead}>
                  <p>LF</p>
              </div>
              <div className="circle" style={signalStrength.rightForehead}>
                  <p>RF</p>
              </div>
              <div className="circle" style={signalStrength.leftEar}>
                  <p>LE</p>
              </div>
              <div className="circle" style={signalStrength.rightEar}>
                  <p>RE</p>
              </div>
            </div>

      </div>
    );
  }
}

export default Signal;

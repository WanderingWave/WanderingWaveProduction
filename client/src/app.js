import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Message from './components/message.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      body: {}
    };
  }

  handleMessage(event) {
    event.preventDefault();
    console.log('sending message');
    let that = this;
    let messageObj = document.getElementById('message');
    let message = messageObj.value;
    console.log(message);

    axios.post('/messages', {message})
      .then(function (response) {
        messageObj.value = '';
        that.getMessage();

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getMessage() {
    let that = this;
    axios.get('/messages')
      .then(function (response) {
        console.log(response);
        // debugger;
        that.setState({
          messages: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getMessage();
  }

  render() {
    return (
      <div>
        <h1>Hello World, from React...</h1>
        <hr/>
        {this.state.messages.map((message, index) => <Message message={message} key={index} />)}
        <form>
          <input type="text" id="message" />
          <button onClick={this.handleMessage.bind(this)}>Save Message</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

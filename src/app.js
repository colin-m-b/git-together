//SCSS file
import '../scss/main.scss';

'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
// import { Button } from 'react-bootstrap';
// let socket = io('http://localhost:3000');
// import Visualization from './visualization';
let Visualization = require ('./visualization');
let Terminal = require ('./terminal');


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// status: 'disconnected',
      // title: '',
			message: []
		}

		this.connect = this.connect.bind(this);
		this.handleData = this.handleData.bind(this);
	}

	componentWillMount() {
    this.socket = io('https://fa663fef.ngrok.io');
    this.socket.on('connect', this.connect);
    // this.socket.on('disconnect', this.disconnect.bind(this));
	}

	connect() {
		// alert("connected!");
    this.setState({ status: 'connected' });
	}
	// disconnect() {
  //   this.setState({ status: 'disconnected' });
	// }
	componentDidMount() {
	  // socket.on('news', this.handleData)
		// socket.on('news', function(data){
		// 	console.log(data);
		// });
		this.socket.on('test', this.handleData);


  }

	handleData(dataObj) {
		let data = JSON.parse(dataObj);
		console.log("handledata", data);
		this.setState({ message: this.state.message.concat(data) });
	}

	render() {
    return (
			<div className="containing-div-all">
				<h1>GIT TOGETHER</h1>
      		<div className="containing-div">
						<Visualization message={ this.state.message } />
						<Terminal />
      		</div>
			</div>
    );
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

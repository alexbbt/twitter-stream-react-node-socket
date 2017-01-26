import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: Date.now(),
      tweets: 0,
      tweet: null
    }

    this.socket = window["io"]();
  }

  componentWillMount() {
    this.socket.on('tweet', (tweet) => {
      this.state.tweets++
      this.setState({
        tweets: this.state.tweets,
        tweet: tweet
      })
    });
  }

  render() {
    if (this.state.tweet) {
      var tweetText = this.state.tweet.text.replace(/trump/gi, (match) => {
        return "<span class=\"trump\">" + match + "</span>"
      });
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
          <h2>Latest Tweet with the word "<span className="trump">Trump</span>"</h2>
          <div className="tweetBox">
            {this.state.tweet ?
              <blockquote className="twitter-tweet">
                <p className="tweetText" dangerouslySetInnerHTML={{__html: tweetText}}></p>
                &mdash; {this.state.tweet.user.name} (@{this.state.tweet.user.screen_name})
                <a className="pull-right" href={"https://twitter.com/" + this.state.tweet.user.screen_name + "/status/" + this.state.tweet.id + ""}>
                  {new Date(parseInt(this.state.tweet.timestamp_ms)).toLocaleString()}
                </a>
              </blockquote>
            : <p>"No Tweet Recieved"</p>}
          </div>
          <h2>Tweets Recieved (in last {this.toHHMMSS(Date.now() - this.state.startTime)}):</h2>
          <p>{this.state.tweets}</p>
          <h3>Average Tweets per second:</h3>
          <p>{Math.round(this.state.tweets / ((Date.now() - this.state.startTime) / 1000))}</p>
        </div>
        </div>
      </div>
    );
  }

  toHHMMSS(milli) {
    var sec_num = Math.round(parseInt(milli, 10) / 1000); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

}

export default App;

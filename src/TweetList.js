import React, { Component } from 'react';

import { observer } from 'mobx-react';
import { createAutoSubscriber } from 'firebase-nest';

import Chance from 'chance';
import slugify from 'slugify';

var ch = new Chance();

import TimeAgo from 'react-timeago'

import twitter_text from 'twitter-text';

const tweet_limit = 140;

class TweetList extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      tweet: '',
      username: slugify(ch.name()),
      loading: false,
      remaining: tweet_limit
    };
    this.updateText = this.updateText.bind(this);
    this.submitTweet = this.submitTweet.bind(this);
  }
 
  render() {
    const tweets = this.props.store.getTweets();
    if (!tweets) {
      return <div>Loading tweets...</div>
    }

    return (
      <div>
          <div>
            <div>{this.state.username}</div>
            <div>
              <textarea 
                placeholder="What's happening?" 
                onChange={this.updateText} 
                value={this.state.tweet}>
                {this.state.tweet}
              </textarea> 
              {this.state.remaining}
            </div>
            <button onClick={this.submitTweet}>tweet</button>
          </div>
          <div className="tweets">
          {tweets.keys().reverse().map(messageKey => this.renderTweet(messageKey, tweets.get(messageKey)))}
          </div>
      </div>
    );
  }

  renderTweet(key, tweet) {
    return (
      <article className="card" key={key}>
        <header>
          <h5>@{tweet.username} - <TimeAgo date={tweet.timestamp} /></h5>
        </header>
        <div className="tweet" dangerouslySetInnerHTML={{__html: twitter_text.autoLink(twitter_text.htmlEscape(tweet.text))}}></div>
      </article>
    );
  }

  updateText(evt) {
    let tweet = evt.target.value
    let remaining = tweet_limit - twitter_text.getTweetLength(tweet);
    this.setState({
      tweet,
      remaining
    });
  }

  submitTweet() {
    this.props.store.createTweet({
      username: this.state.username,
      timestamp: new Date().getTime(),
      text: this.state.tweet 
    });

    this.setState({
      tweet: '',
      remaining: tweet_limit
    });
  }

  getSubs(props, state) {
    return props.store.allTweetsSubs();
  }

  subscribeSubs (subs, props, state) {
    return props.store.subscribeSubs(subs);
  }

}

export default createAutoSubscriber()(observer(TweetList));
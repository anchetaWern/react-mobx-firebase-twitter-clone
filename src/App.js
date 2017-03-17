import React, { Component } from 'react';
import TweetList from './TweetList';
import TweetStore from './TweetStore';
import './index.css';

class App extends Component {

  componentWillMount() {
    this.store = new TweetStore(this.props.config);
  }

  render() {
    return (
      <div className="flex one center">
        <div className="third-800">
          <h1>MobX-Firebase Twitter Clone</h1>
          <TweetList store={this.store} />
        </div>
      </div>
    );
  }

}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const config = {
	databaseURL: 'https://{YOUR_FIREBASE_PROJECT_NAME}.firebaseio.com',
};

ReactDOM.render(
  <App config={config} />,
  document.getElementById('root')
);

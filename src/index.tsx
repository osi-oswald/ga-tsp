import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app/App';
import { RootState } from './state/RootState';

const rootState = new RootState();

ReactDOM.render(<App state={rootState} />, document.getElementById('root'));

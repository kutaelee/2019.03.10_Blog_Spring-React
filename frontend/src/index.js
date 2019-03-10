import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Top from './js/Top';
import Content from './js/Content';
import Menu from './js/Menu';
import Footer from './js/Footer';

import * as serviceWorker from './serviceWorker';


ReactDOM.render(<Top />, document.getElementById('Top'));
ReactDOM.render(<Content />,document.getElementById('Content'));
ReactDOM.render(<Menu />,document.getElementById('Menu'));
ReactDOM.render(<Footer/>,document.getElementById('Footer'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDom from 'react-dom';

import 'normalize.css';
import './main.css';
// import '../font-awesome-4.6.3/css/font-awesome.css';

import Root from './components/Root';

const rootDOMElement = document.querySelector('#root');

ReactDom.render(<Root/>, rootDOMElement);
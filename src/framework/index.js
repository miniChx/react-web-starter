
import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';

import AppContainer from './setup';

function initComponent() {
  ReactDOM.render(
    <AppContainer />, // eslint-disable-line
    document.getElementById('root')
  );
}

initComponent();

// Eliminates the 300ms delay between a physical tap
// and the firing of a click event on mobile browsers
// https://github.com/ftlabs/fastclick
FastClick.attach(document.body);

if (module.hot) {
  module.hot.accept();
}

import './utils/smoothscroll'; // eslint-disable-line import/imports-first

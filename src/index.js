import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import { ActionCableProvider } from 'react-actioncable-provider';


const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <ActionCableProvider url="ws://localhost:3001/cable">
    <Provider store={store}>
      <BrowserRouter>
        <Route path='/' component={App}></Route>
      </BrowserRouter>
    </Provider>
  </ActionCableProvider>
, document.getElementById('root'));







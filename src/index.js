// import * as serviceWorker from './serviceWorker';
// import 'semantic-ui-css/semantic.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer'

//don't forget to createStore if using redux
const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* optionally making '/' the root here and passing routerProps by doing the component={App} thing */}
      <Route path='/' component={App}></Route>
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));








// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

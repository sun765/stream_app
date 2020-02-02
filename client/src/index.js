import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reducers from './reducers/index';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

//console.log(reducers);
const store = createStore(reducers);
console.log(store);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#root')
    );

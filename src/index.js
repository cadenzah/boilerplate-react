import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from '@/redux';
const store = configureStore();

import '@/styles/_reset.scss';
import App from '@/pages/App';

ReactDOM.render(
    <BrowserRouter
        basename={
            process.env.MODE === 'github'
                ? `/${process.env.REPO_NAME}`
                : ''
            }
        >
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

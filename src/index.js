import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import '@/styles/_reset.scss';

import store from '@/redux';
import App from '@/pages/App';

ReactDOM.render(
    <BrowserRouter basename={process.env.MODE === 'gh-pages' ? `/${process.env.REPO_NAME}` : ''}>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

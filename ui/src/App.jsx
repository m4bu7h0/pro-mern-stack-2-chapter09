import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Page from './Page.jsx';
import { __esModule } from 'whatwg-fetch';

const element = (
    <Router>
        <Page />
    </Router>
);

ReactDOM.render(element, document.getElementById('contents'));

if (module.hot) {
    module.hot.accept();
}
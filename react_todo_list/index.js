//require("./sass/styles.scss");
require("./sass/styles.scss");

var React = require('react');
var ReactDOM = require('react-dom');

import Layout from './src/Layout.jsx';
import store from './src/ItemStore.jsx';


ReactDOM.render(
    <Layout
        className="aaaaaaaa"
        test12="11111"
    >
    </Layout>,
    document.getElementById('container')
);
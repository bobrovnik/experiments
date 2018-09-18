import React, {Component} from 'react';

export default class Body extends Component {
    render() {
        const expandedClassName = this.props.isVisible ? 'expanded' : '';

        return  <div className={`body ${expandedClassName}`}>Hello, body!</div>    
    }
}
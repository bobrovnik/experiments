import React, {Component} from 'react';

export default class Header extends Component {
    
    render() {
        return <div>Hello, header!<button onClick={this.props.onButtonClick}>Button</button></div>       
    }
}
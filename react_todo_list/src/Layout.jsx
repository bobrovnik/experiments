import React from 'react';
import {EventEmitter} from 'fbemitter';
//import store from './src/ItemStore.jsx';

//import store from 'ItemStore';
//
//var store = require('ItemStore.jsx');

class Layout extends React.Component {
    constructor() {
        super();

        this.state = {
            activeListItemId: null,
            itemMenuClass: 'hiddenMenu',
            itemsList: [
                {
                    id: 1,
                    title: 'My first Event'
                },
                {
                    id: 2,
                    title: 'My second Event'
                },
                {
                    id: 3,
                    title: 'My third Event'
                }
            ]
        };
    }

    addInputKeyPressHandler(e) {
        if (e.key === 'Enter') {
            this.addItemHandler();
        }
    }

    addItemHandler() {
        var inputNode = this.refs.addItemInput;

        if (inputNode.value) {
            this.state.itemsList.push({
                id: 'id' + parseInt(Math.random() * 100, 10),
                title: inputNode.value
            });

            inputNode.value = '';
            inputNode.focus();

            this.setState({
                itemsList: this.state.itemsList
            });
        }
    }

    itemMenuClickHandler(e) {
        var recId = parseInt(e.target.dataset.itemid, 10);

        if (recId === this.state.activeListItemId) {
            recId = null;
        }

        this.setState({
            activeListItemId: recId
        });
    }

    render() {
        var me = this,
            menuClassName = ['item-menu'];

        if (this.state.activeListItemId) {
            menuClassName.push('visible');
        }

        return <div>
            <input ref="addItemInput" onKeyPress={this.addInputKeyPressHandler.bind(this)}/>
            <button onClick={this.addItemHandler.bind(this)}>Add New</button>
            <ol>
                {this.state.itemsList.map(function (item, i) {
                    let className = ['todo-item'];

                    if (this.state.activeListItemId === item.id) {
                        className.push('active');
                    }

                    return <li
                        key={item.id}
                        data-itemid={item.id}
                        className={className.join(' ')} onClick={this.itemMenuClickHandler.bind(this)}>
                        {item.title}
                    </li>
                }, this)}
            </ol>
            <div ref="itemMenu" className={menuClassName.join(' ')}>
                <span>Finish</span>
                <span>Remove</span>
            </div>
        </div>
    }
}

export default Layout;
import React from 'react';
import store from './ItemStore.jsx';

class Input extends React.Component {
    keyPressHandler(e) {
        if (e.key === 'Enter') {
            this.clickHandler();
        }
    }

    clickHandler() {
        var inputNode = this.refs.addItemInput;

        if (inputNode.value) {
            store.add(inputNode.value);

            inputNode.value = '';
            inputNode.focus();
        }
    }

    render() {
        return <div className="todo-form">
            <input
                className="todo-item-field"
                placeholder="Enter your ToDo"
                ref="addItemInput" onKeyPress={this.keyPressHandler.bind(this)}/>
            <button
                className="button add-new"
                onClick={this.clickHandler.bind(this)}
                title="Add New">
                <span className="icon-plus"></span>
            </button>
        </div>
    }
}

export default Input;
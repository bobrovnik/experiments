import React from 'react';

class Layout extends React.Component {
    constructor() {
        super();

        this.state = {
            text: 'Text',
            itemsList: [
                {
                    id: 111,
                    title: 'My first Event'
                }
            ]
        };
    }

    keyPressHandler(e) {
        if (e.key === 'Enter') {
            this.clickHandler();
        }
    }

    clickHandler() {
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

    render() {
        return <div>
            <input ref="addItemInput" onKeyPress={this.keyPressHandler.bind(this)}/>
            <button onClick={this.clickHandler.bind(this)}>Add New</button>
            <ol>
            {this.state.itemsList.map(function(item, i) {
                return <li key={item.id} className="todo-item">{item.title} <span> x</span></li>
            })}
            </ol>
        </div>
    }
}

export default Layout;
import React from 'react';

class Layout extends React.Component {
    constructor() {
        super();

        this.state = {
            activeListItem: null,
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

    itemMenuClickHandler(e) {
        console.log(e.target.dataset.itemid);

        var recId = e.target.dataset.itemid;

        if (recId === this.state.activeListItem) {
            recId = null;
        }

        this.setState({
            activeListItem: recId
        });
    }

    render() {
        var me = this;

        return <div>
            <input ref="addItemInput" onKeyPress={this.keyPressHandler.bind(this)}/>
            <button onClick={this.clickHandler.bind(this)}>Add New</button>
            <ol>
                {this.state.itemsList.map(function (item, i) {
                    return <li
                        key={item.id}
                        data-itemid={item.id}
                        className="todo-item {this.state.activeListItem}" onClick={this.itemMenuClickHandler.bind(this)}>
                        {item.title}
                    </li>
                }, this)}
            </ol>
            <div ref="itemMenu" className={this.state.activeListItem ? 'visibleMenu' : 'hiddenMenu'}>
                <span>Finish</span>
                <span>Remove</span>
            </div>
        </div>
    }
}

export default Layout;
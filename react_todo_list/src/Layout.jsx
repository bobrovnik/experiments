import React from 'react';

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
            menuClassName = ['todo-menu'];

        if (this.state.activeListItemId) {
            menuClassName.push('active');
        }

        return <div>
            <input className="todo-item-field" placeholder="Enter you ToDo" ref="addItemInput" onKeyPress={this.keyPressHandler.bind(this)}/>
            <button className="button add-new" onClick={this.clickHandler.bind(this)} title="Add New"><span className="icon-plus"></span></button>
            <ol className="todo-list">
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
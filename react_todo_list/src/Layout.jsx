import React from 'react';
import store from './ItemStore.jsx';

class Layout extends React.Component {
    constructor() {
        super();

        this.state = {
            activeListItemId: null
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
            store.add(inputNode.value);

            inputNode.value = '';
            inputNode.focus();

            this.setState({});
        }
    }

    itemMenuClickHandler(e) {
        var recId = e.target.dataset.itemid;
        if (recId === this.state.activeListItemId) {
            recId = null;
        }

        this.setState({
            activeListItemId: recId
        });
    }

    componentDidMount() {
        store.addChangeListener(this.onStoreChange);
    }

    componentWillUnmount() {
        store.removeChangeListener(this.onStoreChange);
    }

    onStoreChange() {
        this.setState();
    }

    render() {
        var me = this,
            menuClassName = ['todo-menu'];

        if (this.state.activeListItemId) {
            menuClassName.push('active');
        }

        return <div className="main-wrapper">
            <div className="todo-form">
                <input className="todo-item-field" placeholder="Enter you ToDo" ref="addItemInput" onKeyPress={this.keyPressHandler.bind(this)}/>
                <button className="button add-new" onClick={this.clickHandler.bind(this)} title="Add New"><span className="icon-plus"></span></button>
            </div>
            <ol className="todo-list">
                {store.getAll().map(function (item, i) {
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
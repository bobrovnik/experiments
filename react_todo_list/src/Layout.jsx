import React from 'react';
import store from './ItemStore.jsx';
import InputButton from './Input.jsx';

class Layout extends React.Component {
    itemMenuClickHandler(e) {
        var recId = e.target.dataset.itemid;
        if (recId === store.getSelectedRecordId()) {
            recId = null;
        }

        store.setSelected(recId);
    }

    componentDidMount() {
        store.addChangeListener(this.onStoreChange, this);
        store.addActiveListener(this.onStoreChange, this);
    }

    componentWillUnmount() {
        store.removeChangeListener(this.onStoreChange);
        store.removeActiveListener(this.onStoreChange);
    }

    onStoreChange() {
        this.setState({});
    }

    markRecordAsClosed() {
        store.setRecordStatusClosed(store.getSelectedRecord());
        store.setSelected(null);
    }

    markRecordAsDeleted() {
        store.setRecordStatusDeleted(store.getSelectedRecord());
        store.setSelected(null);
    }

    render() {
        var me = this,
            menuClassName = ['todo-menu'];

        if (store.getSelectedRecordId()) {
            menuClassName.push('active');
        }

        return <div className="main-wrapper">
            <InputButton/>
            <ol className="todo-list">
                {store.getActiveRecordsList().map(function (item, i) {
                    let className = ['todo-item'];

                    if (store.getSelectedRecordId() === item.id) {
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
                <span className="icon-checkmark2 button" onClick={this.markRecordAsClosed.bind(this)}></span>
                <span className="icon-bin2 button" onClick={this.markRecordAsDeleted.bind(this)}></span>
            </div>
        </div>
    }
}

export default Layout;
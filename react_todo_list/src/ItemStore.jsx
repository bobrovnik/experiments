import {EventEmitter} from 'fbemitter';

class ItemStore extends EventEmitter {
    constructor() {
        super();

        this.CHANGE_EVENT = 'change';
        this.collection = [
            {
                id: 'id' + 1,
                title: 'My first Event'
            },
            {
                id: 'id' + 2,
                title: 'My second Event'
            },
            {
                id: 'id' + 3,
                title: 'My third Event'
            }
        ];
    }

    addChangeListener(callback) {
        this.addListener(this.CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(this.CHANGE_EVENT, callback);
    }

    emitChange() {
        this.emit('CHANGE_EVENT');
    }

    add(title) {
        this.collection.push({
            id: 'id' + parseInt(Math.random() * 100, 10),
            title: title
        });
    }

    getAll() {
        return this.collection;
    }
}

export default new ItemStore();
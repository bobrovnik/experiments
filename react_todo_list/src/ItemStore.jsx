import {EventEmitter} from 'fbemitter';
import _ from 'lodash';

class ItemStore extends EventEmitter {
    constructor() {
        super();

        this.activeRecord = null;
        this.CHANGE_EVENT = 'change';
        this.ACTIVATE_EVENT = 'activate';
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

    addChangeListener(callback, scope) {
        this.addListener(this.CHANGE_EVENT, callback, scope);
    }

    removeChangeListener(callback) {
        this.removeListener(this.CHANGE_EVENT, callback);
    }

    addActiveListener(callback, scope) {
        this.addListener(this.ACTIVATE_EVENT, callback, scope);
    }

    removeActiveListener(callback) {
        this.removeListener(this.ACTIVATE_EVENT, callback);
    }

    emitChange() {
        this.emit(this.CHANGE_EVENT);
    }

    add(title) {
        this.collection.push({
            id: 'id' + parseInt(Math.random() * 10000, 10),
            title: title
        });

        this.emitChange();
    }

    getAll() {
        return this.collection;
    }

    setActive(record) {
        if (typeof record === 'string') {
            record = this.getRecordById(record);
        }

        this.activeRecord = record;

        //this.emit(this.ACTIVATE_EVENT, this.activeRecord);
        this.emit(this.ACTIVATE_EVENT, this.activeRecord);
    }

    getRecordById(id) {
        return _.findLast(this.collection, function (item) {
            return item.id === id;
        });
    }

    getActive() {
        return this.activeRecord;
    }

    getActiveRecordId() {
        var rec = this.getActive();

        return rec ? rec.id : null;
    }
}

export default new ItemStore();
import {EventEmitter} from 'fbemitter';
import _ from 'lodash';

class ItemStore extends EventEmitter {
    constructor() {
        super();

        this.selectedRecord = null;
        this.CHANGE_EVENT = 'change';
        this.ACTIVATE_EVENT = 'activate';

        this.STATUS_ACTIVE = 1;
        this.STATUS_CLOSED = 2;
        this.STATUS_DELETED = 2;

        this.collection = [
            {
                id: 'id' + 1,
                title: 'My first Event',
                status: this.STATUS_ACTIVE
            },
            {
                id: 'id' + 2,
                title: 'My second Event',
                status: this.STATUS_ACTIVE
            },
            {
                id: 'id' + 3,
                title: 'My third Event',
                status: this.STATUS_ACTIVE
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
            title: title,
            status: this.STATUS_ACTIVE
        });

        this.emitChange();
    }

    getAll() {
        return this.collection;
    }

    getActiveRecordsList() {
        return _.filter(this.collection, {status: this.STATUS_ACTIVE});
    }

    setSelected(record) {
        record = this.getRecordById(record);

        this.selectedRecord = record;

        this.emit(this.ACTIVATE_EVENT, this.selectedRecord);
    }

    getRecordById(id) {
        if (typeof id === 'object') {
            return id;
        }

        return _.findLast(this.collection, function (item) {
            return item.id === id;
        });
    }

    getSelectedRecord() {
        return this.selectedRecord;
    }

    getSelectedRecordId() {
        var rec = this.getSelectedRecord();

        return rec ? rec.id : null;
    }

    setRecordStatusClosed(record) {
        record = this.getRecordById(record);

        record.status = this.STATUS_CLOSED;

        this.emitChange();
    }

    setRecordStatusDeleted(record) {
        record = this.getRecordById(record);

        record.status = this.STATUS_DELETED;

        this.emitChange();
    }
}

export default new ItemStore();
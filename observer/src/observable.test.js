import { Observable } from './observable'

let instance;

describe('observable', () => {
    beforeEach(() => {
        instance = new Observable();
    });

    it('callback is not called as fireEvent() is not executed', () => {
        const callback = jest.fn();

        instance.addEventListener('some_event', callback);

        expect(callback).not.toBeCalled();
    });

    it('method fireEvent() is going to call provided callback', () => {
        const callback = jest.fn();

        instance.addEventListener('some_event', callback);
        instance.fireEvent('some_event');

        expect(callback).toBeCalled();
    });

    it('method fireEvent() is going to call both callbacks attached to same event', () => {
        const callback = jest.fn();
        const callback2 = jest.fn();

        instance.addEventListener('some_event', callback);
        instance.addEventListener('some_event', callback2);
        instance.fireEvent('some_event');

        expect(callback).toBeCalled();
        expect(callback2).toBeCalled();
    });

    describe('removeEventListener', () => {
        it('method fireEvent() is NOT going to call callback as it is removed by removeEventListener', () => {
            const callback = jest.fn();
    
            instance.addEventListener('some_event', callback);
            instance.removeEventListener('some_event', callback);
            instance.fireEvent('some_event');
    
            expect(callback).not.toBeCalled();
        });

        it('method fireEvent() is going to call only callback2 as first one is removed', () => {
            const callback = jest.fn();
            const callback2 = jest.fn();
    
            instance.addEventListener('some_event', callback);
            instance.addEventListener('some_event', callback2);

            instance.removeEventListener('some_event', callback);

            instance.fireEvent('some_event');
    
            expect(callback).not.toBeCalled();
            expect(callback2).toBeCalled();
        });
    });
});
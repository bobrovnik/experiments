"use strict";

(function (global) {
    var EVENT_TYPE_CLICK = 'click';

    var Recorder = (function () {
        var Recorder = function () {
            this.eventStore = [];
        };

        /**
         * @public
         * @returns {Array}
         */
        Recorder.prototype.getStore = function () {
            return this.eventStore;
        };

        /**
         * @private
         * @param {MouseEvent} e
         */
        Recorder.prototype.handlerClick = function (e) {
            this.addClickEvent(e.pageX, e.pageY);
        };

        /**
         * @private
         * @param {String} type
         * @param {Object} options
         */
        Recorder.prototype.addEvent = function (type, options) {
            this.eventStore.push({
                type: type,
                options: options
            });
        };

        /**
         * @private
         * @param {Number} x
         * @param {Number} y
         */
        Recorder.prototype.addClickEvent = function (x, y) {
            this.addEvent(EVENT_TYPE_CLICK, {
                x: x,
                y: y
            });
        };

        Recorder.prototype.start = function() {
            document.body.addEventListener('click', function (e) {
                this.handlerClick(e);
            }.bind(this));
        };

        return Recorder;
    })();
    global.Recorder = Recorder;

    var Player = (function () {
        /**
         *
         * @param {Array} [store]
         * @constructor
         */
        var Player = function (store) {
            this.setStore(store || []);
        };

        /**
         *
         * @public
         * @param {Array} store
         */
        Player.prototype.setStore = function (store) {
            this.eventStore = store;
        };

        /**
         *
         * @public
         * @returns {Array}
         */
        Player.prototype.getStore = function () {
            return this.eventStore;
        };

        /**
         *
         * @public
         */
        Player.prototype.play = function () {
            if (this.getStore().length > 0) {
                this.moveNextCursor(this.getStore()[0]);
            }
        };

        /**
         * @private
         * @param item
         */
        Player.prototype.moveNextCursor = function (item) {
            if (!this.cursor) {
                this.initCursor();
            }

            this.cursor.style.left = item.options.x + 'px';
            this.cursor.style.top = item.options.y + 'px';

            setTimeout(function () {
                var curIndex = this.getStore().indexOf(item);

                if (curIndex < this.getStore().length - 1) {
                    this.moveNextCursor(this.getStore()[++curIndex]);
                } else {
                    if (this.onFinish && typeof this.onFinish === 'function') {
                        this.onFinish();
                    }
                }
            }.bind(this), 500);
        };

        /**
         *
         * @protected
         */
        Player.prototype.initCursor = function () {
            this.cursor = document.createElement('div');
            this.cursor.className = 'cursor';
            this.cursor.border = 0;

            document.body.appendChild(this.cursor);

            this.cursorCircle = document.createElement('div');
            this.cursorCircle.className = 'cursor-circle';
            document.body.appendChild(this.cursorCircle);

            this.cursor.addEventListener("transitionend", function () {
                this.cursorCircle.style.display = 'block';
                this.cursorCircle.style.transition = 'none';
                this.cursorCircle.style.left = parseInt(this.cursor.style.left, 10) - 15 + 'px';
                this.cursorCircle.style.top = parseInt(this.cursor.style.top, 10) - 15 + 'px';
                this.cursorCircle.style.width = 30 + 'px';
                this.cursorCircle.style.height = 30 + 'px';
                this.cursorCircle.style.opacity = 1;


                setTimeout(function () {
                    this.cursorCircle.style.transition = 'all 0.15s';
                    this.cursorCircle.style.left = parseInt(this.cursor.style.left, 10) - 30 + 'px';
                    this.cursorCircle.style.top = parseInt(this.cursor.style.top, 10) - 30 + 'px';
                    this.cursorCircle.style.width = 60 + 'px';
                    this.cursorCircle.style.height = 60 + 'px';
                    this.cursorCircle.style.opacity = 0;
                }.bind(this), 20);
            }.bind(this));

            this.cursorCircle.addEventListener('transitionend', function() {
                this.style.display = 'none';
            });
        };

        return Player;
    })(window);

    global.Player = Player;
})(window);
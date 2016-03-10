/**
 * Created by stasgolovenko on 3/5/16.
 */
var Drawing = (function () {
    function Drawing() {

    }

    Drawing.prototype.init = function (canvas) {
        this.canvas = canvas;

        this.setCanvasSize();

        this.getCanvas().addEventListener(MOUSE_DOWN_EVENT, this.pointerDragStartHandler.bind(this));

        this.getSocket().on(MESSAGE_DRAW, this.onDrawMessageHandler.bind(this));
        this.getSocket().on(MESSAGE_CLEAR_CANVAS, this.setCanvasSize.bind(this));

        document.getElementById('clear_button').addEventListener('click', this.clearCanvas.bind(this));
    };

    Drawing.prototype.setCanvasSize = function () {
        this.getCanvas().width = window.innerWidth;
        this.getCanvas().height = window.innerHeight - 50;
    };

    Drawing.prototype.getCanvas = function () {
        return this.canvas;
    };

    Drawing.prototype.getSocket = function () {
        if (!this.io) {
            this.io = io();
        }

        return this.io;
    };

    Drawing.prototype.getUserColor = function () {
        if(!this.userColor) {
            this.userColor = '#'+Math.random().toString(16).slice(-6);
        }

        return this.userColor;
    };

    Drawing.prototype.getContext = function () {
        if (!this.canvasContext) {
            this.canvasContext = this.getCanvas().getContext("2d");
        }

        return this.canvasContext;
    };

    Drawing.prototype.onDrawMessageHandler = function (config) {
        switch (config.type) {
            case MESSAGE_DRAW_CIRCLE:
                Utilities.drawCircle(this.getContext(), config.x, config.y, config.color);
                break;
            case MESSAGE_DRAW_LINE:
                Utilities.drawLine(this.getContext(), config.x1, config.y1, config.x2, config.y2, config.color);
                break
        }
    };

    Drawing.prototype.clearCanvas = function () {
        this.setCanvasSize();

        this.getSocket().emit(MESSAGE_CLEAR_CANVAS);
    };

    Drawing.prototype.sendEvent = function (type, config) {
        this.getSocket().emit(
            MESSAGE_DRAW,
            Object.assign({
                color: this.getUserColor()
            }, config)
        );
    };

    Drawing.prototype.pointerDragStartHandler = function (event) {
        event.preventDefault();

        this.drawingListener = this.pointerDragHandler.bind(this);
        this.getCanvas().addEventListener(MOUSE_MOVE_EVENT, this.drawingListener);
        this.getCanvas().addEventListener(MOUSE_UP_EVENT, this.pointerDragStopHandler.bind(this));
    };

    Drawing.prototype.pointerDragStopHandler = function (event) {
        this.getCanvas().removeEventListener(MOUSE_MOVE_EVENT, this.drawingListener);

        this.prevX = null;
        this.prevY = null;
    };

    Drawing.prototype.pointerDragHandler = function (event) {
        var position = Utilities.getCursorPosition(event);

        Utilities.drawCircle(this.getContext(), position.x, position.y, this.getUserColor());

        this.sendEvent(MESSAGE_DRAW, {
            type: MESSAGE_DRAW_CIRCLE,
            x: position.x,
            y: position.y
        });

        if (this.prevX && this.prevY) {
            Utilities.drawLine(this.getContext(), this.prevX, this.prevY, position.x, position.y, this.getUserColor());

            this.sendEvent(MESSAGE_DRAW, {
                type: MESSAGE_DRAW_LINE,
                x1: this.prevX,
                y1: this.prevY,
                x2: position.x,
                y2: position.y
            });
        }

        this.prevX = position.x;
        this.prevY = position.y;
    };

    return Drawing;
})();
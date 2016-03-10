/**
 * Created by stasgolovenko on 3/5/16.
 */
var MOUSE_DOWN_EVENT = 'mousedown',
    MOUSE_MOVE_EVENT = 'mousemove',
    MOUSE_UP_EVENT = 'mouseup',
    MESSAGE_DRAW = 'draw',
    MESSAGE_CLEAR_CANVAS = 'clear',
    MESSAGE_DRAW_CIRCLE = 'circle',
    MESSAGE_DRAW_LINE = 'line';

if (Utilities.isMobile()) {
    MOUSE_DOWN_EVENT = 'touchstart';
    MOUSE_MOVE_EVENT = 'touchmove';
    MOUSE_UP_EVENT = 'touchend';
}
import EventEmitter from 'eventemitter3';

/**
 * The one & only, singleton messenger, shared accross all modules.
 */
const Emitter = new EventEmitter();

/**
 * 
 */
const Requests = Object.freeze({
    EnterBg: 'enter.bg',
    EnterWorld: 'enter.world',
    GameSave: 'game.save',
    GameLoad: 'game.load'
});

export {
    Emitter, Requests
};
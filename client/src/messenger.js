import EventEmitter from 'eventemitter3';

/**
 * The one & only, singleton messenger, shared accross all modules.
 */
const Messenger = new EventEmitter();

export {
    Messenger
};
import EventEmitter from 'eventemitter3';

/**
 * The one & only, singleton messenger, shared accross all modules.
 */
const Emitter = new EventEmitter();

export default Emitter;
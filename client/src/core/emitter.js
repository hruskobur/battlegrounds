import EventEmitter from 'eventemitter3';

/**
 * The one & only, singleton messenger, shared accross all modules.
 */
const Emitter = new EventEmitter();

/**
 * 
 * @param {String} request 
 * @param  {...any} payload 
 */
function message (request, ...payload) {
    Emitter.emit(request, ...payload);
}

export {
    EventEmitter,
    Emitter,
    message
};
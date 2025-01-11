import { Messenger } from './messenger.js';

const Events = Object.freeze({
    KeyDemo: 'key.demo'
});

/**
 * 
 * @param {KeyboardEvent} event 
 */
function on_key_up (event) {
    const key = event.key;

    switch(key) {
        case '0': Messenger.emit(Events.KeyDemo, event.key); break;
        default: {
            console.error(`no key bind for: ${key}`);
        }
    }
    
}

/**
 * 
 * @param {*} cfg 
 */
function init (cfg) {
    console.info('todo: keyboard cfg');

    window.addEventListener('keyup', on_key_up);
}

export {
    init, Events
};
import * as Pixi from 'pixi.js';
import { Messenger } from './messenger.js';
import * as Model from './model.js';

const Events = Object.freeze({
    Start: 'heartbeat.start',
    Stop: 'heartbeat.stop'
});

/**
 * @type {Pixi.Ticker}
 */
const Heartbeat = Pixi.Ticker.shared;

/**
 * 
 * @param {*} cfg 
 */
function init (cfg) {
    Heartbeat.autoStart = false;
    Heartbeat.add(on_heartbeat_tick);
}

/**
 * 
 * @returns 
 */
function start () {
    if(Heartbeat.started === true) {
        throw new Error();
    }

    Heartbeat.start();

    Messenger.emit(Events.Start);
}

/**
 * 
 * @returns 
 */
function stop () {
    if(Heartbeat.started === false) {
        throw new Error();
    }

    Heartbeat.stop();

    Messenger.emit(Events.Stop);
}

/**
 * 
 * @param {Pixi.Ticker} ticker 
 */
function on_heartbeat_tick (ticker) {
    Model.update(
        ticker.elapsedMS
    );
}

export {
    init, Events,
    start, stop
};
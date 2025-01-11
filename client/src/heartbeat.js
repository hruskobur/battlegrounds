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
        return;
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
        return;
    }

    Heartbeat.stop();

    Messenger.emit(Events.Stop);
}

/**
 * 
 * @returns {Boolean}
 */
function pause () {
    console.log('Heartbeat.pause', !Heartbeat.started);

    if(Heartbeat.started === true) {
        Heartbeat.stop();
    } else {
        Heartbeat.start();
    }
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
    start, stop, pause
};
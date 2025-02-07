import { TheGame } from '../game.js';
import { AreaModel } from '../models/area.js';
import { ActionBase } from './base.js';

class DevAction extends ActionBase {
    static Id = 'action.dev';

    /**
     * 
     * @param {TheGame} game 
     * @param {AreaModel} area_model 
     * @param {Number} payload id
     */
    constructor (game, area_model, payload) {
        super(game, area_model, payload);

        this.counter = 0;
    }

    /**
     * @override overriden getter from ModelBase to AreaModel
     * @returns {AreaModel}
     */
    get model () {
        return this.model;
    }

    /**
     * @override
     * @param {Number} dt 
     * @returns {DevAction} this
     */
    update (dt) {
        this.counter += dt;
        if(this.counter >= 2500) {
            this.counter = 0;
            this.snapshot = this.#execute();
            
            console.log('DevAction.tick!');
        }

        // run forever!
        this.state = false;
        return this;
    }

    #execute = () => {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const owner = Math.floor(Math.random() * 2);

        return {
            id: DevAction.Id,
            payload: {
                x, y, 
                owner
            }
        };
    }
}

export {
    DevAction
};
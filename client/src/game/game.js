import { AreaModel } from './area/model.js';
import { Target } from './target.js';

class TheGame {
    /**
     * @type {Number}
     */
    width;

    /**
     * @type {Number}
     */
    height;

    /**
     * @type {Array<Array<AreaModel>>}
     */
    areas;

    /**
     * 
     * @param {*} payload this will get deserialized into model here
     */
    constructor (payload) {
        // engine
        // . . .

        // model
        // dev: will be refactored to model member
        this.width = 10;
        this.height = 10;
        this.areas = [];
        for(let y = 0; y < this.height; ++y) {
            const _areas = [];
            for(let x = 0; x < this.width; ++x) {
                const area = new AreaModel();
                // note: this will be some fromJSON function, properties
                // aren't going to be set like that
                // hint: ctor's argument - payload will be used
                area.x = x;
                area.y = y;
                area.id = (y * this.width) + x;
                area.owner = null;

                _areas.push(area);
            }
            this.areas.push(_areas);
        }
    }

    /**
     * @public
     * @param {Number} dt 
     * @return {Array<*>}
     */
    tick = (dt) => {}

    /**
     * @public
     * @development this is called from the scene; it checks the entity's
     * possiblity to execute an action, and if allowed, schedules action
     * to the action queue
     * @development this is called by bots and by players
     * @param {Target} from 
     * @param {Target} to
     */
    command (from, to) {
        console.log('TheGame.command', from, to);
    }
}

export {
    TheGame
};
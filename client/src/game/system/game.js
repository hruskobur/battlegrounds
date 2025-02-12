import { AreaEntity } from '../entities/area.js';
import { TokenEntity } from '../entities/token.js';
import { BattlegroundEntity } from '../entities/battleground.js';
import { SelectionSystem } from './selection/selection.js';

class GameSystem {
    /**
     * @type {BattlegroundEntity}
     */
    bg;

    /**
     * @type {PlacementSystem}
     */
    placement;

    /**
     * @type {SelectionSystem}
     */
    selection;

    constructor () {
        this.bg = new BattlegroundEntity();
        this.selection = new SelectionSystem(this.bg);
    }

    /**
     * @public
     * @param {*} scenario not used yet!
     * @returns {GameSystem} this
     */
    import = (scenario) => {
        this.bg.width = 10;
        this.bg.height = 10;

        this.bg.areas = [];
        this.bg.tokens = [];
        
        for(let y = 0; y < this.bg.height; ++y) {
            const _areas = [];
            const _tokens = [];
            
            for(let x = 0; x < this.bg.width; ++x) {
                const area = new AreaEntity().place(x, y);
                _areas.push(area);

                const token = null;
                _tokens.push(token);
            }

            this.bg.areas.push(_areas);
            this.bg.tokens.push(_tokens);
        }

        return this;
    }

    /**
     * @public
     * @param  {...any} payload 
     * @returns {GameSystem} this
     */
    execute = (...payload) => {
        console.log('GameSystem.execute', ...payload);
    }

    /**
     * @public
     * @param {Number} dt 
     * @returns {GameSystem} this1
     */
    tick = dt => {
        console.log('GameSystem.tick', dt);
    }
}

export {
    GameSystem
};
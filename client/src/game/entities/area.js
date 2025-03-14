import * as Pixi from 'pixi.js';
import { FactionComponent } from '../components/faction.js';
import { Coordinate } from '../types/coordinate.js';

class AreaEntity {
    /**
     * @type {Coordinate}
     */
    position;

    /**
     * @type {FactionComponent}
     */
    faction;

    /**
     * @type {Pixi.Container}
     */
    renderable;

    /**
     * @type {Object.<string, Array<*>>}
     */
    animations;

    /**
     */
    constructor () {
        this.position = new Coordinate(
            Number.MIN_SAFE_INTEGER,
            Number.MIN_SAFE_INTEGER
        );
        
        this.faction = new FactionComponent(
            Number.MIN_SAFE_INTEGER,
            ''
        );

        this.renderable = new Pixi.Container({
            children: [
                new Pixi.Sprite(),
                new Pixi.Text()
            ]
        });

        this.animations = {};
    }

    get sprite () {
        return this.renderable.children[0];
    }

    /**
     * @returns {Pixi.Text}
     */
    get text () {
        return this.renderable.children[1];
    }
}

export {
    AreaEntity
};
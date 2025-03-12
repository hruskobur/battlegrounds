import * as Pixi from 'pixi.js';
import { FactionComponent } from '../components/faction.js';

class AreaEntity {
    /**
     * @type {FactionComponent}
     */
    faction;

    /**
     * @type {Pixi.Container}
     */
    renderable;

    /**
     */
    constructor () {
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
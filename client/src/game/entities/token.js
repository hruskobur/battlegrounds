import * as Pixi from 'pixi.js';
import { DescriptionComponent } from '../components/description.js';
import { AbilityComponent } from '../components/ability.js';

class TokenEntity {
    /**
     * @type {DescriptionComponent}
     */
    description;

    /**
     * @type {Pixi.Container}
     */
    renderable;

    /**
     * @type {Array<AbilityComponent>}
     */
    abilities;

    /**
     */
    constructor () {
        this.description = new DescriptionComponent(
            '',
            ''
        );

        this.renderable = new Pixi.Container({
            children: [
                new Pixi.Graphics()
            ]
        });

        this.abilities = [];
    }

    /**
     * @type {Pixi.Graphics}
     */
    get sprite () {
        return this.renderable.children[0];
    }
}

export {
    TokenEntity
};
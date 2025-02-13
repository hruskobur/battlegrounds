import * as Pixi from 'pixi.js';
import { PositionComponent } from '../components/position.js';

class AreaEntity {
    /**
     * @type {PositionComponent}
     */
    position;

    /**
     * @type {Pixi.Container}
     */
    renderable;

    /**
     */
    constructor () {
        this.position = new PositionComponent()

        this.renderable = new Pixi.Container({
            eventMode: 'static',
            boundsArea: new Pixi.Rectangle(0, 0, 72, 72),
            hitArea: new Pixi.Rectangle(0, 0, 72, 72),
            children: [
                // background
                new Pixi.Sprite({
                    width: 64,
                    height: 64,
                    anchor: 0.5,
                    x: 72 / 2,
                    y: 72 / 2,
                    eventMode: 'none',
                    texture: Pixi.Texture.WHITE,
                    zIndex: 0
                })
            ]
        });
    }

    get background () {
        return this.renderable.children[0];
    }
}

export {
    AreaEntity
};
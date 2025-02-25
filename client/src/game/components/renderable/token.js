import { BaseRenderableComponent, Pixi } from './base.js';

/**
 * @note The 64 & 72 will be refactored to some graphical-constants.
 * These constants will also be scaled, when the responsivnes is implemented.
 */
class TokenRenderableComponent extends BaseRenderableComponent {
    static Layer = 'tokens';

    constructor () {
        super({
            eventMode: 'none',
            boundsArea: new Pixi.Rectangle(0, 0, 72, 72),
            hitArea: new Pixi.Rectangle(0, 0, 72, 72),
            children: [
                new Pixi.Graphics({
                    alpha: 0.55,
                    label: undefined
                })
                .circle(36, 36, 32, 32)
                .stroke({
                    width: 1,
                    color: 'blue'
                })
                .fill({
                    color: 'lightblue'
                })
            ]
        });
    }
}

export {
    TokenRenderableComponent
};
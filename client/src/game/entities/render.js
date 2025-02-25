import * as Pixi from 'pixi.js';
import { AreaRenderableComponent } from '../components/renderable/area.js';
import { TokenRenderableComponent } from '../components/renderable/token.js';

class RenderEntity {
    /**
     * @type {AreaRenderableComponent}
     */
    areas;

    /**
     * @type {TokenRenderableComponent}
     */
    tokens;

    constructor () {
        this.areas = new Pixi.Container({
            eventMode: 'static',
            zIndex: 0,
            label: 'areas'
        });

        this.tokens = new Pixi.Container({
            eventMode: 'none',
            zIndex: 1,
            label: 'tokens'
        });
    }
}

export {
    RenderEntity
};
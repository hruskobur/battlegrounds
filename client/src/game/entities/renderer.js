import { RenderableComponent } from '../components/renderable.js';

class RendererEntity {
    /**
     * This is the background layer.
     * 
     * Sprites area drawn once and they are not added nor removed.
     * 
     * @type {Pixi.Container}
     */
    background;

    /**
     * This is a foreground layer.
     * 
     * Sprites are added and removed there as needed.
     * 
     * @type {Pixi.Container}
     */
    foreground;

    constructor () {
        this.background = new RenderableComponent({
            label: RenderableComponent.LayerId.Background,
            eventMode: 'static',
            zIndex: 0
        });

        this.foreground = new RenderableComponent({
            label: RenderableComponent.LayerId.Background,
            eventMode: 'none',
            zIndex: 1
        });

        // dev: ui layer with zIndex=2 ?
        // . . .
    }
}

export {
    RendererEntity
};
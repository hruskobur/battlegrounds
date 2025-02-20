import { RenderableComponent } from '../components/renderable/renderable.js';

class RendererEntity {
    /**
     * This is the background layer.
     * 
     * Sprites area drawn once and they are not added nor removed.
     * 
     * @type {RenderableComponent}
     */
    background;

    /**
     * This is a foreground layer.
     * 
     * Sprites are added and removed there as needed.
     * 
     * @type {RenderableComponent}
     */
    foreground;

    constructor () {
        this.background = new RenderableComponent({
            layer: RenderableComponent.LayerId.Background,
            eventMode: 'static',
            zIndex: 0,
            // note: dev purpose only
            label: RenderableComponent.LayerId.Background,
        });

        this.foreground = new RenderableComponent({
            layer: RenderableComponent.LayerId.Foreground,
            eventMode: 'none',
            zIndex: 1,
            // note: dev purpose only
            label: RenderableComponent.LayerId.Foreground
        });

        // dev: ui layer with zIndex=2 ?
        // . . .
    }
}

export {
    RendererEntity
};
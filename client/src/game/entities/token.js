import { 
    RenderableComponent,
    Graphics
} from '../components/renderable.js';

class TokenEntity {
    /**
     * @type {RenderableComponent}
     */
    renderable;

    constructor () {
        this.renderable = new RenderableComponent({
            eventMode: 'none',
            children: [
                new Graphics()
                .circle(0, 0, 32, 32)
                .stroke({
                    width: 1,
                    color: 'blue'
                })
                .fill({
                    color: 'lightblue'
                })
            ]
        });
        this.renderable.layer = RenderableComponent.LayerId.Foreground;
    }
}

export {
    TokenEntity
};
import { 
    RenderableComponent,
    Graphics,
    Rectangle
} from '../components/renderable.js';

class TokenEntity {
    /**
     * @type {RenderableComponent}
     */
    renderable;

    constructor () {
        this.renderable = new RenderableComponent({
            eventMode: 'none',
            boundsArea: new Rectangle(0, 0, 72, 72),
            hitArea: new Rectangle(0, 0, 72, 72),
            children: [
                new Graphics({
                    alpha: 0.55
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
        this.renderable.layer = RenderableComponent.LayerId.Foreground;
    }
}

export {
    TokenEntity
};
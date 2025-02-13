import { PositionComponent } from '../components/position.js';
import { 
    RenderableComponent,
    Sprite, Texture,
    Rectangle
} from '../components/renderable.js';

class AreaEntity {
    /**
     * @type {PositionComponent}
     */
    position;

    /**
     * @type {RenderableComponent}
     */
    renderable;

    /**
     */
    constructor () {
        this.position = new PositionComponent()

        this.renderable = new RenderableComponent({
            eventMode: 'static',
            boundsArea: new Rectangle(0, 0, 72, 72),
            hitArea: new Rectangle(0, 0, 72, 72),
            children: [
                // background
                new Sprite({
                    width: 64,
                    height: 64,
                    anchor: 0.5,
                    x: 72 / 2,
                    y: 72 / 2,
                    eventMode: 'none',
                    texture: Texture.WHITE,
                    zIndex: 0
                })
            ]
        });
        this.renderable.layer = RenderableComponent.LayerId.Background;
    }
}

export {
    AreaEntity
};
import { PositionComponent } from '../components/position.js';
import { TerrainComponent } from '../components/terrain.js';
import { 
    RenderableComponent,
    Sprite, Texture, Text,
    Rectangle
} from '../components/renderable.js';

class AreaEntity {
    /**
     * @type {PositionComponent}
     */
    position;

    /**
     * @type {TerrainComponent}
     */
    terrain;

    /**
     * @type {RenderableComponent}
     */
    renderable;

    /**
     */
    constructor () {
        this.position = new PositionComponent();
        this.terrain = new TerrainComponent();

        this.renderable = new RenderableComponent({
            eventMode: 'static',
            boundsArea: new Rectangle(0, 0, 72, 72),
            hitArea: new Rectangle(0, 0, 72, 72),
            children: [
                // terrain sprite
                new Sprite({
                    width: 64,
                    height: 64,
                    anchor: 0.5,
                    x: 72 / 2,
                    y: 72 / 2,
                    eventMode: 'none',
                    texture: Texture.WHITE,
                    zIndex: 0
                }),
                // difficulty sprite
                new Text({
                    text: this.terrain.difficulty,
                    eventMode: 'none',
                    anchor: 0.5,
                    x: 72 / 2,
                    y: 72 / 2
                })
            ]
        });
        this.renderable.layer = RenderableComponent.LayerId.Background;
    }
}

export {
    AreaEntity
};
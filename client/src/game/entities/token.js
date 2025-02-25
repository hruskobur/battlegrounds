import { PositionComponent } from '../components/position.js';
import { TokenRenderableComponent } from '../components/renderable/token.js';
import { TargetComponent } from '../components/target.js';
import { TargetType } from '../state/constant.js';

class TokenEntity {
    /**
     * @type {PositionComponent}
     */
    position;

    /**
     * @type {TokenRenderableComponent}
     */
    renderable;

    /**
     * @type {TargetComponent}
     */
    targets;

    constructor () {
        this.position = new PositionComponent(
            Number.MIN_SAFE_INTEGER,
            Number.MIN_SAFE_INTEGER
        );
        
        this.renderable = new TokenRenderableComponent();
        
        this.targets = new TargetComponent(
            [
                TargetType.Self,
                TargetType.Player, TargetType.Player,
                TargetType.Enemy, TargetType.Enemy, TargetType.Enemy,
            ]
        );
    }
}

export {
    TokenEntity
};
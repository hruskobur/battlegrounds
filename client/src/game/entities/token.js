import { DescriptionComponent } from '../components/description.js';
import { TokenRenderableComponent } from '../components/token/renderable.js';
import { TokenStageComponent } from '../components/token/stage.js';

class TokenEntity {
    /**
     * @type {DescriptionComponent}
     */
    description;

    /**
     * @type {TokenRenderableComponent}
     */
    renderable;

    /**
     * @type {Map<Number, TokenStageComponent>}
     */
    stages;

    /**
     * @type {TokenStageComponent|null}
     */
    stage;

    constructor () {
        this.description = new DescriptionComponent(
            '',
            ''
        );

        this.renderable = new TokenRenderableComponent();

        this.stages = new Map();
        this.stage = null;
    }
}

export {
    TokenEntity
};
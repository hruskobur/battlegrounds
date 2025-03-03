import { DescriptionComponent } from '../components/description.js';
import { Coordinate } from '../types/coordinate.js';
import { TokenRenderableComponent } from '../components/token/renderable.js';
import { TokenStageRuleComponent } from '../components/token/stage_rule.js';
import { TokenStageComponent } from '../components/token/stage.js';
import { TokenTargetRuleComponent } from '../components/token/target_rule.js'

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
     * Length of this array determines, how many stages does this token have.
     * Each entry determines rule-set for that particular stage.
     * @type {Array<TokenStageRuleComponent>}
     */
    stage_rule;

    /**
     * Length of this array determines, how many targets does this token need.
     * Each entry determines rule-set for that particular target/
     * @type {Array<TokenTargetRuleComponent>}
     */
    target_rule;

    /**
     * Currently active token stage.
     * 
     * @type {TokenStageComponent}
     */
    stage;

    /**
     * Targets that will be use for the execution
     * If nothing is selected yet, the value is null.
     * @type {Array<Coordinate>|null}
     */
    target;

    constructor () {
        this.description = new DescriptionComponent(
            '',
            ''
        );

        this.renderable = new TokenRenderableComponent();

        this.stage_rule = new TokenStageRuleComponent();
        this.target_rule = new TokenTargetRuleComponent();

        this.stage = new TokenStageComponent();
        this.target = null;
    }
}

export {
    TokenEntity
};

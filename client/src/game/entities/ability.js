import * as Pixi from 'pixi.js';
import { DescriptionComponent } from '../components/description.js';
import { ResourceComponent } from '../components/resource.js';
import { AbilityPhaseComponent } from '../components/ability/phase.js';
import { AbilityStageComponent } from '../components/ability/stage.js';
import anime from 'animejs';

class AbilityEntity {
    /**
     * @type {DescriptionComponent}
     */
    description;

    /**
     * @type {ResourceComponent}
     */
    cost;

    /**
     * @type {AbilityPhaseComponent}
     */
    phase;

    /**
     * @type {AbilityStageComponent}
     */
    stage;

    /**
     * @type {Boolean}
     */
    tickable;

    /**
     * @type {Number}
     */
    tick;

    /**
     * @type {Number}
     */
    duration;

    /**
     * @type {Pixi.Container}
     */
    renderable;

    constructor () {
        this.description = new DescriptionComponent(
            '',
            ''
        );

        this.cost = new ResourceComponent(
            Number.MAX_SAFE_INTEGER
        );

        this.phase = AbilityPhaseComponent.Idle;

        this.stage = AbilityStageComponent.Start;

        this.tickable = false;
        this.tick = 0;

        this.duration = 0;

        this.renderable = new Pixi.Container(
            {
                children: [
                    // the "icon"
                    new Pixi.Sprite()
                ]
            }
        );
    }
}

export {
    AbilityEntity
};
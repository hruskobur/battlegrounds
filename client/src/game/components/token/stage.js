import { TokenStateIdx_Idle, TokenPhase } from '../../state/constant.js';

class TokenStageComponent {
    /**
     * @type {Number}
     */
    idx;

    /**
     * @type {TokenPhase}
     */
    phase;

    /**
     * @type {Number}
     */
    duration;

    /**
     * @type {Number}
     */
    tick;

    constructor () {
        this.idx = TokenStateIdx_Idle;
        this.phase = TokenPhase.Start;
        this.duration = 0;
        this.tick = 0;
    }
}

export {
    TokenStageComponent
};
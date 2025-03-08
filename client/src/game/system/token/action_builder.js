import { TokenEntity } from '../../entities/token.js';
import { TokenPhase } from '../../state/constant.js';

/**
 * @param {TokenEntity} token 
 * @param {*} options 
 */
function action_builder (token, options) {
    console.log(options);

    token.description.name = options.name;
    token.description.text = options.text;

    // stages
    for(let s = 0; s < options.stages.length; ++s) {
        const stage = options.stages[s];
        stage.state = {
            phase: TokenPhase.Start,
            targets: [],
            canceled: false,
            duration: 0,
            tick: 0
        };

        token.stages.set(stage.idx, stage);
    }

    // the 'idle' stage
    token.stage = null;

    console.log(token.stages);
}

export default action_builder;
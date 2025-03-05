import { TokenEntity } from '../../entities/token.js';

/**
 * @note KEEP TARGET RULES
 * @param {TokenEntity} token 
 * @param {*} options 
 */
function ability (token, options) {
    console.log(options);

    token.description.name = options.name;
    token.description.text = options.text;

    // stages
    for(let s = 0; s < options.stages.length; ++s) {
        const stage = options.stages[s];
        stage.targeted = [];

        token.stages.set(stage.idx, stage);
    }

    // todo: the 'idle' stage
    // . . .

    console.log(token.stages);
}

export default ability;
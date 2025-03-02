import { TokenEntity } from '../../entities/token.js';

/**
 * 
 * @param {TokenEntity} token 
 * @param {*} options 
 */
function action_factory (token, options) {
    token.action_rules.name = options.name;

    for (let s = 0; s < options.stages.length; ++s) {
        const stage_opt = options.stages[s];

        token.action_rules.stages.push(
            {
                name: stage_opt.name,
                duration: stage_opt.duration,
                tick: stage_opt.tick,
                cancelable: stage_opt.cancelable
            }
        );

        // note: action stage can have 'no targets'
        if (stage_opt.targets == null) {
            continue;
        }

        for (let t = 0; t < stage_opt.targets.length; ++t) {
            const target_opt = stage_opt.targets[t];

            token.action_rules.targets.push(
                {
                    type: target_opt.type,
                    rule: target_opt.rule,
                    count: target_opt.count
                }
            );
        };
    }

    console.log('TokenSystem.action_factory', token.action_rules);
}

export default action_factory;
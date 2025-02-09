import { TokenModel } from '../../src/game/token/model.js';

function token_argc () {
    const game = window.Bgs.Scenes?.ActiveScene?.game;
    
    game.tokens[0][0] = new TokenModel(1);
    game.tokens[1][0] = new TokenModel(3);
    game.tokens[2][0] = new TokenModel(5);

    console.log('Tests.token_argc', game.tokens);
}

export {
    token_argc
};
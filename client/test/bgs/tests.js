import { TokenEntity } from '../../src/game/entities/token.js';

function token_argc () {
    const game = window.Bgs.Scenes?.ActiveScene?.game;
    
    // game.tokens[0][0] = new TokenEntity(1);
    // game.tokens[1][0] = new TokenEntity(3);
    // game.tokens[2][0] = new TokenEntity(5);

    console.log('Tests.token_argc', game);
}

export {
    token_argc
};
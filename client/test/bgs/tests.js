function token_argc () {
    const game = window.Bgs.Scenes?.ActiveScene?.game;
    
    game.tokens[0][0] = new TokenModel(1);
    game.tokens[1][0] = new TokenModel(3);

    console.log('test_token_argc', game.tokens);
}

export {
    token_argc
};

/**
 * Checks, whether provided coordinates represent a valid position inside of the
 * game.
 * @param {GameState} state 
 * @param {Number} x 
 * @param {Number} y 
 * @returns {Boolean}
 */
function coordinates (state, x, y) {
    return (x >= 0 && x < state.width && y >= 0 && y < state.height);
}

export {
    coordinates
};
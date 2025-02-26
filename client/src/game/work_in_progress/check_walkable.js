/**
 * WIP
 * 
 * @note may refactor signature to take AreaEntity, instead of coordiantes
 * 
 * @param {GameState} state
 * @param {Number} o ownership
 * @param {Number} x 
 * @param {Number} y
 * @returns {Boolean}
 */
function walkable (state, o, x, y) {
    // rule: coordinates have to be valid
    if(
        x < CoordinateLow 
        || x >= state.width
        || y < CoordinateLow
        || y >= state.height) {
        return false;
    }

    // rule: can't walk over enemy's area
    if(state.areas[y][x].stats.ownership !== o) {
        return false;
    }

    // rule: can't walk ower another token
    if(state.tokens[y][x] !== null) {
        return false;
    }

    return true;
}
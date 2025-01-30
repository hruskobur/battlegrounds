/**
 * 
 * @param {Array<Array<*>>} array 
 * @param {Function} cb x,y,entry
 */
function array_2d_iterate (array, cb) {
    for(let y = 0; y < array.length; ++y) {
        const _row = array[y];

        for(let x = 0; x < _row.length; ++x) {
            cb(
                x, y,
                _row[x]
            );
        }
    }
}

export {
    array_2d_iterate
}
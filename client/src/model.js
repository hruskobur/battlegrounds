// todo: this is the game model!
// . . .

// todo: so, there'll be an array of 
// a) areas
// b) array tokens
// c) some-sort-of-scenario
// d) ... and at the end, an objective checker

let time = 0;

function update (elapsed) {
    time += elapsed;

    console.log('model.update', time, elapsed);
}

export {
    update
};
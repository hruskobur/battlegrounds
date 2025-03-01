const DirectionCoordinates = Object.freeze([
    // cardinal directions
    // north
    { x: 0, y: -1 },
    // east
    { x: 1, y: 0 },
    // south
    { x: 0, y: 1 },
    // west
    { x: -1, y: 0 }
    
    // note: i am not decided yet, whether movement should include also these
    // diagonal directions.
    // If so, i should consider making cost of the movmenet diagonaly exactly
    // sqrt(2) times more expensive

    // diagonal directions
    ,
    // north-east
    { x: 1, y: -1 },
    // south-east
    { x: 1, y: 1 },
    // southwest
    { x: -1, y: 1 },
    // northwest
    { x: -1, y: -1 }
]);

const CoordinateLow = 0;

const ActionPhase = Object.freeze({
    Start: 'action.start',
    TickStart: 'action.tick.start',
    TickEnd: 'action.tick.end',
    End: 'action.end'
});

const ActionIdxIdle = null;
const ActionIdxStart = 0;

const TargetType = Object.freeze({
    Self: 'target.type.self',
    Ally: 'target.type.ally',
    Enemy: 'target.type.enemy'
});

const TargetRule = Object.freeze({
    Relaxed: 'target.rule.relaxed',
    Strict: 'target.rule.strict'
});

export {
    DirectionCoordinates, CoordinateLow,
    ActionPhase, ActionIdxIdle, ActionIdxStart,
    TargetType, TargetRule
};
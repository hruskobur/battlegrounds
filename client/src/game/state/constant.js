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

const TokenPhase = Object.freeze({
    Start: 'action.start',
    TickStart: 'action.tick.start',
    TickEnd: 'action.tick.end',
    End: 'action.end'
});

const TargetOriginType = Object.freeze({
    Ally: 'target.origin.ally',
    Enemy: 'target.origin.enemy'
});

const TargetSelectionType = Object.freeze({
    Single: 'target.selection.single'
    // extend
    // path
});

const TargetThresholdType = Object.freeze({
    Exact: 'target.count.exact'
    // up to
});

const TokenStageFirstIdx = 0;

export {
    DirectionCoordinates, CoordinateLow,
    
    TokenPhase,
    
    TargetOriginType, TargetSelectionType, TargetThresholdType,

    TokenStageFirstIdx
};
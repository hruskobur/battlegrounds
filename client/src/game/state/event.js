const Event = Object.freeze({
    ActionScheduled: 'action.scheduled',
    ActionCanceled: 'action.canceled',
    ActionUpdate: 'action.updated',

    TokenCreated: 'token.created',
    TokenDestroyed: 'token.destroyed',

    DEV_INPUT: 'DEV.INPUT'
});

export default Event;
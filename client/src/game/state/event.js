const Event = Object.freeze({
    ActionScheduled: 'action.scheduled',
    ActionCanceled: 'action.canceled',
    ActionUpdate: 'action.updated',

    TokenCreated: 'token.created',
    TokenDestroyed: 'token.destroyed',

    InputSelected: 'input.selected',
    InputCanceled: 'input.canceled',
    InputAccepted: 'input.accepted'
});

export default Event;
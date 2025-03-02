const Event = Object.freeze({
    ActionScheduled: 'action.scheduled',
    ActionCanceled: 'action.canceled',
    ActionUpdate: 'action.updated',
    ActionInfo: 'action.info',

    TokenCreated: 'token.created',
    TokenDestroyed: 'token.destroyed',

    InputActorSelected: 'input.selected.actor',
    InputTargetSelected: 'input.selected.target',
    InputCanceled: 'input.canceled',
    InputAccepted: 'input.accepted'
});

export default Event;
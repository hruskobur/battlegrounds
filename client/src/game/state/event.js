const Event = Object.freeze({
    InitialisationReady: 'initialisation.ready',
    RendererDraw: 'renderer.draw',
    RendererErase: 'renderer.erase',
    ConquestDamage: 'conquest.damage',
    ConquestHeal: 'conquest.heal',
    ConquestOwnership: 'conquest.ownership',
    TokenCreate: 'token.create.response',
    TokenDestroy: 'token.destroy.response'
});

export default Event;
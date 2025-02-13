class TokenSystem {
    /**
     * @type {EventEmitter}
     */
    events;

    /**
     * @type {GameState}
     */
    state;

    constructor (events, state) {
        this.events = events;
        this.state = state;
    }
}

export {
    TokenSystem
};
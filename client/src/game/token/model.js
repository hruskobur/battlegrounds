class TokenModel {
    static DefaultTokenActionArgc = 2;
    
    /**
     * @type {Number}
     */
    argc;

    /**
     * 
     * @param {Number} argc 
     */
    constructor (argc) {
        this.argc = argc;
    }
}

export {
    TokenModel
};
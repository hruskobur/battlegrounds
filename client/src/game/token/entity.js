import { TokenGraphics } from './graphics.js';

class TokenEntity {
    static DefaultTokenActionArgc = 2;
    
    /**
     * @type {TokenGraphics}
     */
    graphics;
    
    /**
     * @type {Number}
     */
    argc;

    /**
     * 
     * @param {Number} argc 
     */
    constructor (argc) {
        this.graphics = new TokenGraphics();

        this.argc = argc;
    }
}

export {
    TokenEntity,
    TokenGraphics
};
import * as Pixi from 'pixi.js';

class Scene {
    static Events = {};

    /**
     * @type {Pixi.Container}
     */
    container;

    /**
     * 
     * @param {String} id 
     */
    constructor (id) {
        this.container = new Pixi.Container({
            label: id
        });
    }

    get id () {
        return this.container.label;
    }

    /**
     * @abstract
     * @returns {void}
     */
    on_build () {}

    /**
     * @virtual
     * @param {Pixi.Container} stage 
     * @returns {Scene} this
     */
    on_load (stage) {
        this.on_build();
        stage.addChild(this.container);

        return this;
    }

    /**
     * @virtual
     * @param {Pixi.Container} stage 
     * @returns {Scene} this
     */
    on_unload (stage) {
        while(this.container.children.length > 0) {
            this.container.removeChildAt(0);
        }
        this.container.removeFromParent();

        return this;
    }
}

export {
    Scene
};
import * as Pixi from 'pixi.js';

class Scene {
    static Events = {};

    /**
     * @type {Pixi.Container}
     */
    container;

    /**
     * @type {Object}
     */
    data;

    /**
     * 
     * @param {String} id 
     */
    constructor (id) {
        this.container = new Pixi.Container({
            label: id
        });

        this.events = {};
        this.data = {};
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
     * @param {Object} data 
     * @param {Pixi.Container} stage 
     * @returns {Scene} this
     */
    on_load (data, stage) {
        this.data = data;
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
        this.data = {};

        return this;
    }
}

export {
    Scene
};
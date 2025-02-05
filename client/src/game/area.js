import * as Pixi from 'pixi.js';

class AreaEntity {
    /**
     * @type {Number}
     */
    id;

    /**
     * @type {Number}
     */
    x;

    /**
     * @type {Number}
     */
    y;

    /**
     * @type {Pixi.Container}
     */
    graphics;

    /**
     * 
     * @param {Number} id 
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor (id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;

        this.graphics = new Pixi.Container();
        this.graphics.x = x;
        this.graphics.y = y;
    }

    /**
     * 
     * @returns {Pixi.Container}
     */
    draw () {
        while(this.graphics.children.length > 0) {
            this.graphics.removeChildAt(0);
        }

        this.graphics.addChild(
            new Pixi.Graphics()
            .circle(8, 8, 8)
            .stroke({
                width: 2,
                color: 'lightblue'
            })
        );
        
        this.graphics.addChild(
            new Pixi.Text({
                text: this.id,
                style: {
                    fontSize: 8
                }
            })
        );

        return this.graphics;
    }
}

export {
    AreaEntity
};
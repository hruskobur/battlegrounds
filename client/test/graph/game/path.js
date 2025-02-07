import * as Pixi from 'pixi.js';
import { AreaEntity } from './area.js';

class PathEntity {
    /**
     * @type {Pixi.Container}
     */
    graphics;

    /**
     * @param {AreaEntity} a 
     * @param {AreaEntity} b 
     * @param {Number} distance 
     */
    constructor (a, b, distance) {
        this.a = a;
        this.b = b;
        
        this.distance = distance;

        this.graphics = new Pixi.Container();
    }

    /**
     * 
     * @returns {Pixi.Graphics}
     */
    draw () {
        while(this.graphics.children.length > 0) {
            this.graphics.removeChildAt(0);
        }

        this.graphics.addChild(
            new Pixi.Graphics()
            .moveTo(this.a.x + 8, this.a.y + 8)
            .lineTo(this.b.x + 8, this.b.y + 8)
            .stroke({
                width: 1,
                color: 'lightblue'   
            })
        );

        return this.graphics;
    }
}

export {
    PathEntity
};
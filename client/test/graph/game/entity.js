import anime from 'animejs';
import * as Pixi from 'pixi.js';

class DevEntity {
    constructor(x, y) {
        this.graphics = new Pixi.Container();
        this.graphics.x = x;
        this.graphics.y = y;
        this.action = null;
    }

    draw() {
        while (this.graphics.children.length > 0) {
            this.graphics.removeChildAt(0);
        }

        this.graphics.addChild(
            new Pixi.Graphics()
            .circle(8, 8, 8)
            .stroke({
                width: 2,
                color: 'red'
            })
        );

        return this.graphics;
    }

    move(x, y) {
        if(this.action !== null) {
            console.warn('cannot move right now!');
        }

        this.action = anime(
            {
                targets: this.graphics,
                x,
                y,
                duration: 1000,
                complete: a => {
                    this.action = null;
                }
            }
        )
    }
}

export {
    DevEntity
};
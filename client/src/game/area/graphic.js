import * as Pixi from 'pixi.js';
import anime from 'animejs';

class AreaGraphics extends Pixi.Container {
    static Size = 64;
    static Margin = 8;

    /**
     * @type {}
     */
    animation_border;

    /**
     */
    constructor () {
        super();

        // back face (border)
        this.addChild(
            new Pixi.Sprite(
                {
                    width: AreaGraphics.Size + AreaGraphics.Margin,
                    height: AreaGraphics.Size + AreaGraphics.Margin,
                    x: 0,
                    y: 0,
                    eventMode: 'none',
                    texture: Pixi.Texture.WHITE,
                    tint: 0x00FF00,
                    alpha: 0
                }
            )
        );

        // front face
        this.addChild(
            new Pixi.Sprite(
                {
                    width: AreaGraphics.Size,
                    height: AreaGraphics.Size,
                    x: (AreaGraphics.Size + AreaGraphics.Margin) / 2,
                    y: (AreaGraphics.Size + AreaGraphics.Margin) / 2,
                    texture: Pixi.Texture.WHITE,
                    anchor: 0.5,
                    eventMode: 'static'
                }
            )
        );

        // animations
        this.animation_border = anime({
            loop: true,
            autoplay: false,
            targets: this.children[0],
            alpha:[0, 1],
            direction: 'alternate',
            easing: 'linear'
        });

        this.eventMode = 'static';
    }

    /**
     * @public
     * @param {Boolean} is 
     * @returns {AreaGraphics} this
     */
    targeted (is) {
        if(is === true) {
            this.animation_border.play();
        } else {
            this.animation_border.reset();
        }
    }
}

export {
    AreaGraphics
};
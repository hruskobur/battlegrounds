import * as Pixi from 'pixi.js';
import anime from 'animejs';

class AreaSpriteComponent extends Pixi.Container {
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
            new Pixi.Sprite({
                width:AreaSpriteComponent.Size+ AreaSpriteComponent.Margin,
                height:AreaSpriteComponent.Size+ AreaSpriteComponent.Margin,
                x: 0,
                y: 0,
                eventMode: 'none',
                texture: Pixi.Texture.WHITE,
                tint: 0x00FF00,
                alpha: 0
            })
        );

        // front face
        this.addChild(
            new Pixi.Sprite({
                width: AreaSpriteComponent.Size,
                height: AreaSpriteComponent.Size,
                x:(AreaSpriteComponent.Size + AreaSpriteComponent.Margin)/2,
                y:(AreaSpriteComponent.Size + AreaSpriteComponent.Margin)/2,
                texture: Pixi.Texture.WHITE,
                anchor: 0.5,
                eventMode: 'static'
            })
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
     * @returns {AreaSpriteComponent} this
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
    AreaSpriteComponent
};
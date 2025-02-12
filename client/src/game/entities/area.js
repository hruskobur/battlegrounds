import * as Pixi from 'pixi.js';
import { FactionComponent } from '../components/faction.js';
import { SpriteComponent } from '../components/sprite.js';

class AreaEntity {
    /**
     * @type {FactionComponent}
     */
    faction;

    /**
     * @type {SpriteComponent}
     */
    sprite;

    constructor () {
        this.faction = new FactionComponent();

        this.sprite = new SpriteComponent({
            eventMode: 'static',
        });

        // border
        this.sprite.addChild(
            new Pixi.Sprite({
                width: 64 + 8,
                height: 64 + 8,
                x: 0,
                y: 0,
                eventMode: 'none',
                texture: Pixi.Texture.WHITE,
                tint: 0x00FF00,
                alpha: 0
            })
        );

        // front
        this.sprite.addChild(
            new Pixi.Sprite({
                width: 64,
                height: 64,
                x: (64 + 8) / 2,
                y: (64 + 8) / 2,
                anchor: 0.5,
                eventMode: 'static',
                texture: Pixi.Texture.WHITE
            })
        );
    }

    /**
     * 
     * @param {Number} x x-axis coordinate
     * @param {Number} y y-axis coordinate
     * @returns {AreaEntity} this
     */
    place (x, y) {
        this.sprite.x = x * this.sprite.width;
        this.sprite.y = y * this.sprite.height;

        return this;
    }

    /**
     * 
     * @param {Boolean} is 
     * @returns {AreaEntity} this
     */
    select (is) {
        this.border.alpha = (is === true) ? 1 : 0;
    }

    get border () {
        return this.sprite.children[0];
    }

    get front () {
        return this.sprite.children[1];
    }
}

export {
    AreaEntity
};
import * as Pixi from 'pixi.js';

class AreaEntity {
    constructor () {
        this.model = {
            x: null,
            y: null,
            owner: null
        };

        this.sprite = new Pixi.Sprite(Pixi.Texture.WHITE);
        this.sprite.width = 128;
        this.sprite.height = 128;
        this.sprite.eventMode = 'static';
    }

    set_position (x, y, m=8) {
        this.model.x = x;
        this.model.y = y;

        this.sprite.x = x * this.sprite.width + (x + 1) * m;
        this.sprite.y = y * this.sprite.height + (y + 1) * m;

        return this;
    }

    set_selected (is) {
        this.sprite.tint = is ? 'lightblue' : 'white';

        return this;
    }

    set_over (is) {
        this.sprite.alpha = is ? 0.8 : 1.0;

        return this;
    }
}

export {
    AreaEntity
};
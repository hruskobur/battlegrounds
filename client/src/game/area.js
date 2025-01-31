import * as Pixi from 'pixi.js';

class AreaEntity {
    constructor () {
        this.model = {};
        
        this.sprite = new Pixi.Sprite(Pixi.Texture.WHITE);
    }

    set_position (x, y, m=8) {
        this.model.x = x;
        this.model.y = y;

        this.sprite.x = x * this.sprite.width + (x + 1) * m;
        this.sprite.y = y * this.sprite.height + (y + 1) * m;

        return this;
    }
}

export {
    AreaEntity
};
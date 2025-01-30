import { AreaEntity } from './area.js';

class Game {
    static Request = Object.freeze({
        Enter: 'system.enter'
    });

    w;
    h;
    ww;
    wh;
    areas;

    info;
    selected;

    constructor () {
        this.w = 0;
        this.h = 0;
        this.ww = 0;
        this.wh = 0;
        this.areas = [];
    }

    create () {
        this.w = 10;
        this.h = 10;
        this.ww = (this.w * 128) + ((this.w + 1) * 8);
        this.wh = (this.h * 128) + ((this.h + 1) * 8);

        for(let y = 0; y < this.h; ++y) {
            const _areas = []
            for(let x = 0; x < this.w; ++x) {
                const area = new AreaEntity()
                .set_position(x, y);

                _areas.push(area);
            }

            this.areas.push(_areas);
        }

        return this;
    }
}

export {
    Game
};
import * as Pixi from 'pixi.js';
import { GameStateZone } from '../../state/zone.js';
import { RenderSystem } from '../render.js';

/**
 * Draws a new AreaEntity.
 * 
 * @public
 * @this {RenderSystem}
 * @param {GameStateZone} zone 
 * @returns {RenderSystem} this
 */
function draw (zone) {
    const area = zone.area;
    if(area == null) {
        return this;
    }

    // todo = constant-ise!
    const SizeUnit = 72;
    const MarginUnit = 8;
    const boundary = new Pixi.Rectangle(0, 0, SizeUnit, SizeUnit);

    const renderable = area.renderable;
    renderable.eventMode = 'static';
    renderable.boundsArea = boundary;
    renderable.hitArea = boundary;
    renderable.x = zone.position.x * SizeUnit;
    renderable.y = zone.position.y * SizeUnit;

    const sprite = area.sprite;
    sprite.width = SizeUnit - MarginUnit;
    sprite.height = SizeUnit - MarginUnit;
    sprite.anchor = 0.5;
    sprite.x = SizeUnit / 2;
    sprite.y = SizeUnit / 2;
    sprite.eventMode = 'none';
    sprite.zIndex = 0;
    sprite.label = undefined;
    // todo: yet to be determined by some area-related-component
    // todo; for now, like that - will change!
    sprite.texture = Pixi.Texture.WHITE;
    sprite.tint = (area.faction.id === 0)
    ? 'blue'
    : 'red';

    const text = area.text;
    text.anchor = 0.5;
    text.x = SizeUnit / 2;
    text.y = SizeUnit / 2;
    text.text = `[${zone.position.x},${zone.position.y}]`;

    this.state.layer.areas.addChild(
        renderable
    );
   
    return this;
}

/**
 * Erases an existing AreaEntity.
 * 
 * @public
 * @this {RenderSystem}
 * @param {GameStateZone} zone 
 * @returns {RenderSystem} this
 */
function erase (zone) {
    const area = zone.area;
    if(area == null) {
        return this;
    }

    const renderable = area.renderable;

    renderable.removeFromParent();

    return this;
}

export {
    draw, erase
};
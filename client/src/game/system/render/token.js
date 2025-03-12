import * as Pixi from 'pixi.js';
import { GameStateZone } from '../../state/zone.js';
import { RenderSystem } from '../render.js';

/**
 * Draws a new TokenEntity.
 * 
 * @public
 * @this {RenderSystem}
 * @param {GameStateZone} zone 
 * @returns {RenderSystem} this
 */
function draw (zone) {
    const token = zone.token;
    if(token == null) {
        return this;
    }

    // todo = constant-ise!
    const SizeUnit = 72;
    const MarginUnit = 8;
    const boundary = new Pixi.Rectangle(0, 0, SizeUnit, SizeUnit);

    const renderable = token.renderable;
    renderable.eventMode = 'none';
    renderable.boundsArea = boundary;
    renderable.hitArea = boundary;
    renderable.x = zone.position.x * SizeUnit;
    renderable.y = zone.position.y * SizeUnit;

    const sprite = token.sprite;
    sprite.alpha = 0.55;
    sprite.label = undefined;
    sprite.circle(36, 36, 32, 32)
    .stroke({
        width: 2,
        color: 'blue'
    })
    .fill({
        color: 'lightblue'
    });
    
    this.state.layer.tokens.addChild(
        renderable
    );
   
    return this;
}

/**
 * Erases an existing TokenEntity.
 * 
 * @public
 * @this {RenderSystem}
 * @param {GameStateZone} zone 
 * @returns {RenderSystem} this
 */
function erase (zone) {
    const token = zone.token;
    if(token == null) {
        return this;
    }
    
    const renderable = token.renderable;

    renderable.removeFromParent();

    return this;
}

export {
    draw, erase
};
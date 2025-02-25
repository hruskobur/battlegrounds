import * as Pixi from 'pixi.js';
import { SystemBase, EventEmitter, GameState } from './base.js';
import { RenderableComponent } from '../components/renderable/renderable.js';

/**
 * @class RenderSystem
 * 
 * @description
 * This class manages the scene presence of RenderableComponents.
 * 
 * The term "draw" represents adding a RenderableComponent to its 
 * designated layer (a specific PIXI.Container), and "erase" represents 
 * removing the RenderableComponent from that layer.
 * 
 * It is responsible for ensuring that entities are correctly 
 * displayed or removed from the scene based on their state.
 */
class RenderSystem extends SystemBase {
    /**
     * @type {Pixi.Container}
     */
    container;

    /**
     * @param {EventEmitter} events 
     * @param {GameState} state 
     * @param {Pixi.Container} container 
     */
    constructor (events, state, container) {
        super(events, state);

        this.container = container;
        this.container.addChild(
            this.state.renderer.background,
            this.state.renderer.foreground
        );
    }

    /**
     * Performs a full clean-up & redraw of the RendererEntity.
     * 
     * @public
     * @returns {RenderSystem} this
     */
    init = () => {
        const bg = this.state.renderer.background;
        const fg = this.state.renderer.foreground;

        // layers: clean-up
        while(bg.children.length > 0) {
            bg.removeChildAt(0);
        }

        while(fg.children.length > 0) {
            fg.removeChildren(0);
        }

        // layers: do the "drawing"
        GameState.Query.iterator(
            this.state,
            (x, y) => {
                // draw area
                const area = this.state.areas[y][x];
                this.draw_entity(area)
                
                // draw token
                const token = this.state.tokens[y][x];
                if(token != null) {
                    this.draw_entity(token);
                }
            }
        );

        // layers: center
        bg.x = fg.x = (this.container.width - bg.width) / 2;
        bg.y = fg.y = (this.container.height - bg.height) / 2;

        return this;
    }

    /**
     * @public
     * @param {*} entity 
     * @returns {RenderSystem} this
     */
    draw_entity = (entity) => {
        const renderable = entity.renderable;

        this.state
        .renderer[renderable.layer]
        .addChild(renderable);

        this.events.emit(GameState.Event.RendererDraw, entity);

        return this;
    }

    /**
     * @public
     * @param {RenderableComponent} renderable 
     */
    draw_renderable = (renderable) => {
        this.state
        .renderer[renderable.layer]
        .addChild(renderable);

        this.events.emit(GameState.Event.RendererDraw, renderable);
    }

    /**
     * @public
     * @param {*} entity 
     * @returns {RenderSystem} this
     */
    erase_entity = (entity) => {
        const renderable = entity.renderable;

        while(renderable.children.length > 0) {
            renderable.removeChildAt(0);
        }

        renderable.removeFromParent();

        this.events.emit(GameState.Event.RendererErase, entity);

        return this;
    }

    /**
     * @public
     * @param {RenderableComponent} renderable 
     * @returns {RenderSystem} this
     */
    erase_renderable = (renderable) => {
        while(renderable.children.length > 0) {
            renderable.removeChildAt(0);
        }

        renderable.removeFromParent();

        this.events.emit(GameState.Event.RendererErase, renderable);

        return this;
    }

    // todo: draw Pixi.DisplayObject ... the elementary basic Pixi stuff
    draw_primitive () {}
    erase_primitive () {}

    // todo: unify draw/erase to single methods

}

export {
    RenderSystem
};
import anime from 'animejs';
import { GameStateZone } from '../../../state/zone.js';

/**
 * 
 * @param {GameStateZone} zone 
 */
function zone_faction_change (zone) {
    return anime.timeline({
        targets: zone.area.sprite,
        easing: 'linear',
        duration: 250,
    })
    .add({
        alpha: 0
    })
    .add({
        duration: 0.1,
        begin: () => {
            zone.area.sprite.tint = zone.area.faction.color;
        }
    })
    .add({
        alpha: 1
    });
    this.state.animations.push(
        timeline
    );
}

export default zone_faction_change;
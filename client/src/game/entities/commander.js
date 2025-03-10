import { FactionComponent } from '../components/faction.js';
import { DescriptionComponent } from '../components/description.js';
import { CommanderStatsComponent } from '../components/commander/stats.js';

class CommanderEntity {
    /**
     * @type {DescriptionComponent}
     */
    description;

    /**
     * @type {FactionComponent}
     */
    faction;

    /**
     * @type {CommanderStatsComponent}
     */
    stats;

    constructor () {
        this.faction = null

        this.description = new DescriptionComponent(
            '',
            ''
        );

        this.stats = new CommanderStatsComponent();
    }
}

export {
    CommanderEntity
};
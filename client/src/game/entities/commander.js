import { ResourcesComponent } from '../components/resources.js'
import { FactionComponent } from '../components/faction.js';

class CommanderEntity {
    /**
     * @type {FactionComponent}
    */
   faction;

   /**
    * @type {ResourcesComponent}
    */
   resources;

    constructor () {
        this.faction = new FactionComponent();
        this.resources = new ResourcesComponent();
    }
}

export {
    CommanderEntity
};
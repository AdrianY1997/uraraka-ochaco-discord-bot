import { DisTube, DisTubeOptions } from 'distube';
import { CustomClient } from './CustomClient';
import { player } from './Player';

export class CustomDistube extends DisTube {
    constructor(client: CustomClient, config: DisTubeOptions) {
        super(client, config);
        this.init();
    }

    private init() {
        player(this)
    }
}
import { DisTube, DisTubeOptions } from 'distube';
import { CustomClient } from './CustomClient';

export class CustomDistube extends DisTube {
    constructor(client: CustomClient, config: DisTubeOptions) {
        super(client, config);
    }
}
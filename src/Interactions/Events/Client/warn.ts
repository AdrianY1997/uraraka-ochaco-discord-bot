import { EventBuilder } from '../../../Component/Event';

export default new EventBuilder('warn')
    .setCallback(info => {
        console.info(info)
    })
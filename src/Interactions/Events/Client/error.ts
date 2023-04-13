import { EventBuilder } from '../../../Component/Event';

export default new EventBuilder('error')
    .setCallback(() => {
        console.error()
    })
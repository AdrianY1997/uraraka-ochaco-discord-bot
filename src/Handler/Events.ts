import { join } from 'path';
import { readdirSync } from 'fs';
import { CustomClient } from '../Component/CustomClient';
import { EventBuilder } from '../Component/Event';

export async function EventHandler(client: CustomClient) {
  const categories = readdirSync(join(__dirname, '..', 'Interactions', 'Events'));

  for (const category of categories) {
    const events = readdirSync(join(__dirname, '..', 'Interactions', 'Events', category));

    for (const eventFile of events) {
      const { default: event }: { default: EventBuilder<'ready'> } = await import(
        join(__dirname, '..', 'Interactions', 'Events', category, eventFile)
      );

      if (event.once) {
        client.once(event.name, (...args) => void event.callback(client, ...args));
      } else {
        client.on(event.name, (...args) => void event.callback(client, ...args));
      }
    }
  }
}
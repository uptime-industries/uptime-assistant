import {
    Client, Collection, Events
} from 'discord.js';
import { Event, ValidEvent } from '../Event.js';



export class EventHandler {
    readonly client: Client;

    protected events: Collection<string, Event> = new Collection();

    protected validateEvent(event: Event): event is ValidEvent   {
        return typeof event.name !== 'undefined' && typeof event.execute !== 'undefined';
    }

    /**
     * Add Event to Event handler
     * @param event event to add to handler
     */
    add(event: Event) {
        if (this.validateEvent(event)) {
            if (event.once) this.client.once(event.name, event.execute);
            else this.client.on(event.name, event.execute);
            this.events.set(event.name, event);
            return;
        }
        else {
            this.client.emit(Events.Error, new Error('Event missing required data', { cause: event }));
        }
        
        
    }

    get size() {
        return this.events.size;
    }

    constructor(client: Client) {
        this.client = client;
    }
}

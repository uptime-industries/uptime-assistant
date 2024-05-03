import { Client, Collection } from 'discord.js';
import assert from 'node:assert/strict';
import { Event } from '../Event.js';

export class EventHandler {
    readonly client: Client;

    protected events: Collection<string, Event> = new Collection();

    /**
     * Add Event to Event handler
     * @param event event to add to handler
     */
    add(event: Event) {
        const {
            name, once, execute
        } = event;
        assert(typeof name !== 'undefined', `Event has no name`);
        assert(typeof execute !== 'undefined', `Event ${name} does not have a execute function`);
        if (once) this.client.once(name, execute);
        else this.client.on(name, execute);
        this.events.set(name, event);
    }

    get size() {
        return this.events.size;
    }

    constructor(client: Client) {
        this.client = client;
    }
}

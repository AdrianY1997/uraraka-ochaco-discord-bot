import { ClientEvents } from "discord.js";
import { CustomClient } from "./CustomClient";

export class EventBuilder<T extends keyof ClientEvents>{
    public constructor(public name: T, public once?: true) { }

    public callback!: EventFunction<T>;

    public setCallback(fn: EventFunction<T>) {
        this.callback = fn;
        return this;
    }
}

type EventFunction<T extends keyof ClientEvents> = (
    client: CustomClient,
    ...args: ClientEvents[T]
) => unknown;
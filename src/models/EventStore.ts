import {Event} from './Event'

export class EventStore extends Event {
    private _action: string

    public constructor(
        eventId: number,
        eventName: string,
        eventDate: Date,
        eventLocation: string,
        action: string,
    ) {
        super(eventId, eventName, eventDate, eventLocation)
        this._action = action
    }

    public get action() {
        return this._action
    }
    public set action(newAction: string) {
        this._action = newAction
    }
}

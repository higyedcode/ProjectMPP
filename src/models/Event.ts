// models -> entities

export class Event {
    private _eventId: number
    private _eventName: string
    private _eventDate: Date
    private _eventLocation: string

    public constructor(
        eventId: number,
        eventName: string,
        eventDate: Date,
        eventLocation: string,
    ) {
        this._eventId = eventId
        this._eventName = eventName
        this._eventDate = eventDate
        this._eventLocation = eventLocation
    }

    // Getters
    public get eventId(): number {
        return this._eventId
    }

    public get eventName(): string {
        return this._eventName
    }

    public get eventDate(): Date {
        return this._eventDate
    }

    public get eventLocation(): string {
        return this._eventLocation
    }

    // Setters
    public set eventId(eventId: number) {
        this._eventId = eventId
    }

    public set eventName(eventName: string) {
        this._eventName = eventName
    }

    public set eventDate(eventDate: Date) {
        this._eventDate = eventDate
    }

    public set eventLocation(eventLocation: string) {
        this._eventLocation = eventLocation
    }
}

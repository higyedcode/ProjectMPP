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

    public static fromJson(json: any): Event {
        return new Event(
            json.id,
            json.eventName,
            new Date(json.eventDate),
            json.eventLocation,
        )
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
    public toString(): string {
        // Customize the string representation as needed
        return `EventID:${this.eventId} Name: ${this.eventName}, Date: ${this.eventDate}, Location: ${this.eventLocation}`
    }
}

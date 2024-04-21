export class Host {
    private _id: number
    private _name: string
    private _email: string
    private _bio: string
    private _org: string
    private _link: string

    constructor(
        id: number,
        name: string,
        email: string,
        bio: string,
        org: string,
        link: string,
    ) {
        this._id = id
        this._name = name
        this._email = email
        this._bio = bio
        this._org = org
        this._link = link
    }

    // Getters
    public get id(): number {
        return this._id
    }

    public get name(): string {
        return this._name
    }

    public get email(): string {
        return this._email
    }

    public get bio(): string {
        return this._bio
    }

    public get org(): string {
        return this._org
    }

    public get link(): string {
        return this._link
    }

    // Setters
    public set id(value: number) {
        this._id = value
    }

    public set name(value: string) {
        this._name = value
    }

    public set email(value: string) {
        this._email = value
    }

    public set bio(value: string) {
        this._bio = value
    }

    public set org(value: string) {
        this._org = value
    }

    public set link(value: string) {
        this._link = value
    }

    // toString method
    public toString(): string {
        return `Host { id: ${this._id}, name: ${this._name}, email: ${this._email}, bio: ${this._bio}, org: ${this._org}, link: ${this._link} }`
    }
    public static fromJson(json: any): Host {
        return new Host(
            json.id,
            json.name,
            json.email,
            json.bio,
            json.org,
            json.link,
        )
    }
}

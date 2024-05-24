import {Host} from './Host'

export class HostStore extends Host {
    private _action: string

    constructor(
        id: number,
        name: string,
        email: string,
        bio: string,
        org: string,
        link: string,
        action: string,
        role: string,
    ) {
        super(id, name, email, bio, org, link, role)
        this._action = action
    }

    public get action() {
        return this._action
    }
    public set action(newAction: string) {
        this._action = newAction
    }
}

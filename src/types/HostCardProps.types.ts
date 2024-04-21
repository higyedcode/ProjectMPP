import {Host} from '../models/Host'

export type HostCardProps = {
    givenHost: Host
    removeMethod: (_hostId: number) => void
}

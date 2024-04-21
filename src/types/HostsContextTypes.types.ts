// ReactNode is a type that represents any valid JSX element(strings, components or fragments)
import {ReactNode} from 'react'
import {Host} from '../models/Host'

export type HostsContextTypes = {
    hosts: Host[]
    // pageSize: number,
    // isAscending: boolean,
    // setPageSize: (pageSize: number) => void,
    // setIsAscending: (isAscending: boolean) => void,
    addHost: (host: Host) => void
    removeHost: (hostId: number) => void
}

export type ProviderType = {
    hostContext: HostsContextTypes
    children: ReactNode
}

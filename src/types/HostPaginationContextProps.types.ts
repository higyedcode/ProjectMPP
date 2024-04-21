import {ReactNode} from 'react'
import {Host} from '../models/Host'

export type HostsPaginationContextType = {
    currentHosts: Host[]
    hostPageId: number
    pageSize: number
    hostIsAscending: boolean
    setCurrentHosts: (hosts: Host[]) => void
    setHostPageId: (pageId: number) => void
    setHostIsAscending: (isAscending: boolean) => void
}

export type HostsPaginationContextProviderType = {
    paginationContext: HostsPaginationContextType
    children: ReactNode
}

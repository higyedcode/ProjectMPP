// ReactNode is a type that represents any valid JSX element(strings, components or fragments)
import {ReactNode} from 'react'
import {Event} from '../models/Event'

export type EventContextType = {
    hostId: number
    setHostId: (hostId: number) => void
    events: Event[]
    // pageSize: number,
    // isAscending: boolean,
    // setPageSize: (pageSize: number) => void,
    // setIsAscending: (isAscending: boolean) => void,
    addEvent: (event: Event) => void
    removeEvent: (eventId: number) => void
}

export type ProviderType = {
    eventContext: EventContextType
    children: ReactNode
}

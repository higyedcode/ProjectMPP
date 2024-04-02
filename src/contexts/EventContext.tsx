import {createContext} from 'react'
import {EventContextType, ProviderType} from '../types/EventContextTypes.types'

export const EventContext = createContext<EventContextType | null>(null)

function EventContextProvider({eventContext, children}: ProviderType) {
    return (
        <EventContext.Provider value={eventContext}>
            {children}
        </EventContext.Provider>
    )
}

export {EventContextProvider}

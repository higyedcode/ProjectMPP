import {createContext} from 'react'
import {
    OfflineContextType,
    OfflineProviderType,
} from '../types/OfflineContextTypes.types'

export const OfflineContext = createContext<OfflineContextType | null>(null)

function OfflineContextProvider({
    offlineContext,
    children,
}: OfflineProviderType) {
    return (
        <OfflineContext.Provider value={offlineContext}>
            {children}
        </OfflineContext.Provider>
    )
}

export {OfflineContextProvider}

import {createContext} from 'react'
import {HostsContextTypes, ProviderType} from '../types/HostsContextTypes.types'

export const HostContext = createContext<HostsContextTypes | null>(null)

function HostsContextProvider({hostContext, children}: ProviderType) {
    return (
        <HostContext.Provider value={hostContext}>
            {children}
        </HostContext.Provider>
    )
}

export {HostsContextProvider}

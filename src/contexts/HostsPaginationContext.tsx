import {createContext} from 'react'
import {
    HostsPaginationContextProviderType,
    HostsPaginationContextType,
} from '../types/HostPaginationContextProps.types'

export const HostPaginationContext =
    createContext<HostsPaginationContextType | null>(null)

function HostsPaginationContextProvider({
    paginationContext,
    children,
}: HostsPaginationContextProviderType) {
    return (
        <HostPaginationContext.Provider value={paginationContext}>
            {children}
        </HostPaginationContext.Provider>
    )
}

export {HostsPaginationContextProvider}

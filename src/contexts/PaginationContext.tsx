import {createContext} from 'react'
import { PaginationContextType, PaginationContextProviderType } from '../types/PaginationContextProps.types'



export const PaginationContext = createContext<PaginationContextType | null>(null)

function PaginationContextProvider({paginationContext, children}: PaginationContextProviderType) {
    return (
        <PaginationContext.Provider value={paginationContext}>
            {children}
        </PaginationContext.Provider>
    )
}

export {PaginationContextProvider }

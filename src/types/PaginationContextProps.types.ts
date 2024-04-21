import {ReactNode} from 'react'
import {Event} from '../models/Event'

export type PaginationContextType = {
    currentEvents: Event[],
    pageId: number    
    pageSize: number,
    isAscending: boolean,
    setCurrentEvents: (events: Event[]) => void
    setCurrentPageId: (pageId: number) => void
    setIsAscending: (isAscending: boolean) => void
}

export type PaginationContextProviderType = {
    paginationContext: PaginationContextType
    children: ReactNode
}

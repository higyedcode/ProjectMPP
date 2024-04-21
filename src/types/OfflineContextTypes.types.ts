// ReactNode is a type that represents any valid JSX element(strings, components or fragments)
import {ReactNode} from 'react'

export type OfflineContextType = {
    isOnline: boolean
    isServerOnline: boolean
    setIsOnline: (isOnline: boolean) => void
    setIsServerOnline: (isServerOnline: boolean) => void
}

export type OfflineProviderType = {
    offlineContext: OfflineContextType
    children: ReactNode
}

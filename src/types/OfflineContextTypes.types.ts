// ReactNode is a type that represents any valid JSX element(strings, components or fragments)
import {ReactNode} from 'react'
import {OfflineDatabase} from '../features/Offline Support/OfflineDatabase'

export type OfflineContextType = {
    isOnline: boolean
    isServerOnline: boolean
    offlineDB: OfflineDatabase
    setIsOnline: (isOnline: boolean) => void
    setIsServerOnline: (isServerOnline: boolean) => void
}

export type OfflineProviderType = {
    offlineContext: OfflineContextType
    children: ReactNode
}

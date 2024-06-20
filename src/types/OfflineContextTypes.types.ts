// ReactNode is a type that represents any valid JSX element(strings, components or fragments)
import {ReactNode} from 'react'
import {OfflineDatabase} from '../features/Offline Support/OfflineDatabase'
import {Host} from '../models/Host'

export type OfflineContextType = {
    isOnline: boolean
    isServerOnline: boolean
    offlineDB: OfflineDatabase
    isDark: boolean
    invitedHost: Host | null
    setIsOnline: (isOnline: boolean) => void
    setIsServerOnline: (isServerOnline: boolean) => void
    setIsDark: (isDark: boolean) => void
    setInvitedHost: (host: Host | null) => void
}

export type OfflineProviderType = {
    offlineContext: OfflineContextType
    children: ReactNode
}

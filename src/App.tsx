import {Suspense, useEffect, useState} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import {EventContextProvider} from './contexts/EventContext'
import {Event} from './models/Event'
import ChartPage from './pages/ChartPage/ChartPage'

import React from 'react'
import {HostsContextProvider} from './contexts/HostsContext'
import {HostsPaginationContextProvider} from './contexts/HostsPaginationContext'
import {OfflineContextProvider} from './contexts/OfflineContext'
import {PaginationContextProvider} from './contexts/PaginationContext'
import {OfflineDatabase} from './features/Offline Support/OfflineDatabase'
import {Host} from './models/Host'
import AddHostPage from './pages/Add Host Page/AddHostPage'
import DisplayHostPage from './pages/Display Hosts Page/DissplayHostsPage'
import EditHostPage from './pages/Edit Host Page/EditHostPage'
import LoadingPage from './pages/Loading Page/LoadingPage'
import LoginPage from './pages/Login Page/LoginPage'
import WebSocketPage from './pages/WebSocket Page/WebSocketPage'
import {checkServerStatus} from './services/EventService/EventService'

const DisplayEventPage = React.lazy(
    () => import('./pages/Display Events Page/DissplayEventsPage'),
)
const AddEventPage = React.lazy(
    () => import('./pages/Add Event Page/AddEventPage'),
)
const EditEventPage = React.lazy(
    () => import('./pages/Edit Event Page/EditEventPage'),
)

// Define three specific events
// const eventsList: Event[] = [
//     new Event(
//         1,
//         'Tech Conference 2024',
//         new Date('2024-05-20T09:00:00'),
//         'Convention Center, San Francisco',
//     ),
//     new Event(
//         2,
//         'Product Launch Expo',
//         new Date('2024-06-15T10:30:00'),
//         'Exhibition Hall, New York City',
//     ),
//     new Event(
//         3,
//         'Annual Charity Gala',
//         new Date('2024-07-10T18:00:00'),
//         'Grand Ballroom, Los Angeles',
//     ),
//     new Event(
//         4,
//         'Netflix Show',
//         new Date('2024-07-10T18:00:00'),
//         'Grand Ballroom, Los Angeles',
//     ),
//     new Event(
//         5,
//         'Tech Expo',
//         new Date('2024-08-05T11:00:00'),
//         'Convention Center, San Francisco',
//     ),
//     new Event(
//         6,
//         'Fashion Week',
//         new Date('2024-09-20T09:30:00'),
//         'Fashion Center, Paris',
//     ),
//     new Event(
//         7,
//         'Music Festival',
//         new Date('2024-09-25T12:00:00'),
//         'Outdoor Arena, London',
//     ),
//     new Event(
//         8,
//         'Art Exhibition',
//         new Date('2024-10-10T10:00:00'),
//         'Art Gallery, Rome',
//     ),
//     new Event(
//         9,
//         'Film Premiere',
//         new Date('2024-10-15T18:30:00'),
//         'Red Carpet, Hollywood',
//     ),
//     new Event(
//         10,
//         'Book Fair',
//         new Date('2024-11-05T09:00:00'),
//         'Convention Center, New York City',
//     ),
//     new Event(
//         11,
//         'Food Festival',
//         new Date('2024-11-15T11:30:00'),
//         'Food Hall, Tokyo',
//     ),
//     new Event(
//         12,
//         'Science Expo',
//         new Date('2024-12-10T10:00:00'),
//         'Science Museum, Berlin',
//     ),
//     new Event(
//         13,
//         'Car Show',
//         new Date('2025-01-15T09:00:00'),
//         'Auto Showroom, Detroit',
//     ),
//     new Event(
//         14,
//         'Tech Summit',
//         new Date('2025-02-20T08:00:00'),
//         'Convention Center, San Francisco',
//     ),
//     new Event(
//         15,
//         'Gaming Convention',
//         new Date('2025-03-10T10:00:00'),
//         'Gaming Arena, Seoul',
//     ),
//     new Event(
//         16,
//         'Comedy Show',
//         new Date('2025-04-05T20:00:00'),
//         'Comedy Club, London',
//     ),
//     new Event(
//         17,
//         'Wine Tasting',
//         new Date('2025-05-15T17:00:00'),
//         'Vineyard, Bordeaux',
//     ),
//     new Event(
//         18,
//         'Music Concert',
//         new Date('2025-06-20T19:00:00'),
//         'Concert Hall, Sydney',
//     ),
//     new Event(
//         19,
//         'Fashion Show',
//         new Date('2025-07-10T11:00:00'),
//         'Fashion Center, Milan',
//     ),
//     new Event(
//         20,
//         'Annual Gala Dinner',
//         new Date('2025-08-15T19:30:00'),
//         'Luxury Hotel, Dubai',
//     ),
// ]

const pageSize = 3
const offlineDB = new OfflineDatabase()

function App() {
    let [events, setEvents] = useState<Event[]>([])
    let [currentEvents, setCurrentEvents] = useState<Event[]>(
        events.slice(0, pageSize),
    )
    let [pageId, setCurrentPageId] = useState<number>(1)
    let [isAscending, setIsAscending] = useState<boolean>(true)
    let [hostId, setHostId] = useState<number>(0)

    let [hosts, setHosts] = useState<Host[]>([])
    let [currentHosts, setCurrentHosts] = useState<Host[]>(
        hosts.slice(0, pageSize),
    )
    let [hostPageId, setHostPageId] = useState<number>(1)
    let [hostIsAscending, setHostIsAscending] = useState<boolean>(true)

    let [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)
    let [isServerOnline, setIsServerOnline] = useState<boolean>(true)

    useEffect(() => {
        // getEvents()
        //     .then((eventsList) => {
        //         setEvents(eventsList)
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching events:', error)
        //     })

        // getHosts(true, hosts)
        //     .then((hostsList) => {
        //         setHosts(hostsList)
        //         console.log('LOADED\n' + hostsList)
        //     })
        //     .catch((error) => {
        //         console.log('Error fetching hosts: ' + error)
        //     })

        setInterval(() => {
            setIsOnline(navigator.onLine)
            checkServerStatus()
                .then((result) => {
                    setIsServerOnline(result)
                })
                .catch(() => {
                    setIsServerOnline(false)
                })
        }, 10000)
        offlineDB.openDatabase()
    }, []) //emtpy dependency => runs only once on mount

    useEffect(() => {
        if (!isOnline || !isServerOnline) {
        }
    }, [isOnline, isServerOnline])

    const addEvent = (event: Event) => {
        setEvents((prevState: Event[]) => [...prevState, event])
    }

    const addHost = (host: Host) => {
        setHosts((prevState: Host[]) => [...prevState, host])
    }
    const removeEvent = (id: number) => {
        setEvents((prevState: Event[]) =>
            prevState.filter((event) => event.eventId !== id),
        )
    }
    const removeHost = (id: number) => {
        setHosts((prevState: Host[]) =>
            prevState.filter((host) => host.id !== id),
        )
    }

    console.log('ONLINE ' + isServerOnline)
    // if (!isOnline)
    //     return (
    //         <div className='container'>
    //             <div className='offline'>Offline</div>
    //         </div>
    //     )
    // if (!isServerOnline)
    //     return (
    //         <div className='container'>
    //             <div className='offline'>Server is offline</div>
    //         </div>
    //     )

    return (
        <OfflineContextProvider
            offlineContext={{
                offlineDB,
                isOnline,
                setIsOnline,
                isServerOnline,
                setIsServerOnline,
            }}
        >
            <HostsContextProvider
                hostContext={{
                    hosts: hosts ? hosts : [],
                    addHost,
                    removeHost,
                }}
            >
                <HostsPaginationContextProvider
                    paginationContext={{
                        currentHosts,
                        setCurrentHosts,
                        hostPageId,
                        hostIsAscending,
                        pageSize,
                        setHostPageId,
                        setHostIsAscending,
                    }}
                >
                    <EventContextProvider
                        eventContext={{
                            hostId,
                            setHostId,
                            events: events ? events : [],
                            addEvent,
                            removeEvent,
                        }}
                    >
                        <PaginationContextProvider
                            paginationContext={{
                                currentEvents,
                                setCurrentEvents,
                                pageId,
                                setCurrentPageId,
                                pageSize,
                                isAscending,
                                setIsAscending,
                            }}
                        >
                            <BrowserRouter>
                                <Routes>
                                    <Route
                                        path='/loading'
                                        element={<LoadingPage />}
                                    />
                                    <Route
                                        path='/events'
                                        element={
                                            <Suspense
                                                fallback={<LoadingPage />}
                                            >
                                                <DisplayEventPage />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path='/'
                                        element={
                                            <Suspense
                                                fallback={<LoadingPage />}
                                            >
                                                <DisplayHostPage />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path='/addEvent'
                                        element={
                                            <Suspense
                                                fallback={<LoadingPage />}
                                            >
                                                <AddEventPage />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path='/addHost'
                                        element={
                                            <Suspense
                                                fallback={<LoadingPage />}
                                            >
                                                <AddHostPage />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path='/editEvent/:id'
                                        element={
                                            <Suspense
                                                fallback={<LoadingPage />}
                                            >
                                                <EditEventPage />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path='/editHost/:id'
                                        element={
                                            <Suspense
                                                fallback={<LoadingPage />}
                                            >
                                                <EditHostPage />
                                            </Suspense>
                                        }
                                    />

                                    <Route
                                        path='/editEvent/'
                                        element={
                                            <Suspense
                                                fallback={<LoadingPage />}
                                            >
                                                <DisplayEventPage />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path='/chart'
                                        element={
                                            <Suspense
                                                fallback={<LoadingPage />}
                                            >
                                                <ChartPage />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path='/websocket'
                                        element={
                                            <Suspense
                                                fallback={<LoadingPage />}
                                            >
                                                <WebSocketPage />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path='/login'
                                        element={
                                            <Suspense
                                                fallback={<LoadingPage />}
                                            >
                                                <LoginPage />
                                            </Suspense>
                                        }
                                    />
                                </Routes>
                            </BrowserRouter>
                        </PaginationContextProvider>
                    </EventContextProvider>
                </HostsPaginationContextProvider>
            </HostsContextProvider>
        </OfflineContextProvider>
    )
}

export default App

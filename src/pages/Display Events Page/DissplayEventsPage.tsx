import {useContext, useEffect, useState} from 'react'

import {EventCard} from '../../features/Display Events/EventCard'
import {Event} from '../../models/Event'
import {Layout} from '../../shared/components/layout/Layout'

import {jwtDecode} from 'jwt-decode'
import InfiniteScroll from 'react-infinite-scroll-component'
import {EventContext} from '../../contexts/EventContext'
import {OfflineContext} from '../../contexts/OfflineContext'
import {PaginationContext} from '../../contexts/PaginationContext'
import {
    deleteEvent,
    getEventsPage,
    getEventsSizeByHostId,
} from '../../services/EventService/EventService'
import MapMarker from '../Map Page/MapMarker'
import './DisplayEventsPage.css'

export default function DisplayEventPage() {
    document.title = 'Events Dashboard!'

    const paginationContext = useContext(PaginationContext)!
    const eventsContext = useContext(EventContext)!
    const offlineContext = useContext(OfflineContext)!
    const hostId = eventsContext.hostId
    const [selectedLocation, setSelectedLocation] = useState<string | null>(
        'Oradea, Oradea, Romania',
    )

    let [isAscending, setIsAscending] = useState<String>(
        paginationContext.isAscending ? 'ASC' : 'DESC',
    )
    let [showNext, setShowNext] = useState<boolean>(true)
    let [updateFlag, setUpdateFlag] = useState<boolean>(true)
    let [nrEvents, setNrEvents] = useState<number>(0)
    // let [usersCount, setUsersCount] = useState<number>(0);

    let [currentPage, setCurrentPage] = useState<number>(1)
    let [currentEvents, setCurrentEvents] = useState<Event[]>([])

    if (localStorage.getItem('token') === null) {
        return (
            <Layout
                entity='Events'
                children={
                    <div
                        className='main-page-container'
                        style={{width: '100%'}}
                    >
                        <h1> Please log in to view events </h1>
                    </div>
                }
            ></Layout>
        )
    }
    if (offlineContext.invitedHost !== null) {
    }

    const role = (jwtDecode(localStorage.getItem('token')!) as any).role
    if (role === 'ADMIN' || role === 'MANAGER') {
        localStorage.setItem('hostId', eventsContext.hostId.toString())
    }
    // let [scrollPosition, setScrollPosition] = useState<number>(0);

    // let [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)
    // let [isServerOnline, setIsServerOnline] = useState<boolean>(true)

    // useEffect(() => {
    //     events.sort((firstEvent, secondEvent) => {
    //         return (
    //             firstEvent.eventDate.getTime() - secondEvent.eventDate.getTime()
    //         )
    //     })
    //     if (isAscending === 'DESC') events.reverse()
    // }, [isAscending])

    // let events: Event[] = eventsContext.events
    const removeMethod = (id: number) => {
        deleteEvent(id!).then(() => {
            console.log('DELETE ' + id)
            getEventsPage(
                currentPage - 1,
                isAscending == 'ASC' ? true : false,
            ).then((events) => {
                setCurrentEvents(events)
                setUpdateFlag(!updateFlag)
                setShowNext(true)
            })
        })
    }

    // const nrAddElems = 15
    // const [itemsPerPage, setItemsPerPage] = useState(15)
    // const currentEvents = events.slice(0, itemsPerPage)

    // useEffect(() => {
    //     const currentEvents = events.slice(0, itemsPerPage)
    // }, [itemsPerPage])

    ////////////////////////////
    const handleShowMore = () => {
        console.log(hostId)
        console.log(currentPage - 1)
        getEventsPage(currentPage, isAscending == 'ASC' ? true : false).then(
            (nextPage) => {
                setCurrentEvents([...currentEvents, ...nextPage])
                if ((currentPage + 1) * 15 - nrEvents < 15) {
                    setCurrentPage(currentPage + 1)
                    paginationContext.setCurrentPageId(currentPage + 1)
                    setShowNext(true)
                } else {
                    setShowNext(false)
                }
            },
        )
    }
    useEffect(() => {
        console.log('isAscending/updateFlag changed')
        getEventsPage(
            0,
            isAscending == 'ASC' ? true : false,
            currentPage * 15,
        ).then((events) => {
            setCurrentEvents(events)
            setShowNext(true)
        })
        getEventsSizeByHostId().then((size) => {
            console.log('NR EVENTS ' + size)
            setNrEvents(size)
        })
    }, [isAscending, updateFlag])

    // useEffect(() => {
    //     console.log('currentPage changed')
    //     const socket = new WebSocket('ws://localhost:8080/websocket')
    //     const stompClient = Stomp.over(socket)

    //     // socket.onopen = () => {
    //     //     console.log("CONNECTION RECEIVED");
    //     // }
    //     // socket.onerror = (error) => {
    //     //     console.log("ERROR " + error);
    //     // }
    //     //subscribe to '/topic/events' endpoint
    //     stompClient.connect({}, () => {
    //         console.log('CONNECTED')
    //         stompClient.subscribe('/topic/events', (response) => {
    //             const newMessage = response.body
    //             console.log('MESSAGE received: ' + newMessage)

    //             setUpdateFlag(!updateFlag)
    //         })
    //         console.log('AFTER ' + hostId)
    //     })
    // }, [currentPage])

    useEffect(() => {
        currentPage = 1

        getEventsPage(0, isAscending == 'ASC' ? true : false, 15)
            .then((loadedPage) => {
                setCurrentEvents(loadedPage)
                console.log('LOADED ' + loadedPage)
            })
            .catch((error) => {
                console.log('eroare')
                console.log(error)
            })
    }, [])

    // console.log(currentEvents)
    ////////////////////////////

    const viewMap = (eventLocation) => {
        if (document.querySelector('.map')!.hasAttribute('hidden')) {
            document.querySelector('.map')!.removeAttribute('hidden')
            document
                .querySelector('.closeMap-button')!
                .removeAttribute('hidden')
        }

        setSelectedLocation(eventLocation)
        console.log(eventLocation)
    }

    function closeMap(): void {
        document.querySelector('.map')!.setAttribute('hidden', 'true')
        document
            .querySelector('.closeMap-button')!
            .setAttribute('hidden', 'true')
    }

    return (
        <InfiniteScroll
            dataLength={currentPage * 15}
            next={handleShowMore}
            hasMore={showNext}
            loader={
                <div className='loading'>
                    <p>Loading ...</p>
                </div>
            }
        >
            <Layout
                entity='Events'
                children={
                    <div className='flexRowContainer'>
                        <div
                            className='main-page-container'
                            style={{width: '100vw', height: '100%'}}
                        >
                            <h1 style={{margin: '30px 0 10px 0'}}>
                                Events Dashboard
                            </h1>
                            {offlineContext.invitedHost !== null && (
                                <h3>
                                    Choose the event to be specified in the
                                    invitation for{' '}
                                    {offlineContext.invitedHost.name}
                                </h3>
                            )}
                            <button
                                className='sort'
                                onClick={() =>
                                    setIsAscending(
                                        isAscending === 'ASC' ? 'DESC' : 'ASC',
                                    )
                                }
                            >
                                {isAscending}
                            </button>

                            <div
                                className='events-list'
                                data-testid='events-list'
                            >
                                {currentEvents.map((event, index) => (
                                    <EventCard
                                        givenEvent={event}
                                        removeMethod={removeMethod}
                                        key={index}
                                        viewMap={viewMap}
                                    />
                                ))}
                            </div>
                            {Math.min(currentPage * 15, nrEvents) !=
                                nrEvents && (
                                <button
                                    className='showMoreBtn'
                                    onClick={() => handleShowMore()}
                                >
                                    {' '}
                                    View More{' '}
                                    {Math.min(
                                        currentPage * 15,
                                        nrEvents,
                                    )} / {nrEvents}
                                </button>
                            )}
                        </div>
                        <button
                            className='closeMap-button'
                            data-testid='closeMap-button'
                            onClick={() => {
                                closeMap()
                            }}
                            hidden
                        >
                            X
                        </button>
                        <div className='map' hidden>
                            <MapMarker selectedLocation={selectedLocation} />
                        </div>
                    </div>
                }
            ></Layout>
        </InfiniteScroll>
    )
}

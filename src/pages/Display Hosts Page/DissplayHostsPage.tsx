import {useContext, useEffect, useState} from 'react'

import {Layout} from '../../shared/components/layout/Layout'

import Stomp from 'stompjs'

import InfiniteScroll from 'react-infinite-scroll-component'
import {HostContext} from '../../contexts/HostsContext'
import {HostPaginationContext} from '../../contexts/HostsPaginationContext'
import {OfflineContext} from '../../contexts/OfflineContext'
import HostCard from '../../features/Display Hosts/HostCard'
import {Host} from '../../models/Host'
import {
    deletehost,
    getHostsPage,
    getHostsSize,
} from '../../services/HostService/HostService'
import './DisplayHostsPage.css'

export default function DisplayHostPage() {
    document.title = 'Hosts Dashboard!'

    const hostsContext = useContext(HostContext)!
    const hostPaginationContext = useContext(HostPaginationContext)!
    const offlineContext = useContext(OfflineContext)!
    const offlineDB = offlineContext.offlineDB

    let [isAscending, setIsAscending] = useState<String>(
        hostPaginationContext.hostIsAscending ? 'ASC' : 'DESC',
    )
    let [showNext, setShowNext] = useState<boolean>(true)
    let [updateFlag, setUpdateFlag] = useState<boolean>(true)
    let [nrHosts, setNrHosts] = useState<number>(0)
    // let [usersCount, setUsersCount] = useState<number>(0);
    let [allHosts, setAllHosts] = useState<Host[]>(hostsContext.hosts)
    let [currentPage, setCurrentPage] = useState<number>(1)
    let [currentHosts, setCurrentHosts] = useState<Host[]>([])

    // let [scrollPosition, setScrollPosition] = useState<number>(0);
    let [isOnline, setIsOnline] = useState<boolean>(offlineContext.isOnline)
    let [isServerOnline, setIsServerOnline] = useState<boolean>(
        offlineContext.isServerOnline,
    )

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
        deletehost(id!, !isOnline, allHosts, offlineDB).then(() => {
            console.log('DELETE ' + id)
            getHostsPage(
                currentPage - 1,
                isAscending == 'ASC' ? true : false,
                5,
                !offlineContext.isServerOnline || !offlineContext.isOnline,
                offlineContext.offlineDB,
            ).then((hosts) => {
                setCurrentHosts(hosts)
                setUpdateFlag(!updateFlag)
                setShowNext(true)
            })
        })
    }

    const handleShowMore = () => {
        getHostsPage(
            currentPage,
            isAscending == 'ASC' ? true : false,
            5,
            !offlineContext.isServerOnline || !offlineContext.isOnline,
            offlineContext.offlineDB,
        ).then((nextPage) => {
            console.log(
                'isOnline: ' + isOnline + ' isServerOnline: ' + isServerOnline,
            )

            setCurrentHosts([...currentHosts, ...nextPage])
            if ((currentPage + 1) * 5 - nrHosts < 5) {
                setCurrentPage(currentPage + 1)
                hostPaginationContext.setHostPageId(currentPage + 1)
                setShowNext(true)
            } else {
                setShowNext(false)
            }
        })
    }
    useEffect(() => {
        getHostsPage(
            0,
            isAscending == 'ASC' ? true : false,
            currentPage * 5,
            !offlineContext.isServerOnline || !offlineContext.isOnline,
            offlineContext.offlineDB,
        ).then((events) => {
            console.log('OFFLINE HOSTS')
            console.log(events)
            if (events.length > 0 || !offlineContext.isServerOnline) {
                setCurrentHosts(events)
                setShowNext(true)
            }
        })
        getHostsSize(
            !offlineContext.isServerOnline || !offlineContext.isOnline,
            offlineContext.offlineDB,
        ).then((size) => {
            console.log('Setting nr hosts => ' + size)
            setNrHosts(size)
        })
    }, [
        isAscending,
        updateFlag,
        offlineContext.isServerOnline,
        offlineContext.isOnline,
    ])

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080/websocket')
        const stompClient = Stomp.over(socket)

        // socket.onopen = () => {
        //     console.log("CONNECTION RECEIVED");
        // }
        // socket.onerror = (error) => {
        //     console.log("ERROR " + error);
        // }
        //subscribe to '/topic/events' endpoint
        stompClient.connect({}, () => {
            console.log('CONNECTED')
            stompClient.subscribe('/topic/events', (response) => {
                const newMessage = response.body
                console.log('MESSAGE received: ' + newMessage)

                setUpdateFlag(!updateFlag)
            })
        })
    }, [currentPage])

    useEffect(() => {
        console.log('CURRENT PAGE: ' + currentPage)
        getHostsPage(
            currentPage - 1,
            isAscending == 'ASC' ? true : false,
            5,
            !offlineContext.isServerOnline || !offlineContext.isOnline,
            offlineContext.offlineDB,
        )
            .then((loadedPage) => {
                if (loadedPage.length > 0) {
                    setCurrentHosts(loadedPage)
                    console.log('LOADED ')
                }
            })
            .catch((error) => {
                console.log('eroare')
                console.log(error)
            })
    }, [])

    // console.log('ONLINE ' + isServerOnline)
    // if (!offlineContext.isOnline)
    //     return (
    //         <div className='container'>
    //             <div className='offline'>Offline</div>
    //         </div>
    //     )
    // if (!offlineContext.isServerOnline)
    //     return (
    //         <div className='container'>
    //             <div className='offline'>Server is offline</div>
    //         </div>
    //     )

    // console.log(currentEvents)
    ////////////////////////////

    return (
        <InfiniteScroll
            dataLength={currentPage * 5}
            next={handleShowMore}
            hasMore={showNext}
            loader={
                <div className='loading'>
                    <p>Loading ...</p>
                </div>
            }
        >
            <Layout
                entity='Hosts'
                children={
                    <div className='main-page-container'>
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

                        <div className='events-list' data-testid='events-list'>
                            {currentHosts.map((host) => (
                                <HostCard
                                    givenHost={host}
                                    removeMethod={removeMethod}
                                    key={host.id}
                                />
                            ))}
                        </div>

                        {/* {Math.min(currentPage * 5, nrHosts) == nrHosts || (
                            <button
                                className='showMoreBtn'
                                onClick={() => handleShowMore()}
                            >
                                {' '}
                                View More {Math.min(
                                    currentPage * 5,
                                    nrHosts,
                                )} / {nrHosts}
                            </button>
                        )} */}
                    </div>
                }
            ></Layout>
        </InfiniteScroll>
    )
}

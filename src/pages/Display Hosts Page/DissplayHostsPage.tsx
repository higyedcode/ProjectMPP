import {useContext, useEffect, useState} from 'react'

import {Layout} from '../../shared/components/layout/Layout'

import Stomp from 'stompjs'

import {HostContext} from '../../contexts/HostsContext'
import {HostPaginationContext} from '../../contexts/HostsPaginationContext'
import HostCard from '../../features/Display Hosts/HostCard'
import {Host} from '../../models/Host'
import {
    checkServerStatus,
    deletehost,
    getHostsPage,
    getHostsSize,
} from '../../services/HostService/HostService'
import './DisplayHostsPage.css'

export default function DisplayHostPage() {
    document.title = 'Events Dashboard!'

    const hostsContext = useContext(HostContext)!
    const hostPaginationContext = useContext(HostPaginationContext)!

    let [isAscending, setIsAscending] = useState<String>(
        hostPaginationContext.hostIsAscending ? 'ASC' : 'DESC',
    )
    let [showNext, setShowNext] = useState<boolean>(true)
    let [updateFlag, setUpdateFlag] = useState<boolean>(true)
    let [nrHosts, setNrHosts] = useState<number>(0)
    // let [usersCount, setUsersCount] = useState<number>(0);

    let [currentPage, setCurrentPage] = useState<number>(1)
    let [currentHosts, setCurrentHosts] = useState<Host[]>([])

    // let [scrollPosition, setScrollPosition] = useState<number>(0);
    let [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)
    let [isServerOnline, setIsServerOnline] = useState<boolean>(true)

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
        deletehost(id!).then(() => {
            console.log('DELETE ' + id)
            getHostsPage(
                currentPage - 1,
                isAscending == 'ASC' ? true : false,
            ).then((hosts) => {
                setCurrentHosts(hosts)
                setUpdateFlag(!updateFlag)
                setShowNext(true)
            })
        })
    }

    // const nrAddElems = 5
    // const [itemsPerPage, setItemsPerPage] = useState(5)
    // const currentEvents = events.slice(0, itemsPerPage)

    // useEffect(() => {
    //     const currentEvents = events.slice(0, itemsPerPage)
    // }, [itemsPerPage])

    ////////////////////////////
    const handleShowMore = () => {
        getHostsPage(currentPage, isAscending == 'ASC' ? true : false).then(
            (nextPage) => {
                console.log(currentPage)
                setCurrentHosts([...currentHosts, ...nextPage])
                if ((currentPage + 1) * 3 - nrHosts < 3) {
                    setCurrentPage(currentPage + 1)
                    hostPaginationContext.setHostPageId(currentPage + 1)
                    setShowNext(true)
                }
            },
        )
    }
    useEffect(() => {
        getHostsPage(
            0,
            isAscending == 'ASC' ? true : false,
            currentPage * 3,
        ).then((events) => {
            setCurrentHosts(events)
            setShowNext(true)
        })
        getHostsSize().then((size) => {
            setNrHosts(size)
        })
    }, [isAscending, updateFlag, isServerOnline])

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
        getHostsPage(currentPage - 1, isAscending == 'ASC' ? true : false, 3)
            .then((loadedPage) => {
                setCurrentHosts(loadedPage)
                console.log('LOADED ')
            })
            .catch((error) => {
                console.log('eroare')
                console.log(error)
            })

        setInterval(() => {
            setIsOnline(navigator.onLine)
            checkServerStatus()
                .then((result) => {
                    setIsServerOnline(result)
                })
                .catch(() => {
                    setIsServerOnline(false)
                })
        }, 1000)
    }, [])

    console.log('ONLINE ' + isServerOnline)
    if (!isOnline)
        return (
            <div className='container'>
                <div className='offline'>Offline</div>
            </div>
        )
    if (!isServerOnline)
        return (
            <div className='container'>
                <div className='offline'>Server is offline</div>
            </div>
        )

    // console.log(currentEvents)
    ////////////////////////////

    return (
        <Layout>
            <div className='main-page-container'>
                <button
                    className='sort'
                    onClick={() =>
                        setIsAscending(isAscending === 'ASC' ? 'DESC' : 'ASC')
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
                {Math.min(currentPage * 3, nrHosts) != nrHosts && (
                    <button
                        className='showMoreBtn'
                        onClick={() => handleShowMore()}
                    >
                        {' '}
                        View More {Math.min(currentPage * 3, nrHosts)} /{' '}
                        {nrHosts}
                    </button>
                )}
            </div>
        </Layout>
    )
}

import {BarChart} from '@mui/x-charts'
import {useContext, useEffect, useState} from 'react'
import Stomp from 'stompjs'
import {EventContext} from '../../contexts/EventContext'
import {
    getEvents,
    getEventsByHostId,
} from '../../services/EventService/EventService'
import {Header} from '../../shared/components/header/Header'
import './ChartPage.css'

const ChartPage = () => {
    // Convert events data to a format suitable for the pie chart
    // let [currentEvents, setCurrentEvents] = useState<Event[]>([]);
    let [eventsMap, setEventsMap] = useState<Map<string, number>>(
        new Map<string, number>(),
    )

    const eventsContext = useContext(EventContext)!

    useEffect(() => {
        getEventsByHostId(eventsContext.hostId)
            .then((eventsList) => {
                // setCurrentEvents(eventsList);

                const map: Map<string, number> = eventsList.reduce(
                    (acc, event) => {
                        // Extract the date from the event
                        const date = event.eventDate
                        console.log(date.toDateString())

                        // If the date is already in the map, increment the count, otherwise initialize it to 1
                        if (acc.has(date.toDateString())) {
                            acc.set(
                                date.toDateString(),
                                acc.get(date.toDateString())! + 1,
                            )
                        } else {
                            acc.set(date.toDateString(), 1)
                        }

                        return acc
                    },
                    new Map<string, number>(),
                )

                // console.log(...map.keys())
                // console.log(...map.values())

                setEventsMap(map)
            })
            .catch((error) => {
                console.error('Error fetching events:', error)
            })
    }, []) //emtpy dependency => runs only once on mount

    useEffect(() => {
        console.log(...eventsMap.keys())
        console.log(...eventsMap.values())
    }, [eventsMap])

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

                getEvents()
                    .then((eventsList) => {
                        // setCurrentEvents(eventsList);

                        const map: Map<string, number> = eventsList.reduce(
                            (acc, event) => {
                                // Extract the date from the event
                                const date = event.eventDate
                                console.log(date.toDateString())

                                // If the date is already in the map, increment the count, otherwise initialize it to 1
                                if (acc.has(date.toDateString())) {
                                    acc.set(
                                        date.toDateString(),
                                        acc.get(date.toDateString())! + 1,
                                    )
                                } else {
                                    acc.set(date.toDateString(), 1)
                                }

                                return acc
                            },
                            new Map<string, number>(),
                        )

                        // console.log(...map.keys())
                        // console.log(...map.values())

                        setEventsMap(map)
                    })
                    .catch((error) => {
                        console.error('Error fetching events:', error)
                    })
            })
        })
    })

    // let eventsInitial: Event[] = eventsContext.events;

    // const eventsMap: Map<string, number> = eventsInitial.reduce(
    //     (acc, event) => {
    //         // Extract the date from the event
    //         const date = event.eventDate

    //         // If the date is already in the map, increment the count, otherwise initialize it to 1
    //         if (acc.has(date.toDateString())) {
    //             acc.set(date.toDateString(), acc.get(date.toDateString())! + 1)
    //         } else {
    //             acc.set(date.toDateString(), 1)
    //         }

    //         return acc
    //     },
    //     new Map<string, number>(),
    // )

    return (
        <div>
            <Header entity='Events' />
            <div className='pie-chart-container'>
                {eventsMap.size > 0 && (
                    <BarChart
                        xAxis={[
                            {
                                id: 'barCategories',
                                data: [...eventsMap!.keys()],
                                scaleType: 'band',
                            },
                        ]}
                        series={[
                            {
                                data: [...eventsMap!.values()],
                            },
                        ]}
                        width={500}
                        height={300}
                    />
                )}
            </div>
        </div>
    )
}

export default ChartPage

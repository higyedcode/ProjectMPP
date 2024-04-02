import {useContext, useEffect, useState} from 'react'

import {EventContext} from '../../contexts/EventContext'
import {EventCard} from '../../features/Display Events/EventCard'
import {Event} from '../../models/Event'
import {Layout} from '../../shared/components/layout/Layout'

import './DisplayEventsPage.css'

export function DisplayEventPage() {
    document.title = 'Events Dashboard!'

    const eventsContext = useContext(EventContext)!

    let [isAscending, setIsAscending] = useState<String>('ASC')

    useEffect(() => {
        events.sort((firstEvent, secondEvent) => {
            return (
                firstEvent.eventDate.getTime() - secondEvent.eventDate.getTime()
            )
        })
        if (isAscending === 'DESC') events.reverse()
    }, [isAscending])

    let events: Event[] = eventsContext.events
    const removeMethod = eventsContext.removeEvent

    const nrAddElems = 5
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const currentEvents = events.slice(0, itemsPerPage)

    useEffect(() => {
        const currentEvents = events.slice(0, itemsPerPage)
    }, [itemsPerPage])

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
                    {currentEvents.map((event) => (
                        <EventCard
                            givenEvent={event}
                            removeMethod={removeMethod}
                            key={event.eventId}
                        />
                    ))}
                </div>
                <button
                    onClick={() => setItemsPerPage(itemsPerPage + nrAddElems)}
                >
                    {' '}
                    Show More
                </button>
            </div>
        </Layout>
    )
}

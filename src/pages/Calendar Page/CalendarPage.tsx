import {Calendar, useCalendarApp} from '@schedule-x/react'
import './CalendarPage.css'

import {
    viewDay,
    viewMonthAgenda,
    viewMonthGrid,
    viewWeek,
} from '@schedule-x/calendar'
import {createDragAndDropPlugin} from '@schedule-x/drag-and-drop'
import {createEventModalPlugin} from '@schedule-x/event-modal'
import {createEventsServicePlugin} from '@schedule-x/events-service'
import {createScrollControllerPlugin} from '@schedule-x/scroll-controller'
import '@schedule-x/theme-default/dist/index.css'
import {useEffect, useState} from 'react'
import {getEvents} from '../../services/EventService/EventService'
import {Layout} from '../../shared/components/layout/Layout'
import CustomDateGridEvent from './CustomDateGridEvent'
import CustomTimeGridEvent from './CustomTimeGridEvent'

const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate() + Math.floor(Math.random() * 4)).padStart(
        2,
        '0',
    )
    return `${year}-${month}-${day}`
}

class CalendarEvent {
    id: number
    title: string
    start: string
    end: string

    public constructor(id: number, title: string, start: string, end: string) {
        this.id = id
        this.title = title
        this.start = start
        this.end = end
    }
}

function CalendarApp() {
    const [events, setEvents] = useState([])
    const [eventService, setEventService] = useState(
        createEventsServicePlugin(),
    )
    const scrollController = createScrollControllerPlugin({
        initialScroll: '07:50',
    })
    const [calendar, setCalendar] = useState(
        useCalendarApp({
            defaultView: viewMonthGrid.name,
            views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
            isDark: true,
            plugins: [
                createEventModalPlugin(),
                createDragAndDropPlugin(),
                eventService,
                scrollController,
            ],
            events: [],
        }),
    )

    useEffect(() => {
        getEvents().then((hostEvents) => {
            let calendarEvents: CalendarEvent[] = []
            hostEvents.forEach((event) => {
                let calendarEvent = new CalendarEvent(
                    event.eventId,
                    event.eventName,
                    formatDate(event.eventDate),
                    formatDate(event.eventDate),
                )
                calendarEvents.push(calendarEvent)
            })
            setEvents(calendarEvents)
            console.log('SET EVENTS')
            console.log(calendarEvents)
            eventService.set(calendarEvents)
        })
    }, [])

    return (
        <Layout entity='Events'>
            <Calendar
                calendarApp={calendar}
                customComponents={{
                    timeGridEvent: CustomTimeGridEvent,
                    dateGridEvent: CustomDateGridEvent,
                }}
            />
        </Layout>
    )
}

export default CalendarApp

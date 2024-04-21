import api from '../../api'
import {Event} from '../../models/Event.js'
import {EventJson} from '../../types/eventJson.types.js'

export async function getEventById(id: number) {
    let response = await api.get('/events/' + id)
    // console.log("RESPONSE DATA __ " + response.data)
    return Event.fromJson(response.data)
}

export async function getEvents() {
    let response = await api.get('/events')
    let events: Event[] = []

    response.data.forEach((el: any) => {
        events.push(Event.fromJson(el))
    })

    return events
}
export async function getEventsByHostId(hostId: number) {
    let response = await api.get('/events?hostId=' + hostId)
    let events: Event[] = []

    response.data.forEach((el: any) => {
        events.push(Event.fromJson(el))
    })

    return events
}
export async function getEventsSize() {
    let response = await api.get('/events/eventsSize')
    let size: number = response.data
    console.log(size)

    return size
}
export async function getEventsSizeByHostId(hostId: number) {
    let response = await api.get('/events/eventsSize?hostId=' + hostId)
    let size: number = response.data
    console.log(size)

    return size
}

export async function getEventsPage(
    hostId: number,
    pageId: number,
    isAscending: boolean,
    pageSize: number = 3,
) {
    try {
        let response = await api.get(
            '/events/getPage?hostId=' +
                hostId +
                '&page=' +
                pageId +
                '&isAscending=' +
                isAscending +
                '&pageSize=' +
                pageSize,
        )
        console.log(response.data)
        let events: Event[] = []

        response.data.forEach((eventJson: EventJson) =>
            events.push(Event.fromJson(eventJson)),
        )
        return events
    } catch (error) {
        console.error((error as Error).message)
        return []
    }
}

export async function updateEvent(id: number, event: EventJson) {
    await api.patch('/events/' + id, {
        ...event,
    })
}
export async function addEvent(event: EventJson) {
    await api.post('/events', {
        ...event,
    })
}

export async function deleteEvent(id: number) {
    await api.delete('/events/' + id)
}

export async function checkServerStatus() {
    console.log('Checking server status ...')
    try {
        await api.get('/events/ping')
        return true
    } catch (error) {
        return false
    }
}

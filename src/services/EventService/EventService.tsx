import {jwtDecode} from 'jwt-decode'
import api from '../../api'
import {Event} from '../../models/Event.js'
import {EventJson} from '../../types/eventJson.types.js'

export function ifAdminOrManagerGetHostId() {
    let token = (jwtDecode(localStorage.getItem('token')) as any).role
    if (token === 'ADMIN' || token === 'MANAGER') {
        return parseInt(localStorage.getItem('hostId'))
    }
    return null
}

export async function getEventById(id: number) {
    let token = localStorage.getItem('token')
    console.log('TOKEN ' + localStorage.getItem('token'))
    let headers = {
        Authorization: `Bearer ${token}`,
    }

    let response = await api.get('/events/' + id, {headers: headers})
    // console.log("RESPONSE DATA __ " + response.data)
    return Event.fromJson(response.data)
}

export async function getEvents() {
    let hostId = ifAdminOrManagerGetHostId()
    let apiPath = '/events'
    if (hostId != null) {
        apiPath += '?hostId=' + hostId
    }
    let token = localStorage.getItem('token')
    console.log('TOKEN ' + localStorage.getItem('token'))
    let headers = {
        Authorization: `Bearer ${token}`,
    }
    let response = await api.get(apiPath, {headers: headers})
    let events: Event[] = []

    response.data.forEach((el: any) => {
        events.push(Event.fromJson(el))
    })

    return events
}
export async function getEventsByHostId() {
    let token = localStorage.getItem('token')

    let headers = {
        Authorization: `Bearer ${token}`,
    }
    let hostId = ifAdminOrManagerGetHostId()
    let apiPath = '/events'
    if (hostId != null) {
        apiPath += '?hostId=' + hostId
    }
    let response = await api.get(apiPath, {headers: headers})
    let events: Event[] = []

    response.data.forEach((el: any) => {
        events.push(Event.fromJson(el))
    })

    return events
}
export async function getEventsSize() {
    let hostId = ifAdminOrManagerGetHostId()
    let apiPath = '/events/eventsSize'
    if (hostId != null) {
        apiPath += '?hostId=' + hostId
    }
    let token = localStorage.getItem('token')
    console.log('TOKEN ' + localStorage.getItem('token'))
    let headers = {
        Authorization: `Bearer ${token}`,
    }

    let response = await api.get(apiPath, {headers: headers})
    let size: number = response.data
    console.log(size)

    return size
}
export async function getEventsSizeByHostId() {
    let token = localStorage.getItem('token')
    console.log('TOKEN ' + localStorage.getItem('token'))
    let headers = {
        Authorization: `Bearer ${token}`,
    }
    let hostId = ifAdminOrManagerGetHostId()
    let apiPath = '/events/eventsSize'
    if (hostId != null) {
        apiPath += '?hostId=' + hostId
    }
    let response = await api.get(apiPath, {headers: headers})
    let size: number = response.data
    console.log(size)

    return size
}

export async function getEventsPage(
    pageId: number,
    isAscending: boolean,
    pageSize: number = 15,
) {
    try {
        let token = localStorage.getItem('token')
        let headers = {
            Authorization: `Bearer ${token}`,
        }
        let hostId = ifAdminOrManagerGetHostId()
        let apiPath =
            '/events/getPage?page=' +
            pageId +
            '&isAscending=' +
            isAscending +
            '&pageSize=' +
            pageSize
        if (hostId != null) {
            apiPath += '&hostId=' + hostId
        }
        let response = await api.get(apiPath, {headers: headers})
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
    let token = localStorage.getItem('token')
    console.log('TOKEN ' + localStorage.getItem('token'))
    let headers = {
        Authorization: `Bearer ${token}`,
    }
    await api.patch(
        '/events/' + id,
        {
            ...event,
        },
        {headers: headers},
    )
}
export async function addEvent(event: EventJson) {
    let hostId = ifAdminOrManagerGetHostId()
    let apiPath = '/events'
    if (hostId != null) {
        apiPath += '?hostId=' + hostId
    }

    let token = localStorage.getItem('token')
    let headers = {
        Authorization: `Bearer ${token}`,
    }

    await api.post(
        apiPath,
        {
            ...event,
        },
        {headers: headers},
    )
}

export async function deleteEvent(id: number) {
    let token = localStorage.getItem('token')
    let headers = {
        Authorization: `Bearer ${token}`,
    }
    await api.delete('/events/' + id, {headers: headers})
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

import api from '../../api.js'
import {Host} from '../../models/Host.js'
import {HostJson} from '../../types/hostJson.types.js'

export async function getHostById(id: string) {
    let response = await api.get('/hosts/' + id)
    // console.log("RESPONSE DATA __ " + response.data)
    return Host.fromJson(response.data)
}

export async function getHosts() {
    let response = await api.get('/hosts')
    let hosts: Host[] = []

    response.data.forEach((el: any) => {
        hosts.push(Host.fromJson(el))
    })

    return hosts
}
export async function getHostsSize() {
    let response = await api.get('/hosts/hostsSize')
    let size: number = response.data
    console.log(size)

    return size
}

export async function getHostsPage(
    pageId: number,
    isAscending: boolean,
    pageSize: number = 3,
) {
    try {
        let response = await api.get(
            '/hosts/getPage?page=' +
                pageId +
                '&isAscending=' +
                isAscending +
                '&pageSize=' +
                pageSize,
        )
        console.log(response.data)
        let hosts: Host[] = []

        response.data.forEach((hostJson: HostJson) =>
            hosts.push(Host.fromJson(hostJson)),
        )
        return hosts
    } catch (error) {
        console.error((error as Error).message)
        return []
    }
}

export async function updatehost(id: string, host: HostJson) {
    await api.patch('/hosts/' + id, {
        ...host,
    })
}
export async function addhost(host: HostJson) {
    await api.post('/hosts', {
        ...host,
    })
}

export async function deletehost(id: number) {
    await api.delete('/hosts/' + id)
}

export async function checkServerStatus() {
    console.log('Checking server status ...')
    try {
        await api.get('/hosts/ping')
        return true
    } catch (error) {
        return false
    }
}

import api from '../../api.js'
import {OfflineDatabase} from '../../features/Offline Support/OfflineDatabase.js'
import {Host} from '../../models/Host.js'
import {HostJson} from '../../types/hostJson.types.js'

export async function getHostById(
    id: string,
    offline: boolean,
    allHosts: Host[],
) {
    if (offline) {
        return allHosts.find((host) => host.id == parseInt(id))
    }
    let response = await api.get('/hosts/' + id)
    // console.log("RESPONSE DATA __ " + response.data)
    return Host.fromJson(response.data)
}

export async function getHosts(offline: boolean, allHosts: Host[]) {
    if (offline) {
        return allHosts
    }

    let response = await api.get('/hosts')
    let hosts: Host[] = []

    response.data.forEach((el: any) => {
        hosts.push(Host.fromJson(el))
    })

    return hosts
}
export async function getHostsSize(offline: boolean, allHosts: Host[]) {
    if (offline) {
        return allHosts.length
    }
    let response = await api.get('/hosts/hostsSize')
    let size: number = response.data
    console.log(size)

    return size
}

export async function getHostsPage(
    pageId: number,
    isAscending: boolean,
    pageSize: number = 3,
    offline: boolean,
    allHosts: Host[],
) {
    if (offline) {
        if (isAscending) return allHosts.sort().slice(pageId, pageSize)
        else return allHosts.sort().reverse().slice(pageId, pageSize)
    }
    try {
        let response = await api.get(
            '/hosts/getPage?page=' +
                pageId +
                '&isAscending=' +
                isAscending +
                '&pageSize=' +
                pageSize,
        )

        let hosts: Host[] = []

        response.data.forEach((hostJson: HostJson) =>
            hosts.push(Host.fromJson(hostJson)),
        )
        console.log('DATA: ' + hosts)
        return hosts
    } catch (error) {
        console.error((error as Error).message)
        return []
    }
}

export async function updatehost(
    id: string,
    host: HostJson,
    offline: boolean,
    allHosts: Host[],
    offlineDB: OfflineDatabase,
) {
    if (offline) {
        getHostById(id, true, allHosts).then((host) => {
            offlineDB.addHost(host!, 'update')
        })
        return
    }
    await api.patch('/hosts/' + id, {
        ...host,
    })
}
export async function addhost(
    host: HostJson,
    offline: boolean,
    allHosts: Host[],
    offlineDB: OfflineDatabase,
) {
    if (offline) {
        let hostToAdd = Host.fromJson(host)
        offlineDB.addHost(hostToAdd!, 'add')
        allHosts.push(hostToAdd)
        return
    }
    await api.post('/hosts', {
        ...host,
    })
}

export async function deletehost(
    id: number,
    offline: boolean,
    allHosts: Host[],
    offlineDB: OfflineDatabase,
) {
    if (offline) {
        getHostById(id.toString(), true, allHosts).then((host) => {
            offlineDB.addHost(host!, 'delete')
            allHosts.filter((host) => host.id !== id)
            return
        })

        await api.delete('/hosts/' + id)
    }
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

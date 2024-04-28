import api from '../../api.js'
import {OfflineDatabase} from '../../features/Offline Support/OfflineDatabase.js'
import {Host} from '../../models/Host.js'
import {HostJson} from '../../types/hostJson.types.js'

export async function getHostById(
    id: string,
    offline: boolean,
    offlineDB: OfflineDatabase,
) {
    if (offline) {
        let allHosts: Host[] = await offlineDB.getAllHostDBItems()

        return allHosts!.find((host) => host.id == parseInt(id))
    }
    let response = await api.get('/hosts/' + id)
    // console.log("RESPONSE DATA __ " + response.data)
    return Host.fromJson(response.data)
}

export async function getHosts(offline: boolean, offlineDB: OfflineDatabase) {
    if (offline) {
        return await offlineDB.getAllHostDBItems()
    }

    let response = await api.get('/hosts')
    let hosts: Host[] = []

    response.data.forEach((el: any) => {
        hosts.push(Host.fromJson(el))
    })

    return hosts
}
export async function getHostsSize(
    offline: boolean,
    offlineDB: OfflineDatabase,
) {
    if (offline) {
        return (await offlineDB.getAllHostDBItems()).length
    }
    let response = await api.get('/hosts/hostsSize')
    let size: number = response.data
    console.log('SIZE + ' + size)

    return size
}

export function addOfflineEVents(offlineDB: OfflineDatabase) {
    console.log('ADDING OFFLINE EVENTS')
    offlineDB.getAllHostDBItems().then((hosts) => {
        console.log('OFFLINE hosts: ')
        console.log(hosts)
        hosts.forEach((host) => {
            addhost(
                {
                    id: host.id,
                    name: host.name,
                    email: host.email,
                    bio: host.bio,
                    organisation: host.org,
                    socialMediaLink: host.link,
                },
                false,
                offlineDB,
            )
        })
        offlineDB.clearDatabase()
    })
}

export async function getHostsPage(
    pageId: number,
    isAscending: boolean,
    pageSize: number = 3,
    offline: boolean,
    offlineDB: OfflineDatabase,
) {
    if (offline) {
        if (isAscending) {
            console.log('LOADED' + (await offlineDB.getAllHostDBItems()))
            return (await offlineDB.getAllHostDBItems())
                .sort()
                .slice(pageId, pageSize)
        } else
            return (await offlineDB.getAllHostDBItems())
                .sort()
                .reverse()
                .slice(pageId, pageSize)
    }

    try {
        addOfflineEVents(offlineDB)
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
    offlineDB: OfflineDatabase,
) {
    if (offline) {
        offlineDB
            .getHostDBItemsWithId(parseInt(id))
            .then((hostIdInIndexedDB) => {
                offlineDB.updateHost(hostIdInIndexedDB, Host.fromJson(host))
                console.log('UPDATED HOST OFFLINE!')
            })
    }
    await api.patch('/hosts/' + id, {
        ...host,
    })
}
export async function addhost(
    host: HostJson,
    offline: boolean,
    offlineDB: OfflineDatabase,
) {
    if (offline) {
        let hostToAdd = Host.fromJson(host)
        offlineDB.getAllHostDBItems().then((hosts) => {
            hostToAdd.id = hosts.length
            offlineDB.addHost(hostToAdd!)
            return
        })
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
        return
    }

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

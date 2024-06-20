import {Event} from '../../models/Event'
import {Host} from '../../models/Host'
import {HostJson} from '../../types/hostJson.types'

export class OfflineDatabase {
    public openDatabase(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('eventDB', 1)

            request.onerror = (event) => {
                console.error('Database error:', request.error)
                reject(request.error)
            }

            request.onupgradeneeded = (event) => {
                const db = request.result

                // Create todo object store
                if (!db.objectStoreNames.contains('eventDB')) {
                    db.createObjectStore('eventDB', {
                        keyPath: 'id',
                        autoIncrement: true,
                    })
                }
            }

            request.onsuccess = (event) => {
                const db = request.result
                resolve(db)
            }
        })
    }

    public addEvent(event: Event) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await this.openDatabase()
                const transaction = db.transaction('eventDB', 'readwrite')
                const store = transaction.objectStore('eventDB')

                const newItem = new Event(
                    event.eventId,
                    event.eventName,
                    event.eventDate,
                    event.eventLocation,
                )
                const request = store.add(newItem)

                request.onsuccess = (event) => {
                    resolve(request.result)
                }

                request.onerror = (event) => {
                    console.error('Error adding todo item:', request.error)
                    reject(request.error)
                }
            } catch (error) {
                reject(error)
            }
        })
    }
    public addHost(host: Host) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await this.openDatabase()
                const transaction = db.transaction('eventDB', 'readwrite')
                const store = transaction.objectStore('eventDB')

                const newItem = new Host(
                    host.id,
                    host.name,
                    host.email,
                    host.bio,
                    host.org,
                    host.link,
                    host.role,
                )
                const request = store.add(newItem)

                request.onsuccess = (event) => {
                    resolve(request.result)
                }

                request.onerror = (event) => {
                    console.error('Error adding todo item:', request.error)
                    reject(request.error)
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    public updateHost(key: IDBValidKey, host: Host) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const db = await this.openDatabase()
                const transaction = db.transaction('eventDB', 'readwrite')
                const store = transaction.objectStore('eventDB')

                const newItem = new Host(
                    host.id,
                    host.name,
                    host.email,
                    host.bio,
                    host.org,
                    host.link,
                    host.role,
                )
                const getRequest = store.get(key)
                getRequest.onsuccess = (event) => {
                    const data: Host = getRequest.result
                    newItem.id = (data as any)._id
                    Object.assign(data, newItem)
                    const putRequest = store.put(data)
                    putRequest.onsuccess = () => {
                        resolve()
                    }
                }
            } catch (error) {
                reject('ERROR updating: ' + error)
            }
        })
    }

    // Retrieve all todo items from the database
    public getAllEventDBItems(): Promise<Event[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await this.openDatabase()
                const transaction = db.transaction('eventDB', 'readonly')
                const store = transaction.objectStore('eventDB')

                const request = store.getAll()

                request.onsuccess = (event) => {
                    const data = request.result
                    const eventClasses = data.map((item) => {
                        const {id, ...eventClass} = item // Destructure the object, excluding the id field
                        return eventClass
                    })
                    resolve(
                        eventClasses.filter(
                            (obj) => obj.constructor.name === 'Event',
                        ),
                    )
                }

                request.onerror = (event) => {
                    console.error('Error fetching items:', request.error)
                    reject(request.error)
                }
            } catch (error) {
                reject(error)
            }
        })
    }
    public getAllHostDBItems(): Promise<HostJson[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await this.openDatabase()
                const transaction = db.transaction('eventDB', 'readonly')
                const store = transaction.objectStore('eventDB')

                const request = store.getAll()

                request.onsuccess = (event) => {
                    const data = request.result
                    const eventClasses = data.map((item) => {
                        const {id, ...eventClass} = item // Destructure the object, excluding the id field
                        const hostJson: HostJson = {
                            id: eventClass._id,
                            role: eventClass._role,
                            name: eventClass._name,
                            email: eventClass._email,
                            bio: eventClass._bio,
                            organisation: eventClass._org,
                            socialMediaLink: eventClass._link,
                        }
                        return hostJson
                    })
                    resolve(
                        eventClasses,
                        // eventClasses.filter(
                        //     (obj) => obj.constructor.name === 'Host',
                        // ),
                    )
                }

                request.onerror = (event) => {
                    console.error('Error fetching items:', request.error)
                    reject(request.error)
                }
            } catch (error) {
                reject(error)
            }
        })
    }
    public getHostDBItemsWithId(id: number): Promise<number> {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await this.openDatabase()
                const transaction = db.transaction('eventDB', 'readonly')
                const store = transaction.objectStore('eventDB')

                const request = store.getAll()

                request.onsuccess = (event) => {
                    const data = request.result
                    const eventClasses = data.find((item) => {
                        console.log('ITEM: ')
                        console.log(item)
                        return item._id == id
                    })
                    console.log('OBJECT MISTERY: ' + eventClasses)
                    const hostId = eventClasses.id
                    resolve(
                        hostId,
                        // eventClasses.filter(
                        //     (obj) => obj.constructor.name === 'Host',
                        // ),
                    )
                }

                request.onerror = (event) => {
                    console.error('Error fetching items:', request.error)
                    reject(request.error)
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    // Delete a todo item from the database
    public deleteEvent(id: number) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await this.openDatabase()
                const transaction = db.transaction('eventDB', 'readwrite')
                const store = transaction.objectStore('eventDB')

                const request = store.delete(id)

                request.onsuccess = (event) => {
                    resolve(id)
                }

                request.onerror = (event) => {
                    console.error('Error deleting todo item:', request.error)
                    reject(request.error)
                }
            } catch (error) {
                reject(error)
            }
        })
    }
    public clearDatabase() {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await this.openDatabase()
                const transaction = db.transaction('eventDB', 'readwrite')
                const store = transaction.objectStore('eventDB')

                const request = store.clear()

                request.onsuccess = () => {
                    console.log('SUCCESSFULLY cleared the offline database!')
                }

                request.onerror = () => {
                    console.error(
                        'Error clearing offline database:',
                        request.error,
                    )
                    reject(request.error)
                }
            } catch (error) {
                reject(error)
            }
        })
    }
}

import {Event} from '../../models/Event'
import {EventStore} from '../../models/EventStore'
import {Host} from '../../models/Host'
import {HostStore} from '../../models/HostStore'

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

    public addEvent(event: Event, action: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await this.openDatabase()
                const transaction = db.transaction('eventDB', 'readwrite')
                const store = transaction.objectStore('eventDB')

                const newItem = new EventStore(
                    event.eventId,
                    event.eventName,
                    event.eventDate,
                    event.eventLocation,
                    action,
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
    public addHost(host: Host, action: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await this.openDatabase()
                const transaction = db.transaction('eventDB', 'readwrite')
                const store = transaction.objectStore('eventDB')

                const newItem = new HostStore(
                    host.id,
                    host.name,
                    host.email,
                    host.bio,
                    host.org,
                    host.link,
                    action,
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

    // Retrieve all todo items from the database
    public getAllEventDBItems() {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await this.openDatabase()
                const transaction = db.transaction('eventDB', 'readonly')
                const store = transaction.objectStore('eventDB')

                const request = store.getAll()

                request.onsuccess = (event) => {
                    resolve(request.result)
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
                const transaction = db.transaction('todos', 'readwrite')
                const store = transaction.objectStore('todos')

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
}

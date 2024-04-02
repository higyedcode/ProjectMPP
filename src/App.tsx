import {useEffect, useState} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import {EventContextProvider} from './contexts/EventContext'
import {Event} from './models/Event'
import {AddEventPage} from './pages/Add Event Page/AddEventPage'

import ChartPage from './pages/ChartPage/ChartPage'
import {DisplayEventPage} from './pages/Display Events Page/DissplayEventsPage'
import {EditEventPage} from './pages/Edit Event Page/EditEventPage'

// Define three specific events
const eventsList: Event[] = [
    new Event(
        1,
        'Tech Conference 2024',
        new Date('2024-05-20T09:00:00'),
        'Convention Center, San Francisco',
    ),
    new Event(
        2,
        'Product Launch Expo',
        new Date('2024-06-15T10:30:00'),
        'Exhibition Hall, New York City',
    ),
    new Event(
        3,
        'Annual Charity Gala',
        new Date('2024-07-10T18:00:00'),
        'Grand Ballroom, Los Angeles',
    ),
    new Event(
        4,
        'Netflix Show',
        new Date('2024-07-10T18:00:00'),
        'Grand Ballroom, Los Angeles',
    ),
    new Event(
        5,
        'Tech Expo',
        new Date('2024-08-05T11:00:00'),
        'Convention Center, San Francisco',
    ),
    new Event(
        6,
        'Fashion Week',
        new Date('2024-09-20T09:30:00'),
        'Fashion Center, Paris',
    ),
    new Event(
        7,
        'Music Festival',
        new Date('2024-09-25T12:00:00'),
        'Outdoor Arena, London',
    ),
    new Event(
        8,
        'Art Exhibition',
        new Date('2024-10-10T10:00:00'),
        'Art Gallery, Rome',
    ),
    new Event(
        9,
        'Film Premiere',
        new Date('2024-10-15T18:30:00'),
        'Red Carpet, Hollywood',
    ),
    new Event(
        10,
        'Book Fair',
        new Date('2024-11-05T09:00:00'),
        'Convention Center, New York City',
    ),
    new Event(
        11,
        'Food Festival',
        new Date('2024-11-15T11:30:00'),
        'Food Hall, Tokyo',
    ),
    new Event(
        12,
        'Science Expo',
        new Date('2024-12-10T10:00:00'),
        'Science Museum, Berlin',
    ),
    new Event(
        13,
        'Car Show',
        new Date('2025-01-15T09:00:00'),
        'Auto Showroom, Detroit',
    ),
    new Event(
        14,
        'Tech Summit',
        new Date('2025-02-20T08:00:00'),
        'Convention Center, San Francisco',
    ),
    new Event(
        15,
        'Gaming Convention',
        new Date('2025-03-10T10:00:00'),
        'Gaming Arena, Seoul',
    ),
    new Event(
        16,
        'Comedy Show',
        new Date('2025-04-05T20:00:00'),
        'Comedy Club, London',
    ),
    new Event(
        17,
        'Wine Tasting',
        new Date('2025-05-15T17:00:00'),
        'Vineyard, Bordeaux',
    ),
    new Event(
        18,
        'Music Concert',
        new Date('2025-06-20T19:00:00'),
        'Concert Hall, Sydney',
    ),
    new Event(
        19,
        'Fashion Show',
        new Date('2025-07-10T11:00:00'),
        'Fashion Center, Milan',
    ),
    new Event(
        20,
        'Annual Gala Dinner',
        new Date('2025-08-15T19:30:00'),
        'Luxury Hotel, Dubai',
    ),
]
function App() {
    let [events, setEvents] = useState<Event[]>(eventsList)

    const addEvent = (event: Event) => {
        setEvents((prevState: Event[]) => [...prevState, event])
    }

    const removeEvent = (id: number) => {
        setEvents((prevState: Event[]) =>
            prevState.filter((event) => event.eventId !== id),
        )
    }
    useEffect(() => {
        console.log(events)
    })

    return (
        <EventContextProvider eventContext={{events, addEvent, removeEvent}}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<DisplayEventPage />} />
                    <Route path='/addEvent' element={<AddEventPage />} />
                    <Route path='/editEvent/:id' element={<EditEventPage />} />
                    <Route path='/editEvent/' element={<DisplayEventPage />} />
                    <Route path='/chart' element={<ChartPage />} />
                </Routes>
            </BrowserRouter>
        </EventContextProvider>
    )
}

export default App

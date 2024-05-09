import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import {expect, test} from 'vitest'
import DisplayEventPage from '../pages/Display Events Page/DissplayEventsPage'

test('test display users page render', () => {
    render(
        // <EventContextProvider
        //     eventContext={{
        //         events: [
        //             new Event(
        //                 1,
        //                 'Untold',
        //                 new Date('2011-06-06'),
        //                 'Cluj-Napoca',
        //             ),
        //         ],
        //         addEvent: vi.fn(),
        //         removeEvent: vi.fn(),
        //     }}
        // >
        <BrowserRouter>
            <DisplayEventPage />
        </BrowserRouter>,
        // </EventContextProvider>,
    )

    const eventsListDiv = screen.getByTestId('events-list')

    expect(eventsListDiv.childNodes.length).toBe(1)
})

import '@testing-library/jest-dom'
import {fireEvent, render, screen} from '@testing-library/react'
import {sha256} from 'js-sha256'
import {BrowserRouter} from 'react-router-dom'
import {expect, test, vi} from 'vitest'
import {EventCard} from '../features/Display Events/EventCard'
import {Event} from '../models/Event'

const {mockedUseNavigate} = vi.hoisted(() => {
    return {
        mockedUseNavigate: vi.fn(),
    }
})

vi.mock('react-router-dom', async () => {
    const router =
        await vi.importActual<typeof import('react-router-dom')>(
            'react-router-dom',
        )
    return {
        ...router,
        useNavigate: () => mockedUseNavigate,
    }
})

test('test user card rendering', () => {
    const testEvent = new Event(
        1,
        'Untold',
        new Date('2011-06-06'),
        'Cluj-Napoca',
    )
    const mockRemoveMethod = vi.fn()

    render(
        <BrowserRouter>
            <EventCard givenEvent={testEvent} removeMethod={mockRemoveMethod} />
        </BrowserRouter>,
    )

    const eventCard = screen.getByTestId('event-card')
    const removeButton = screen.getByTestId('remove-button')

    const eventId = screen.getByText('1')
    const eventName = screen.getByText('Untold')

    expect(eventCard).toBeInTheDocument()
    expect(removeButton).toBeInTheDocument()
    expect(eventId).toBeInTheDocument()
    expect(eventName).toBeInTheDocument()
})

test('test user card remove method to be called', () => {
    const testEvent = new Event(
        1,
        'Untold',
        new Date('2011-06-06'),
        'Cluj-Napoca',
    )
    const mockRemoveMethod = vi.fn()

    render(
        <BrowserRouter>
            <EventCard givenEvent={testEvent} removeMethod={mockRemoveMethod} />
        </BrowserRouter>,
    )

    const eventCard = screen.getByTestId('event-card')
    const removeButton = screen.getByTestId('remove-button')
    fireEvent.click(removeButton)
    fireEvent.click(eventCard)

    expect(mockRemoveMethod.mock.calls.length).toBe(1)
    expect(mockedUseNavigate).toBeCalledWith('/editEvent/' + sha256('1'))
})

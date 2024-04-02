import '@testing-library/jest-dom'
import {fireEvent, render, screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import {expect, test, vi} from 'vitest'
import {EventContextProvider} from '../contexts/EventContext'
import {AddEventPage} from '../pages/Add Event Page/AddEventPage'

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

test('test add event page rendering', () => {
    render(
        <BrowserRouter>
            <AddEventPage />
        </BrowserRouter>,
    )

    const mainPageContainer = screen.getByTestId('main-page-container')
    const addEventButton = screen.getByTestId('button-test-id')

    expect(mainPageContainer).toBeInTheDocument()
    expect(addEventButton).toBeInTheDocument()
})

test('test add user page add button without form data', () => {
    window.alert = vi.fn()

    render(
        <BrowserRouter>
            <AddEventPage />
        </BrowserRouter>,
    )

    const addUserButton = screen.getByTestId('button-test-id')

    fireEvent.click(addUserButton)

    expect(mockedUseNavigate.mock.calls.length).toBe(0)
})

test('test add user page add button with form data', () => {
    window.alert = vi.fn()

    render(
        <EventContextProvider
            eventContext={{
                events: [],
                addEvent: vi.fn(),
                removeEvent: vi.fn(),
            }}
        >
            <BrowserRouter>
                <AddEventPage />
            </BrowserRouter>
        </EventContextProvider>,
    )

    const addUserButton = screen.getByTestId('button-test-id')

    const idFormInput = screen.getByLabelText('ID')
    const nameFormInput = screen.getByLabelText('Name')
    const dateFormInput = screen.getByLabelText('Date')
    const locationFormInput = screen.getByLabelText('Location')

    fireEvent.change(idFormInput, {
        target: {
            value: '1',
        },
    })
    fireEvent.change(nameFormInput, {
        target: {
            value: 'BSides Cluj',
        },
    })
    fireEvent.change(dateFormInput, {
        target: {
            value: '2024-02-02',
        },
    })
    fireEvent.change(locationFormInput, {
        target: {
            value: 'Cluj-Napoca',
        },
    })

    fireEvent.click(addUserButton)

    expect(mockedUseNavigate).toBeCalledWith('/')
})

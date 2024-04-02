import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import React from 'react'
import {expect, test} from 'vitest'
import {EventForm} from '../features/CRUD Operations/Event Form/EventForm'
import {Event} from '../models/Event'

test('testing rendering of user form without user', () => {
    let idInput = React.createRef<HTMLInputElement>()
    let nameInput = React.createRef<HTMLInputElement>()
    let dateInput = React.createRef<HTMLInputElement>()
    let locationInput = React.createRef<HTMLInputElement>()

    render(
        <EventForm
            idInput={idInput}
            nameInput={nameInput}
            dateInput={dateInput}
            locationInput={locationInput}
        />,
    )

    const renderedUserForm = screen.getByTestId('event-form')
    const idFormInput = screen.getByPlaceholderText('ID')
    const nameFormInput = screen.getByPlaceholderText('Name')
    const LocationFormLabel = screen.getByText('Location')

    expect(renderedUserForm).toBeInTheDocument()
    expect(idFormInput).toBeInTheDocument()
    expect(nameFormInput).toBeInTheDocument()

    expect(LocationFormLabel).toBeInTheDocument()
})

test('testing rendering of user form with user', () => {
    let idInput = React.createRef<HTMLInputElement>()
    let nameInput = React.createRef<HTMLInputElement>()
    let dateInput = React.createRef<HTMLInputElement>()
    let locationInput = React.createRef<HTMLInputElement>()

    let demoEvent = new Event(
        1,
        'Untold',
        new Date('2011-06-06'),
        'Cluj-Napoca',
    )

    render(
        <EventForm
            idInput={idInput}
            nameInput={nameInput}
            dateInput={dateInput}
            locationInput={locationInput}
            event={demoEvent}
        />,
    )

    const renderedEventForm = screen.getByTestId('event-form')
    const idFormInput = screen.getByDisplayValue('1')
    const nameFormInput = screen.getByDisplayValue('Untold')

    expect(renderedEventForm).toBeInTheDocument()
    expect(idFormInput).toBeInTheDocument()
    expect(nameFormInput).toBeInTheDocument()
})

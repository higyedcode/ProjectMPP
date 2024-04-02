import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import {expect, test} from 'vitest'
import {FormEntry} from '../features/CRUD Operations/Form Entry/FormEntry'

import React from 'react'

test('test form entry without default value', () => {
    const demoReference = React.createRef<HTMLInputElement>()

    render(
        <FormEntry
            label='test-label'
            placeholder='test-placeHolder'
            disabled={false}
            defaultValue=''
            ref={demoReference}
        />,
    )

    const element = screen.getByTestId('form-entry')
    expect(element).toBeInTheDocument()
})

test('test form entry with default value', () => {
    const demoReference = React.createRef<HTMLInputElement>()

    render(
        <FormEntry
            label='test-label'
            placeholder='test-placeHolder'
            disabled={false}
            defaultValue='test value'
            ref={demoReference}
        />,
    )

    const element = screen.getByTestId('form-entry')
    expect(element).toBeInTheDocument()
})

test('test form entry for disabled input', () => {
    const demoReference = React.createRef<HTMLInputElement>()

    render(
        <FormEntry
            label='test-label'
            placeholder='test-placeHolder'
            disabled={true}
            defaultValue='test value'
            ref={demoReference}
        />,
    )

    const element = screen.getByTestId('form-entry-input')
    expect(element).toBeDisabled()
})

test('test form entry for enabled input', () => {
    const demoReference = React.createRef<HTMLInputElement>()

    render(
        <FormEntry
            label='test-label'
            placeholder='test-placeHolder'
            disabled={false}
            defaultValue='test value'
            ref={demoReference}
        />,
    )

    const element = screen.getByTestId('form-entry-input')
    expect(element).toBeEnabled()
})

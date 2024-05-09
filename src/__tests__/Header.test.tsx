import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import {expect, test} from 'vitest'

import {BrowserRouter} from 'react-router-dom'
import {Header} from '../shared/components/header/Header'

test('test header', () => {
    render(
        <BrowserRouter>
            <Header entity={'Header'} />
        </BrowserRouter>,
    )

    const header = screen.getByTestId('header-test-id')
    expect(header).toBeInTheDocument()
})

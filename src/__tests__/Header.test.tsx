import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Header } from '../shared/components/header/Header';
import { BrowserRouter } from 'react-router-dom';

test('test header', () => {
    render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>,
    );

    const header = screen.getByTestId('header-test-id');
    expect(header).toBeInTheDocument();
});

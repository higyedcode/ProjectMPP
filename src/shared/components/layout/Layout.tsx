import {Footer} from '../footer/Footer'
import {Header} from '../header/Header'
import './Layout.css'

export function Layout({entity, children}: any) {
    return (
        <div className='layout-container' data-testid='layout-test-id'>
            <Header entity={entity} />

            {children}

            <Footer />
        </div>
    )
}

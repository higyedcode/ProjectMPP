import {Link} from 'react-router-dom'

import './Header.css'

const Header = () => {
    return (
        <div className='header' data-testid='header-test-id'>
            <nav className='navbar'>
                <Link to='/' className='link'>
                    <div className='title'>PlanAhead</div>
                </Link>

                <div className='links'>
                    <div>
                        <Link to='/' className='link'>
                            List Events
                        </Link>
                    </div>

                    <div>
                        <Link to='/addEvent' className='link'>
                            Add Event
                        </Link>
                    </div>
                    <div>
                        <Link to='/chart' className='link'>
                            Show Statistics
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export {Header}

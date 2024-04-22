import {Link} from 'react-router-dom'

import './Header.css'

const Header = ({entity}) => {
    return (
        <div className='header' data-testid='header-test-id'>
            <nav className='navbar'>
                <Link to='/' className='link'>
                    <div className='title'>PlanAhead</div>
                </Link>

                <div className='links'>
                    <div>
                        <Link
                            to={entity === 'Events' ? '/events' : '/'}
                            className='link'
                        >
                            List {entity}
                        </Link>
                    </div>

                    <div>
                        <Link
                            to={'/add' + entity.slice(0, -1)}
                            className='link'
                        >
                            Add {entity}
                        </Link>
                    </div>
                    {entity == 'Events' && (
                        <div>
                            <Link to='/chart' className='link'>
                                Show Statistics
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    )
}

export {Header}

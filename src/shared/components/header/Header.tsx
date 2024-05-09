import {jwtDecode} from 'jwt-decode'
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
                    {localStorage.getItem('token') && (
                        <div>
                            <Link to='/events' className='link'>
                                {
                                    (
                                        jwtDecode(
                                            localStorage.getItem('token')!,
                                        ) as any
                                    ).email
                                }
                            </Link>
                        </div>
                    )}

                    {localStorage.getItem('token') && (
                        <div>
                            <Link to='/?logout=1' className='link'>
                                Logout
                            </Link>
                        </div>
                    )}
                    {!localStorage.getItem('token') && (
                        <div>
                            <Link to='/login' className='link'>
                                Login
                            </Link>
                        </div>
                    )}

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
                            {entity == 'Events' ? 'Add Event' : 'Register'}
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

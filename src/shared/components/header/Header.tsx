import {jwtDecode} from 'jwt-decode'
import {Link} from 'react-router-dom'
import './Header.css'

const Header = ({entity}) => {
    let token = {
        hostId: 0,
        email: 'No user logged in',
        role: '',
    }
    if (localStorage.getItem('token') !== null) {
        console.log(localStorage.getItem('token'))
        token = jwtDecode(localStorage.getItem('token')!) as any
    }
    function logout() {
        console.log('Logout requested')
        localStorage.clear()
    }

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
                                {token.email + '  ' + token.role}
                            </Link>
                        </div>
                    )}

                    {localStorage.getItem('token') && (
                        <div>
                            <Link
                                to='/login'
                                className='link'
                                onClick={() => logout()}
                            >
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

                    {(token.role == 'ADMIN' || token.role == 'MANAGER') && (
                        <div>
                            <Link
                                to={'/add' + entity.slice(0, -1)}
                                className='link'
                            >
                                {entity == 'Events' ? 'Add Event' : 'Register'}
                            </Link>
                        </div>
                    )}

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

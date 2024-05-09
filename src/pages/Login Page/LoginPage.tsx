import {useContext, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {EventContext} from '../../contexts/EventContext'
import {HostContext} from '../../contexts/HostsContext'
import {OfflineContext} from '../../contexts/OfflineContext'
import {LoginForm} from '../../features/CRUD Operations/Login Form/LoginForm'
import {getHostByEmailAndPassword} from '../../services/HostService/HostService'
import {Button} from '../../shared/components/button/button'
import {Layout} from '../../shared/components/layout/Layout'
import './LoginPage.css'

function handleOnClick(
    emailInput: React.RefObject<HTMLInputElement>,
    passwordInput: React.RefObject<HTMLInputElement>,
) {
    if (!emailInput.current!.value || !passwordInput.current!.value)
        throw new Error('Empty fields detected!')

    const email: string = emailInput.current!.value,
        password: string = passwordInput.current!.value
    return {
        email: email,
        password: password,
    }
}

export default function LoginPage() {
    document.title = 'Login'

    const emailInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()
    const eventsContext = useContext(EventContext)!
    const offlineContext = useContext(OfflineContext)!
    const hostsContext = useContext(HostContext)!

    const handleOnClickWrapper = () => {
        const authObject = handleOnClick(emailInput, passwordInput)
        console.log(authObject)
        getHostByEmailAndPassword(authObject.email, authObject.password)
            .then((response) => {
                console.log(response)
                if (response === 'OK') {
                    navigate('/events')
                } else {
                    document.getElementsByClassName('error')[0].style.display =
                        'block'
                }
            })
            .catch((error) => {
                console.log('CAUGHT')
                console.log(error)
                navigate('/events')
            })
    }

    return (
        <Layout
            entity='Events'
            children={
                <div
                    className='main-page-container'
                    data-testid='main-page-container'
                >
                    <div className='main-title'>Login</div>
                    <div className='error'>
                        ☒ Invalid username or password ☒
                    </div>

                    <LoginForm
                        emailInput={emailInput}
                        passwordInput={passwordInput}
                    />

                    <Button
                        type='submit'
                        buttonMessage='Login'
                        className='form-button'
                        onclick={handleOnClickWrapper}
                    />
                </div>
            }
        ></Layout>
    )
}

import {useContext, useRef} from 'react'
import {AwesomeButton} from 'react-awesome-button'
import 'react-awesome-button/dist/styles.css'
import {useNavigate} from 'react-router-dom'
import {EventContext} from '../../contexts/EventContext'
import {HostContext} from '../../contexts/HostsContext'
import {OfflineContext} from '../../contexts/OfflineContext'
import {LoginForm} from '../../features/CRUD Operations/Login Form/LoginForm'
import {getHostByEmailAndPassword} from '../../services/HostService/HostService'
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
                    navigate('/')
                } else {
                    ;(
                        document.getElementsByClassName(
                            'error',
                        )[0] as HTMLElement
                    ).style.display = 'block'
                    // ;(
                    //     document.getElementsByClassName(
                    //         'main-title',
                    //     )[0] as HTMLElement
                    // ).style.display = 'none'
                }
            })
            .catch((error) => {
                console.log('CAUGHT')
                console.log(error)
                navigate('/events')
            })
    }
    const goToRegister = () => {
        navigate('/addHost')
    }

    return (
        <Layout
            entity='Events'
            children={
                <div
                    className='main-page-container'
                    data-testid='main-page-container'
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        className='welcomePanel'
                        style={{
                            backgroundImage:
                                "url('https://toplanahead.onrender.com/src/shared/components/header/planAhead.jpeg')",
                        }}
                    ></div>
                    <div className='error'>
                        ☒ Invalid username or password ☒
                    </div>
                    <div className='loginContainer'>
                        <div className='main-title'>Login</div>

                        <LoginForm
                            emailInput={emailInput}
                            passwordInput={passwordInput}
                        />

                        <div className='form-button-container'>
                            {/* <Button
                                type='submit'
                                buttonMessage='Login'
                                className='form-button'
                                onclick={handleOnClickWrapper}
                            />
                            <Button
                                type='button'
                                buttonMessage='Register'
                                className='register-button'
                                onclick={goToRegister}
                            /> */}
                            <AwesomeButton
                                type='primary'
                                className='form-button'
                                onPress={handleOnClickWrapper}
                            >
                                Login
                            </AwesomeButton>
                            <AwesomeButton
                                type='secondary'
                                size='medium'
                                className='register-button'
                                onPress={goToRegister}
                            >
                                Register
                            </AwesomeButton>
                        </div>
                    </div>
                </div>
            }
        ></Layout>
    )
}

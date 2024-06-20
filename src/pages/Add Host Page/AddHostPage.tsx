import {useContext, useRef} from 'react'
import {AwesomeButton} from 'react-awesome-button'
import {useNavigate} from 'react-router-dom'
import {EventContext} from '../../contexts/EventContext'
import {HostContext} from '../../contexts/HostsContext'
import {OfflineContext} from '../../contexts/OfflineContext'
import {HostForm} from '../../features/CRUD Operations/Host Form/HostForm'
import {addhost} from '../../services/HostService/HostService'
import {Layout} from '../../shared/components/layout/Layout'
import {HostJson} from '../../types/hostJson.types'
import './AddHostPage.css'

function handleOnClick(
    roleInput: React.RefObject<HTMLInputElement>,
    nameInput: React.RefObject<HTMLInputElement>,
    emailInput: React.RefObject<HTMLInputElement>,
    passwordInput: React.RefObject<HTMLInputElement>,
    bioInput: React.RefObject<HTMLInputElement>,
    orgInput: React.RefObject<HTMLInputElement>,
    linkInput: React.RefObject<HTMLInputElement>,
): HostJson {
    if (
        !nameInput.current!.value ||
        !emailInput.current!.value ||
        !passwordInput.current!.value ||
        !bioInput.current!.value ||
        !orgInput.current!.value ||
        !linkInput.current!.value ||
        !roleInput.current!.value
    )
        throw new Error('Empty fields detected!')

    const role: string = roleInput.current!.value,
        name: string = nameInput.current!.value,
        email: string = emailInput.current!.value,
        password: string = passwordInput.current!.value,
        bio: string = bioInput.current!.value,
        org: string = orgInput.current!.value,
        link: string = linkInput.current!.value
    return {
        name: name,
        email: email,
        password: password,
        bio: bio,
        organisation: org,
        socialMediaLink: link,
        role: role,
    }
}

export default function AddHostPage() {
    document.title = 'Add Host'

    const roleInput = useRef<HTMLInputElement>(null)
    const nameInput = useRef<HTMLInputElement>(null)
    const emailInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)
    const bioInput = useRef<HTMLInputElement>(null)
    const orgInput = useRef<HTMLInputElement>(null)
    const linkInput = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()
    const eventsContext = useContext(EventContext)!
    const offlineContext = useContext(OfflineContext)!
    const hostsContext = useContext(HostContext)!

    const handleOnClickWrapper = () => {
        try {
            const inputHost = handleOnClick(
                roleInput,
                nameInput,
                emailInput,
                passwordInput,
                bioInput,
                orgInput,
                linkInput,
            )
            console.log(inputHost)
            addhost(
                inputHost,
                !offlineContext.isOnline || !offlineContext.isServerOnline,
                offlineContext.offlineDB,
            ).then(() => navigate('/'))
            navigate('/')
        } catch (error) {
            alert(error)
        }
    }

    return (
        <Layout
            entity='Events'
            children={
                <div
                    className='main-page-container'
                    data-testid='main-page-container'
                    style={{width: '100%'}}
                >
                    <div className='main-title'>Sign Up</div>

                    <HostForm
                        nameInput={nameInput}
                        emailInput={emailInput}
                        passwordInput={passwordInput}
                        bioInput={bioInput}
                        orgInput={orgInput}
                        linkInput={linkInput}
                        roleInput={roleInput}
                        data-testid='event-form'
                        passwordHidden={false}
                    />

                    {/* <Button
                        type='submit'
                        buttonMessage='Add host'
                        className='form-button'
                        onclick={handleOnClickWrapper}
                    /> */}
                    <AwesomeButton
                        type='primary'
                        className='form-button'
                        onPress={handleOnClickWrapper}
                    >
                        Register
                    </AwesomeButton>
                </div>
            }
        ></Layout>
    )
}

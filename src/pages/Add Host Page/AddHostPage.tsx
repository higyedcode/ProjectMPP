import {useContext, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {EventContext} from '../../contexts/EventContext'
import {HostContext} from '../../contexts/HostsContext'
import {OfflineContext} from '../../contexts/OfflineContext'
import {HostForm} from '../../features/CRUD Operations/Host Form/HostForm'
import {addhost} from '../../services/HostService/HostService'
import {Button} from '../../shared/components/button/button'
import {Layout} from '../../shared/components/layout/Layout'
import {HostJson} from '../../types/hostJson.types'
import './AddHostPage.css'

function handleOnClick(
    idInput: React.RefObject<HTMLInputElement>,
    nameInput: React.RefObject<HTMLInputElement>,
    emailInput: React.RefObject<HTMLInputElement>,
    bioInput: React.RefObject<HTMLInputElement>,
    orgInput: React.RefObject<HTMLInputElement>,
    linkInput: React.RefObject<HTMLInputElement>,
): HostJson {
    if (
        !nameInput.current!.value ||
        !emailInput.current!.value ||
        !bioInput.current!.value ||
        !orgInput.current!.value ||
        !linkInput.current!.value
    )
        throw new Error('Empty fields detected!')

    const name: string = nameInput.current!.value,
        email: string = emailInput.current!.value,
        bio: string = bioInput.current!.value,
        org: string = orgInput.current!.value,
        link: string = linkInput.current!.value
    return {
        name: name,
        email: email,
        bio: bio,
        organisation: org,
        socialMediaLink: link,
    }
}

export default function AddHostPage() {
    document.title = 'Add Host'

    const idInput = useRef<HTMLInputElement>(null)
    const nameInput = useRef<HTMLInputElement>(null)
    const emailInput = useRef<HTMLInputElement>(null)
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
                idInput,
                nameInput,
                emailInput,
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
                >
                    <div className='main-title'>Add host</div>

                    <HostForm
                        idInput={idInput}
                        nameInput={nameInput}
                        emailInput={emailInput}
                        bioInput={bioInput}
                        orgInput={orgInput}
                        linkInput={linkInput}
                        data-testid='event-form'
                    />

                    <Button
                        type='submit'
                        buttonMessage='Add host'
                        className='form-button'
                        onclick={handleOnClickWrapper}
                    />
                </div>
            }
        ></Layout>
    )
}

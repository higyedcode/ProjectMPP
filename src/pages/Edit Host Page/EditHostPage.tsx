import {useContext, useEffect, useRef, useState} from 'react'
import {AwesomeButton} from 'react-awesome-button'
import {useNavigate, useParams} from 'react-router-dom'
import {EventContext} from '../../contexts/EventContext'
import {HostContext} from '../../contexts/HostsContext'
import {OfflineContext} from '../../contexts/OfflineContext'
import {HostForm} from '../../features/CRUD Operations/Host Form/HostForm'
import {Host} from '../../models/Host'
import {getHostById, updatehost} from '../../services/HostService/HostService'
import {Layout} from '../../shared/components/layout/Layout'
import LoadingPage from '../Loading Page/LoadingPage'
import './EditHostPage.css'

function handleOnClick(
    host: Host,
    roleInput: React.RefObject<HTMLInputElement>,
    nameInput: React.RefObject<HTMLInputElement>,
    emailInput: React.RefObject<HTMLInputElement>,
    passwordInput: React.RefObject<HTMLInputElement>,
    bioInput: React.RefObject<HTMLInputElement>,
    orgInput: React.RefObject<HTMLInputElement>,
    linkInput: React.RefObject<HTMLInputElement>,
) {
    if (
        !roleInput.current ||
        !nameInput.current ||
        !emailInput.current ||
        !bioInput.current ||
        !orgInput.current ||
        !linkInput.current
    )
        throw new Error('Input references are null!')

    if (
        !roleInput.current ||
        !nameInput.current!.value ||
        !emailInput.current!.value ||
        !bioInput.current!.value ||
        !orgInput.current!.value ||
        !linkInput.current!.value
    )
        throw new Error('Empty fields detected!')

    const role: string = roleInput.current!.value,
        name: string = nameInput.current!.value,
        email: string = emailInput.current!.value,
        bio: string = bioInput.current!.value,
        org: string = orgInput.current!.value,
        link: string = linkInput.current!.value
    return {
        role: role,
        name: name,
        email: email,
        bio: bio,
        organisation: org,
        socialMediaLink: link,
    }
}

export default function EditHostPage() {
    document.title = 'Edit Host'

    const roleInput = useRef<HTMLInputElement>(null)
    const idInput = useRef<HTMLInputElement>(null)
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

    //parameters from the URL

    const {id} = useParams()
    console.log(id)
    let [selectedHost, setSelectedHost] = useState<Host>(
        new Host(0, '', '', '', '', '', ''),
    )
    let [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        getHostById(
            id!.toString(),
            !offlineContext.isOnline || !offlineContext.isServerOnline,
            offlineContext.offlineDB,
        )
            .then((foundHost) => {
                console.log('FOUND: ' + foundHost!.toString())
                setSelectedHost(foundHost!)
                console.log(foundHost)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    useEffect(() => {
        console.log('CHANGED HOST: ' + selectedHost!.toString())
        if (isLoading) return
        if (!selectedHost) navigate('/')
    }, [selectedHost])

    const handleOnClickWrapper = () => {
        try {
            const newHost = handleOnClick(
                selectedHost!,
                roleInput,
                nameInput,
                emailInput,
                passwordInput,
                bioInput,
                orgInput,
                linkInput,
            )
            // eventsContext.removeEvent(newEvent.eventId)
            // eventsContext.addEvent(newEvent)

            updatehost(
                selectedHost.id.toString(),
                newHost,
                !offlineContext.isOnline || !offlineContext.isServerOnline,
                offlineContext.offlineDB,
            ).then(() => {
                navigate('/')
            })

            navigate('/')
        } catch (error) {
            alert(error)
        }
    }
    if (isLoading) return <LoadingPage />

    return (
        <Layout
            entity='Hosts'
            children={
                <div
                    className='main-page-container'
                    data-testid='main-page-container'
                    style={{width: '100%'}}
                >
                    <HostForm
                        roleInput={roleInput}
                        idInput={idInput}
                        nameInput={nameInput}
                        emailInput={emailInput}
                        passwordInput={passwordInput}
                        bioInput={bioInput}
                        orgInput={orgInput}
                        linkInput={linkInput}
                        host={selectedHost}
                        data-testid='event-form'
                        passwordHidden={true}
                    />

                    {/* <Button
                        type='submit'
                        buttonMessage='Edit host'
                        onclick={handleOnClickWrapper}
                    /> */}
                    <AwesomeButton
                        type='primary'
                        className='form-button'
                        onPress={handleOnClickWrapper}
                    >
                        Edit Host
                    </AwesomeButton>
                </div>
            }
        ></Layout>
    )
}

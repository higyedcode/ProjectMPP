import {useContext, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {EventContext} from '../../contexts/EventContext'
import {HostContext} from '../../contexts/HostsContext'
import {OfflineContext} from '../../contexts/OfflineContext'
import {EventForm} from '../../features/CRUD Operations/Event Form/EventForm'
import {addEvent} from '../../services/EventService/EventService'
import {getHostById} from '../../services/HostService/HostService'
import {Button} from '../../shared/components/button/button'
import {Layout} from '../../shared/components/layout/Layout'
import {EventJson} from '../../types/eventJson.types'
import './AddEventPage.css'

function handleOnClick(
    idInput: React.RefObject<HTMLInputElement>,
    nameInput: React.RefObject<HTMLInputElement>,
    dateInput: React.RefObject<HTMLInputElement>,
    locationInput: React.RefObject<HTMLInputElement>,
    hostId: number,
): EventJson {
    if (
        !nameInput.current!.value ||
        !dateInput.current!.value ||
        !locationInput.current!.value
    )
        throw new Error('Empty fields detected!')

    const eventName: string = nameInput.current!.value,
        eventDate: string = dateInput.current!.value,
        eventLocation: string = locationInput.current!.value,
        hostID: number = hostId
    return {
        eventName: eventName,
        eventDate: eventDate,
        eventLocation: eventLocation,
        hostId: hostID,
    }
}

export default function AddEventPage() {
    document.title = 'Add Event'

    const idInput = useRef<HTMLInputElement>(null)
    const nameInput = useRef<HTMLInputElement>(null)
    const dateInput = useRef<HTMLInputElement>(null)
    const locationInput = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()
    const eventsContext = useContext(EventContext)!
    const offlineContext = useContext(OfflineContext)!
    const hostsContext = useContext(HostContext)!

    const handleOnClickWrapper = () => {
        try {
            getHostById(
                eventsContext.hostId.toString(),
                !offlineContext.isOnline || !offlineContext.isServerOnline,
                offlineContext.offlineDB,
            ).then((host) => {
                const inputEvent = handleOnClick(
                    idInput,
                    nameInput,
                    dateInput,
                    locationInput,
                    host!.id,
                )
                console.log(inputEvent)
                addEvent(inputEvent).then(() => navigate('/events'))
                navigate('/events')
            })
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
                    <div className='main-title'>Add event</div>

                    <EventForm
                        idInput={idInput}
                        nameInput={nameInput}
                        dateInput={dateInput}
                        locationInput={locationInput}
                        data-testid='event-form'
                    />

                    <Button
                        type='submit'
                        buttonMessage='Add event'
                        className='form-button'
                        onclick={handleOnClickWrapper}
                    />
                </div>
            }
        ></Layout>
    )
}

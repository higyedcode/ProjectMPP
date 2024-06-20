import {useContext, useEffect, useRef, useState} from 'react'
import {AwesomeButton} from 'react-awesome-button'
import {useNavigate, useParams} from 'react-router-dom'
import {EventContext} from '../../contexts/EventContext'
import {EventForm} from '../../features/CRUD Operations/Event Form/EventForm'
import {Event} from '../../models/Event'
import {
    getEventById,
    updateEvent,
} from '../../services/EventService/EventService'
import {Layout} from '../../shared/components/layout/Layout'
import LoadingPage from '../Loading Page/LoadingPage'
import './EditEventPage.css'

function handleOnClick(
    event: Event,
    nameInput: React.RefObject<HTMLInputElement>,
    dateInput: React.RefObject<HTMLInputElement>,
    locationInput: React.RefObject<HTMLInputElement>,
    hostId: number,
) {
    if (!nameInput.current || !dateInput.current || !locationInput.current)
        throw new Error('Input references are null!')

    if (
        !nameInput.current!.value ||
        !dateInput.current!.value ||
        !locationInput.current!.value
    )
        throw new Error('Empty fields detected!')

    const eventId: string = event.eventId.toString(),
        eventName: string = nameInput.current.value,
        eventDate: string = dateInput.current.value,
        eventLocation: string = locationInput.current.value,
        hostID: number = hostId

    return {
        eventId: eventId,
        eventName: eventName,
        eventDate: eventDate,
        eventLocation: eventLocation,
        hostId: hostID,
    }
}

export default function EditEventPage() {
    document.title = 'Edit Event'

    const idInput = useRef<HTMLInputElement>(null)
    const nameInput = useRef<HTMLInputElement>(null)
    const dateInput = useRef<HTMLInputElement>(null)
    const locationInput = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()
    const eventsContext = useContext(EventContext)!

    //parameters from the URL

    const {id} = useParams()
    console.log(id)
    let [selectedEvent, setSelectedEvent] = useState<Event>(
        new Event(0, '', new Date(), ''),
    )
    let [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        getEventById(parseInt(id!))
            .then((foundEvent: Event) => {
                console.log('FOUND: ' + foundEvent.toString())
                setSelectedEvent(foundEvent)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    useEffect(() => {
        console.log('CHANGED EVENT: ' + selectedEvent!.toString())
        if (isLoading) return
        if (!selectedEvent) navigate('/')
    }, [selectedEvent])

    const handleOnClickWrapper = () => {
        try {
            const newEvent = handleOnClick(
                selectedEvent!,
                nameInput,
                dateInput,
                locationInput,
                eventsContext.hostId!,
            )
            // eventsContext.removeEvent(newEvent.eventId)
            // eventsContext.addEvent(newEvent)

            updateEvent(selectedEvent.eventId, newEvent).then(() => {
                navigate('/events')
            })

            navigate('/events')
        } catch (error) {
            alert(error)
        }
    }
    if (isLoading) return <LoadingPage />

    return (
        <Layout
            entity='Events'
            children={
                <div
                    className='main-page-container'
                    data-testid='main-page-container'
                    style={{width: '100%'}}
                >
                    <EventForm
                        idInput={idInput}
                        nameInput={nameInput}
                        dateInput={dateInput}
                        locationInput={locationInput}
                        event={selectedEvent}
                        data-testid='event-form'
                    />

                    {/* <Button
                        type='submit'
                        buttonMessage='Edit event'
                        onclick={handleOnClickWrapper}
                    /> */}
                    <AwesomeButton
                        type='primary'
                        className='form-button'
                        onPress={handleOnClickWrapper}
                    >
                        Edit Event
                    </AwesomeButton>
                </div>
            }
        ></Layout>
    )
}

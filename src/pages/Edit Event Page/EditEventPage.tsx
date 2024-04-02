import {useContext, useEffect, useRef} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {EventContext} from '../../contexts/EventContext'
import {EventForm} from '../../features/CRUD Operations/Event Form/EventForm'
import {Event} from '../../models/Event'
import {Button} from '../../shared/components/button/button'
import {Layout} from '../../shared/components/layout/Layout'
import './EditEventPage.css'
import { sha256 } from 'js-sha256'

function handleOnClick(
    idInput: React.RefObject<HTMLInputElement>,
    nameInput: React.RefObject<HTMLInputElement>,
    dateInput: React.RefObject<HTMLInputElement>,
    locationInput: React.RefObject<HTMLInputElement>,
) {
    if (
        !idInput.current ||
        !nameInput.current ||
        !dateInput.current ||
        !locationInput.current
    )
        throw new Error('Input references are null!')

    if (
        !idInput.current!.value ||
        !nameInput.current!.value ||
        !dateInput.current!.value ||
        !locationInput.current!.value
    )
        throw new Error('Empty fields detected!')

    const eventId: number = parseInt(idInput.current.value),
        eventName: string = nameInput.current.value,
        eventDate: Date = new Date(dateInput.current.value),
        location: string = nameInput.current.value

    return new Event(eventId, eventName, eventDate, location)
}

export function EditEventPage() {
    document.title = 'Edit Event'

    const idInput = useRef<HTMLInputElement>(null)
    const nameInput = useRef<HTMLInputElement>(null)
    const dateInput = useRef<HTMLInputElement>(null)
    const locationInput = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()
    const eventsContext = useContext(EventContext)!

    //parameters from the URL
    const {id} = useParams()
    console.log(useParams())
    

    const event = eventsContext.events.find(
        (event: Event) => sha256(event.eventId.toString()) === id,
    )

    if (!event) {
        useEffect(() => {console.log('NO EVENT FOUND')
        navigate('/')
        return
    })
        
    }

    const handleOnClickWrapper = () => {
        try {
            const newEvent = handleOnClick(
                idInput,
                nameInput,
                dateInput,
                locationInput,
            )
            eventsContext.removeEvent(newEvent.eventId)
            eventsContext.addEvent(newEvent)

            navigate('/')
        } catch (error) {
            alert(error)
        }
    }


    return (
        <Layout>
            <div
                className='main-page-container'
                data-testid='main-page-container'
            >
                <EventForm
                    idInput={idInput}
                    nameInput={nameInput}
                    dateInput={dateInput}
                    locationInput={locationInput}
                    event={event}
                    data-testid='event-form'
                />

                <Button
                    type='submit'
                    buttonMessage='Edit user'
                    onclick={handleOnClickWrapper}
                />
            </div>
        </Layout>
    )
}

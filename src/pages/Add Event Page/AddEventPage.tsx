import {useContext, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {EventContext} from '../../contexts/EventContext'
import {EventForm} from '../../features/CRUD Operations/Event Form/EventForm'
import {Event} from '../../models/Event'
import {Button} from '../../shared/components/button/button'
import {Layout} from '../../shared/components/layout/Layout'
import './AddEventPage.css'
import { addEvent } from '../../services/EventService/EventService'
import { EventJson } from '../../types/eventJson.types'

function handleOnClick(
    idInput: React.RefObject<HTMLInputElement>,
    nameInput: React.RefObject<HTMLInputElement>,
    dateInput: React.RefObject<HTMLInputElement>,
    locationInput: React.RefObject<HTMLInputElement>,
): EventJson {
    if (
        !nameInput.current!.value ||
        !dateInput.current!.value ||
        !locationInput.current!.value
    )
        throw new Error('Empty fields detected!')

    const eventName: string = nameInput.current!.value,
        eventDate: string = dateInput.current!.value,
        eventLocation: string = locationInput.current!.value

    return { eventName, eventDate, eventLocation };
}

export default function AddEventPage() {
    document.title = 'Add Event'

    const idInput = useRef<HTMLInputElement>(null)
    const nameInput = useRef<HTMLInputElement>(null)
    const dateInput = useRef<HTMLInputElement>(null)
    const locationInput = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()
    const eventsContext = useContext(EventContext)!

    

    const handleOnClickWrapper = () => {
        try {
            const inputEvent = handleOnClick(
                idInput,
                nameInput,
                dateInput,
                locationInput,
            )
            
            
            addEvent(inputEvent).then(
                () => navigate('/')
            );
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
        </Layout>
    )
}

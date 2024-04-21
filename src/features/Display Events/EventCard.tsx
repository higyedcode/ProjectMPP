import {useNavigate} from 'react-router-dom'
import {EventCardProps} from '../../types/EventCardProps.types'

import './EventCard.css'
import { sha256 } from 'js-sha256'

export function EventCard({givenEvent, removeMethod}: EventCardProps) {
    const navigate = useNavigate()

    const handleCardOnClick = () => {
        // console.log("GIVEN EVENT: " + givenEvent.toString())
        navigate('/editEvent/' + givenEvent.eventId)
    }

    return (
        <div
            className='card'
            data-testid='event-card'
            onClick={handleCardOnClick}
        >
            <button
                className='remove-button'
                data-testid='remove-button'
                onClick={(e) => {
                    e.stopPropagation()
                    removeMethod(givenEvent.eventId)
                }}
            >
                X
            </button>

            <div className='card-info' data-testid='card-info'>
                <div className='event-info'>
                    <div className='event-id' hidden>{givenEvent.eventId}</div>
                    <div className='name'>{givenEvent.eventName}</div>
                    <div className='date'>
                        {givenEvent.eventDate.toDateString()}
                    </div>
                    <div className='location'>
                        {givenEvent.eventLocation}
                    </div>
                </div>
            </div>
        </div>
    )
}

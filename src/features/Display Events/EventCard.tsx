import {useNavigate} from 'react-router-dom'
import {EventCardProps} from '../../types/EventCardProps.types'

import {jwtDecode} from 'jwt-decode'
import './EventCard.css'

export function EventCard({givenEvent, removeMethod}: EventCardProps) {
    const navigate = useNavigate()
    const token = jwtDecode(localStorage.getItem('token')!) as any

    const handleCardOnClick = () => {
        // console.log("GIVEN EVENT: " + givenEvent.toString())
        if (token.role === 'ADMIN' || token.role === 'MANAGER') {
            navigate('/editEvent/' + givenEvent.eventId)
        } else {
            alert('You do not have permission to edit this event')
        }
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
                    <div className='event-id' hidden>
                        {givenEvent.eventId}
                    </div>
                    <div className='name'>{givenEvent.eventName}</div>
                    <div className='date'>
                        {givenEvent.eventDate.toDateString()}
                    </div>
                    <div className='location'>{givenEvent.eventLocation}</div>
                </div>
            </div>
        </div>
    )
}

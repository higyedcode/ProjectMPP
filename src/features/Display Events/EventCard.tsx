import {useNavigate} from 'react-router-dom'
import {EventCardProps} from '../../types/EventCardProps.types'

import {jwtDecode} from 'jwt-decode'
import {useContext} from 'react'
import {AwesomeButton} from 'react-awesome-button'
import {OfflineContext} from '../../contexts/OfflineContext'
import {sendInvite} from '../../services/EventService/EventService'
import './EventCard.css'

export function EventCard({givenEvent, removeMethod, viewMap}: EventCardProps) {
    const navigate = useNavigate()
    const offlineContext = useContext(OfflineContext)!
    const token = jwtDecode(localStorage.getItem('token')!) as any

    const edit = () => {
        if (token.role === 'ADMIN' || token.role === 'MANAGER') {
            navigate('/editEvent/' + givenEvent.eventId)
        } else {
            alert('You do not have permission to edit this event')
            // console.log('You do not have permission to edit this event')
        }
    }

    const handleCardOnClick = () => {
        // console.log("GIVEN EVENT: " + givenEvent.toString())
        if (offlineContext.invitedHost !== null) {
            let eventJson = {
                eventName: givenEvent.eventName,
                eventDate:
                    givenEvent.eventDate.getFullYear() +
                    '-' +
                    givenEvent.eventDate
                        .getMonth()
                        .toString()
                        .padStart(2, '0') +
                    '-' +
                    givenEvent.eventDate.getDate().toString().padStart(2, '0'),
                eventLocation: givenEvent.eventLocation,
                hostId: 0,
            }
            try {
                sendInvite(eventJson, offlineContext.invitedHost.id)
                alert('Invite sent successfully!')
            } catch (e) {
                alert('An error occurred while sending the invite')
            }
            offlineContext.setInvitedHost(null)
            return
        }
    }

    return (
        // <div
        //     className='card'
        //     data-testid='event-card'
        //     onClick={handleCardOnClick}
        // >
        <AwesomeButton
            className='test'
            style={{
                '--button-large-width': '294px',
                '--button-large-height': '290px',
                '--button-horizontal-padding': '10px',
                '--button-default-border-radius': '20px',
                '--button-secondary-border': 'white',
                '--button-secondary-color-dark': '#6cc2ff',
                margin: '20px',
                display: 'flex',
                'flex-direction': 'column',
                'z-index': 0,
            }}
            type='secondary'
            size='large'
            onPress={handleCardOnClick}
        >
            <div className='awsContainer'>
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
                        <div className='location'>
                            {givenEvent.eventLocation}
                        </div>
                    </div>
                </div>
                <button
                    className='mapBtn'
                    onClick={() => viewMap(givenEvent.eventLocation)}
                >
                    View Map Location
                </button>
                <button className='mapBtn' onClick={() => edit()}>
                    Edit
                </button>
            </div>
        </AwesomeButton>
    )
}

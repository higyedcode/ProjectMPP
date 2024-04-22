import {useNavigate} from 'react-router-dom'

import {useContext} from 'react'
import {EventContext} from '../../contexts/EventContext'
import {HostCardProps} from '../../types/HostCardProps.types'
import './HostCard.css'

export default function HostCard({givenHost, removeMethod}: HostCardProps) {
    const navigate = useNavigate()
    const eventContext = useContext(EventContext)!

    const handleCardOnClick = () => {
        // console.log("GIVEN host: " + givenEvent.toString())
        eventContext.setHostId(givenHost.id)

        navigate('/events')
    }

    const handleCardOnDoubleClick = () => {
        navigate('/editHost/' + givenHost.id)
    }
    return (
        <div
            className='card'
            data-testid='host-card'
            onClick={handleCardOnClick}
            onContextMenu={handleCardOnDoubleClick}
        >
            <button
                className='remove-button'
                data-testid='remove-button'
                onClick={(e) => {
                    e.stopPropagation()
                    removeMethod(givenHost.id)
                }}
            >
                X
            </button>

            <div className='card-info' data-testid='card-info'>
                <div className='host-info'>
                    <div className='host-id' hidden>
                        {givenHost.id}
                    </div>
                    <div className='name'>{givenHost.name}</div>
                    <div className='org'>{givenHost.org}</div>
                    <div className='email'>{givenHost.email}</div>
                    <div className='bio'>{givenHost.bio}</div>
                    <div className='link'>{givenHost.link}</div>
                </div>
            </div>
        </div>
    )
}

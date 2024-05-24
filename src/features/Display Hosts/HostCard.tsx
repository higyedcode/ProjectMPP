import {useNavigate} from 'react-router-dom'

import {jwtDecode} from 'jwt-decode'
import {useContext, useEffect, useState} from 'react'
import {EventContext} from '../../contexts/EventContext'
import {getNrEventsByHostId} from '../../services/HostService/HostService'
import {HostCardProps} from '../../types/HostCardProps.types'
import './HostCard.css'

export default function HostCard({givenHost, removeMethod}: HostCardProps) {
    const navigate = useNavigate()
    const eventContext = useContext(EventContext)!
    const [nrEvents, setNrEvents] = useState<number>(0)
    const token = jwtDecode(localStorage.getItem('token')!) as any

    const handleCardOnClick = () => {
        if (
            token.role === 'ADMIN' ||
            token.role === 'MANAGER' ||
            givenHost.id === token.hostId
        ) {
            eventContext.setHostId(givenHost.id)
            navigate('/events')
        }
        // navigate('/events')
    }
    useEffect(() => {
        getNrEventsByHostId(givenHost.id).then((nrEvents) => {
            setNrEvents(nrEvents)
        })
    }, [])

    const handleCardOnDoubleClick = () => {
        if (token.role === 'ADMIN' || token.role === 'MANAGER') {
            navigate('/editHost/' + givenHost.id)
        } else {
            alert('You do not have permission to edit this host')
        }
    }
    return (
        <div
            className='card'
            data-testid='host-card'

            //onContextMenu={handleCardOnDoubleClick}
            //onDoubleClick={handleCardOnDoubleClick}
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

            <div
                className='card-info'
                data-testid='card-info'
                onClick={handleCardOnClick}
            >
                <div className='host-info'>
                    <div className='host-id' hidden>
                        {givenHost.id}
                    </div>
                    <div className='name'>{givenHost.name}</div>
                    <div className='org'>{givenHost.org}</div>
                    <div className='email'>{givenHost.email}</div>
                    <div className='bio'>{givenHost.bio}</div>
                    <div className='link'>{givenHost.link}</div>
                    <div className='nrEvents'>{nrEvents}</div>
                </div>
            </div>
            <button
                className='editBtn'
                onClick={() => handleCardOnDoubleClick()}
            >
                Edit
            </button>
        </div>
    )
}

import {useNavigate} from 'react-router-dom'

import {jwtDecode} from 'jwt-decode'
import {useContext, useEffect, useState} from 'react'
import {AwesomeButton} from 'react-awesome-button'
import {EventContext} from '../../contexts/EventContext'
import {OfflineContext} from '../../contexts/OfflineContext'
import {getNrEventsByHostId} from '../../services/HostService/HostService'
import {HostCardProps} from '../../types/HostCardProps.types'
import './HostCard.css'

export default function HostCard({givenHost, removeMethod}: HostCardProps) {
    const navigate = useNavigate()
    const eventContext = useContext(EventContext)!
    const offlineContext = useContext(OfflineContext)!
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

    const invite = () => {
        let token = jwtDecode(localStorage.getItem('token')!) as any
        let loggedInHostId = token.hostId
        eventContext.setHostId(loggedInHostId)
        offlineContext.setInvitedHost(givenHost)
        navigate('/events')
    }
    return (
        // <div
        //     className='card'
        //     data-testid='host-card'

        //     //onContextMenu={handleCardOnDoubleClick}
        //     //onDoubleClick={handleCardOnDoubleClick}
        // >
        <AwesomeButton
            className='test'
            style={{
                '--button-large-width': '294px',
                '--button-large-height': '290px',
                '--button-horizontal-padding': '100px',
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
        >
            <div className='awsContainer'>
                <button
                    className='invite-button'
                    data-testid='invite-button'
                    onClick={() => invite()}
                >
                    ✉
                </button>
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
            {/* </div> */}
        </AwesomeButton>
    )
}

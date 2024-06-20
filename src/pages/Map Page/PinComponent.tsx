import React from 'react'
import {Event} from '../../models/Event'
import './Pin.css'

interface PinProps {
    lat: number
    lng: number
    text: string
    onClick?: (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>,
        props: {lat: number; lng: number; markerId: string},
    ) => void
}

const PinComponent: React.FC<PinProps> = ({text}) => {
    let event = new Event(1, 'Test Event', new Date(), 'Oradea')
    function removeMethod() {
        console.log('Remove method')
    }
    return (
        <div className='pin'>
            {/* <EventCard givenEvent={event} removeMethod={removeMethod} /> */}
            <div className='pin-icon'></div>
        </div>
        // <div
        //     // style={{
        //     //     color: 'white',
        //     //     background: 'grey',
        //     //     padding: '15px 10px',
        //     //     display: 'inline-flex',
        //     //     textAlign: 'center',
        //     //     alignItems: 'center',
        //     //     justifyContent: 'center',
        //     //     borderRadius: '100%',
        //     //     transform: 'translate(-50%, -50%)',
        //     // }}
        //     style={{
        //         color: 'white',
        //         position: 'absolute',
        //         top: '100%',
        //         left: '50%',
        //         height: '24px',
        //         width: '24px',
        //         transform: 'translate(-50%, -100%)',
        //     }}
        // >
        //     {text}
        // </div>
    )
}

export default PinComponent

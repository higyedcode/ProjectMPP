import {useRef, useState} from 'react'
import {AwesomeButton} from 'react-awesome-button'
import 'react-awesome-button/dist/styles.css'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import {useLocation} from 'react-router-dom'
import {
    getEventById,
    sendTicket,
} from '../../services/EventService/EventService'
import {Layout} from '../../shared/components/layout/Layout'
import './Checkout.css'

export default function Checkout() {
    const [state, setState] = useState({
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    })
    const numberRef = useRef(null)
    const nameRef = useRef(null)
    const expiryRef = useRef(null)
    const cvcRef = useRef(null)
    const location = useLocation()

    // Create a URLSearchParams object from the query string
    const queryParams = new URLSearchParams(location.search)

    // Retrieve specific query parameters
    const hostId = queryParams.get('hostId')
    const eventId = queryParams.get('eventId')

    const handleInputFocus = (e) => {
        setState((prevState) => ({...prevState, focus: e.target.name}))
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setState((prevState) => ({...prevState, [name]: value}))
    }

    const handleKeyDown = (e, nextRef) => {
        if (e.key === 'Enter') {
            // alert(1)
            e.preventDefault()
            if (nextRef && nextRef.current) {
                nextRef.current.focus()
            }
        }
    }
    const sendEmailTicket = async () => {
        let givenEvent = await getEventById(parseInt(eventId))

        let eventJson = {
            eventName: givenEvent.eventName,
            eventDate:
                givenEvent.eventDate.getFullYear() +
                '-' +
                givenEvent.eventDate.getMonth().toString().padStart(2, '0') +
                '-' +
                givenEvent.eventDate.getDate().toString().padStart(2, '0'),
            eventLocation: givenEvent.eventLocation,
            hostId: 0,
        }
        try {
            sendTicket(eventJson, parseInt(hostId))
            alert('Ticket sent successfully!')
        } catch (e) {
            alert('An error occurred while sending the ticket')
        }
    }

    return (
        <Layout entity='Events'>
            <div id='PaymentForm'>
                <h1>Enter your payment details</h1>
                <br />
                <div className='horizontal'>
                    <Cards
                        cvc={state.cvc}
                        expiry={state.expiry}
                        focused={state.focus}
                        name={state.name}
                        number={state.number}
                    />

                    <form className='form'>
                        <input
                            className='wideInput'
                            type='tel'
                            name='number'
                            placeholder='49** (Visa) or 51** (MasterCard) or 34** (American)'
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            onKeyDown={(e) => handleKeyDown(e, nameRef)}
                            ref={numberRef}
                        />

                        <input
                            className='wideInput'
                            type='text'
                            name='name'
                            placeholder='Name'
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            onKeyDown={(e) => handleKeyDown(e, expiryRef)}
                            ref={nameRef}
                        />
                        <input
                            className='wideInput'
                            type='tel'
                            name='expiry'
                            placeholder='Expiry'
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            onKeyDown={(e) => handleKeyDown(e, cvcRef)}
                            ref={expiryRef}
                        />
                        <input
                            className='wideInput'
                            type='tel'
                            name='cvc'
                            placeholder='CVC'
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            ref={cvcRef}
                        />
                    </form>
                </div>
                <AwesomeButton
                    type='primary'
                    className='form-button'
                    size='large'
                    onPress={() => sendEmailTicket()}
                    style={{
                        '--button-large-width': '294px',
                        '--button-large-height': '50px',
                        '--button-horizontal-padding': '10px',
                        '--button-default-border-radius': '5px',
                        'margin-top': '50px',
                    }}
                >
                    Complete Payment
                </AwesomeButton>
            </div>
        </Layout>
    )
}

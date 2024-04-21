import {Event} from '../../../models/Event'
import {EventFormType} from '../../../types/EventFormProps.types'
import {FormEntry} from '../Form Entry/FormEntry'
import './EventForm.css'

type FormEntryType = {
    label: string
    ref: React.RefObject<HTMLInputElement>
    placeHolder: string
    defaultValue: string
    disabled: boolean
}

function setFormEntriesForEvent(
    formEntries: FormEntryType[],
    event: Event | undefined,
) {
   
    if (event !== undefined) {
        // console.log("NOT UNDEFINED")
        // console.log("SETTIING IT: " + event!.eventDate.getFullYear() ) 
        formEntries[0].disabled = true
        formEntries[0].defaultValue = event!.eventId
        formEntries[1].defaultValue = event!.eventName
        // formEntries[2].defaultValue = event!.eventDate
        //     .toISOString()
        //     .split('T')[0]
        formEntries[2].defaultValue = event!.eventDate.getFullYear() + "-" + (event!.eventDate.getMonth() + 1).toString().padStart(2,"0") + "-" + event!.eventDate.getDate().toString().padStart(2,"0") ;
        formEntries[3].defaultValue = event!.eventLocation
       
        

    }
    return formEntries
}

function createFormEntries(props: EventFormType) {
    let formEntries = [
        {
            label: 'ID',
            ref: props.idInput,
            placeHolder: 'ID',
            defaultValue: '',
            disabled: true,
        },
        {
            label: 'Name',
            ref: props.nameInput,
            placeHolder: 'Name',
            defaultValue: '',
            disabled: false,
        },
        {
            label: 'Date',
            ref: props.dateInput,
            placeHolder: 'Date',
            defaultValue: '',
            disabled: false,
        },
        {
            label: 'Location',
            ref: props.locationInput,
            placeHolder: 'Location',
            defaultValue: '',
            disabled: false,
        },
    ]

    formEntries = setFormEntriesForEvent(formEntries, props.event)
    return formEntries
}

export function EventForm(props: EventFormType) {
    const formEntries = createFormEntries(props)
    // console.log("HEREEEE");

    return (
        <div className='form-div' data-testid='event-form'>
            <form className='user-form'>
                {formEntries.map((entry) => (
                    <FormEntry
                        key={entry.label}
                        ref={entry.ref}
                        label={entry.placeHolder}
                        placeholder={entry.placeHolder}
                        defaultValue={entry.defaultValue}
                        disabled={entry.disabled}
                    />
                ))}
            </form>
        </div>
    )
}

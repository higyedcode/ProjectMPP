import {Host} from '../../../models/Host'
import {HostFormType} from '../../../types/HostFormProps.types'
import {FormEntry} from '../Form Entry/FormEntry'
import './HostForm.css'

type FormEntryType = {
    label: string
    ref: React.RefObject<HTMLInputElement>
    placeHolder: string
    defaultValue: string
    disabled: boolean
}

function setFormEntriesForHost(
    formEntries: FormEntryType[],
    host: Host | undefined,
) {
    if (host !== undefined) {
        // console.log("NOT UNDEFINED")
        // console.log("SETTIING IT: " + event!.eventDate.getFullYear() )
        formEntries[0].disabled = true
        formEntries[0].defaultValue = host!.id.toString()
        formEntries[1].defaultValue = host!.name
        // formEntries[2].defaultValue = event!.eventDate
        //     .toISOString()
        //     .split('T')[0]
        formEntries[2].defaultValue = host!.email
        formEntries[3].defaultValue = host!.bio
        formEntries[4].defaultValue = host!.org
        formEntries[5].defaultValue = host!.link
    }
    return formEntries
}

function createFormEntries(props: HostFormType) {
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
            label: 'Email',
            ref: props.emailInput,
            placeHolder: 'Email',
            defaultValue: '',
            disabled: false,
        },
        {
            label: 'Password',
            ref: props.passwordInput,
            placeHolder: 'Password',
            defaultValue: '',
            disabled: false,
        },
        {
            label: 'Bio',
            ref: props.bioInput,
            placeHolder: 'About you...',
            defaultValue: '',
            disabled: false,
        },
        {
            label: 'Organisation',
            ref: props.orgInput,
            placeHolder: 'Organisation',
            defaultValue: '',
            disabled: false,
        },
        {
            label: 'Link',
            ref: props.linkInput,
            placeHolder: 'Social Media Link',
            defaultValue: '',
            disabled: false,
        },
    ]

    formEntries = setFormEntriesForHost(formEntries, props.host)
    return formEntries
}

export function HostForm(props: HostFormType) {
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

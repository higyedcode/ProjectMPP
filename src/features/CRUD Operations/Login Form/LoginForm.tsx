import {LoginFormType} from '../../../types/LoginFormProps.types'
import {FormEntry} from '../Form Entry/FormEntry'
import './LoginForm.css'

function createFormEntries(props: LoginFormType) {
    let formEntries = [
        {
            label: 'email',
            ref: props.emailInput,
            placeHolder: 'Email',
            defaultValue: '',
            disabled: false,
        },
        {
            label: 'password',
            ref: props.passwordInput,
            placeHolder: 'Password',
            defaultValue: '',
            disabled: false,
        },
    ]

    return formEntries
}

export function LoginForm(props: LoginFormType) {
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

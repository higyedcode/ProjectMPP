import {ButtonProps} from '../../../types/ButtonProps.types'
import './button.css'

export function Button(props: ButtonProps) {
    return (
        <button
            type={props.type}
            className={'button ' + (props.className ? props.className : '')}
            onClick={props.onclick}
            data-testid='button-test-id'
        >
            {props.buttonMessage}
        </button>
    )
}

import {forwardRef} from 'react'
import {FormEntryProps} from '../../../types/FormEntryProps.types'
import './FormEntry.css'

// export function setDate(props: any, e: any){
//     e.target.type = 'date';
//     e.target.value = props.defaultValue.split('T')[0]
//     console.log(props.defaultValue.split('T')[0])

// }

const FormEntry = forwardRef<HTMLInputElement, FormEntryProps>((props, ref) => {
//    console.log("DEFAULT" + props.defaultValue)
    
    return (
        <div className='form-entry' data-testid='form-entry'>
            <label htmlFor={props.label} className='form-label'>
                {props.label}
            </label>
            {
            props.defaultValue === '' ? (
                <input
                    data-testid='form-entry-input'
                    // type={props.label === 'Date' ? 'date':'text'}
                    type='text'
                    className='form-input'
                    id={props.label}
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    ref={ref}
                    onFocus={(e) => (props.label === 'Date'? e.target.type='date' : e.target.type = 'text')}
                    
                />
            ) : (
                <input
                    data-testid='form-entry-input'
                    // type={props.label === 'Date' ? 'date':'text'}
                    type = 'text'
                    className='form-input'
                    defaultValue={props.defaultValue}
                    placeholder={props.defaultValue}
                    disabled={props.disabled}
                    ref={ref}
                    onFocus={(e) => (props.label === 'Date'? e.target.type='date' : e.target.type = 'text')}
                
                />
            )}
        </div>
    )
})

export {FormEntry}

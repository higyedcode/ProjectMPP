import {Event} from '../models/Event'

export type EventFormType = {
    idInput: React.RefObject<HTMLInputElement>
    nameInput: React.RefObject<HTMLInputElement>
    dateInput: React.RefObject<HTMLInputElement>
    locationInput: React.RefObject<HTMLInputElement>
    event?: Event
}

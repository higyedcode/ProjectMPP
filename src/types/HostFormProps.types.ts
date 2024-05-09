import {Host} from '../models/Host'

export type HostFormType = {
    idInput: React.RefObject<HTMLInputElement>
    nameInput: React.RefObject<HTMLInputElement>
    emailInput: React.RefObject<HTMLInputElement>
    passwordInput: React.RefObject<HTMLInputElement>
    bioInput: React.RefObject<HTMLInputElement>
    orgInput: React.RefObject<HTMLInputElement>
    linkInput: React.RefObject<HTMLInputElement>
    host?: Host
}

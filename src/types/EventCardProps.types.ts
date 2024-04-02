import {Event} from '../models/Event'

export type EventCardProps = {
    givenEvent: Event
    removeMethod: (_eventId: number) => void
}

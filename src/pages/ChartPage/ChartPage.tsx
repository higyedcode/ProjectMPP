import {BarChart} from '@mui/x-charts'
import {useContext} from 'react'
import {EventContext} from '../../contexts/EventContext'
import {Event} from '../../models/Event'
import {Header} from '../../shared/components/header/Header'
import './ChartPage.css'

const ChartPage = () => {
    // Convert events data to a format suitable for the pie chart
    const eventsContext = useContext(EventContext)!
    let eventsInitial: Event[] = eventsContext.events

    const eventsMap: Map<string, number> = eventsInitial.reduce(
        (acc, event) => {
            // Extract the date from the event
            const date = event.eventDate

            // If the date is already in the map, increment the count, otherwise initialize it to 1
            if (acc.has(date.toDateString())) {
                acc.set(date.toDateString(), acc.get(date.toDateString())! + 1)
            } else {
                acc.set(date.toDateString(), 1)
            }

            return acc
        },
        new Map<string, number>(),
    )

    return (
        <div>
            <Header />
            <div className='pie-chart-container'>
                <BarChart
                    xAxis={[
                        {
                            id: 'barCategories',
                            data: [...eventsMap.keys()],
                            scaleType: 'band',
                        },
                    ]}
                    series={[
                        {
                            data: [...eventsMap.values()],
                        },
                    ]}
                    width={500}
                    height={300}
                />
            </div>
        </div>
    )
}

export default ChartPage

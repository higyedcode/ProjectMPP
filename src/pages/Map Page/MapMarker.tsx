import GoogleMap, {
    LatLngBounds,
    MapContextProps,
} from 'google-maps-react-markers'
import {useEffect, useRef, useState} from 'react'
import Marker from './Marker'
// import coordinates from './coordinates'
import {getEventLocationCoordinates} from '../../services/EventService/EventService'
import mapOptions from './map-options.json'
import styles from './page.module.css'

export default function MapMarker({
    selectedLocation,
}: {
    selectedLocation: string
}) {
    const mapRef = useRef<any>(null)
    const [mapReady, setMapReady] = useState<boolean>(false)
    const [defaultCenter, setDefaultCenter] = useState<{
        lat: number
        lng: number
    }>({
        lat: 47.0549163,
        lng: 21.9285231,
    })
    const [mapBounds, setMapBounds] = useState<{
        bounds: number[]
        zoom: number
    }>({bounds: [], zoom: 0})
    const [usedCoordinates, setUsedCoordinates] = useState<number>(0)
    const [allCoordinates, setAllCoordinates] = useState<any>([])
    const [currCoordinates, setCurrCoordinates] = useState(
        allCoordinates[usedCoordinates],
    )
    const [highlighted, setHighlighted] = useState<string | null>(null)

    const [dragStart, setDragStart] = useState<{
        lat: number
        lng: number
    } | null>(null)
    const [dragEnd, setDragEnd] = useState<{lat: number; lng: number} | null>(
        null,
    )
    const [dragging, setDragging] = useState<{lat: number; lng: number} | null>(
        null,
    )

    /**
     * @description This function is called when the map is ready
     * @param {Object} map - reference to the map instance
     * @param {Object} maps - reference to the maps library
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onGoogleApiLoaded = ({
        map,
        maps,
    }: {
        map: MapContextProps['map']
        maps: MapContextProps['maps']
    }) => {
        mapRef.current = map
        setMapReady(true)
    }

    const onMarkerClick = (
        e: any,
        {
            markerId /* , lat, lng */,
        }: {lat: number; lng: number; markerId: string},
    ) => {
        setHighlighted(markerId)
    }

    const onMapChange = ({
        bounds,
        zoom,
    }: {
        bounds: LatLngBounds
        zoom: number
    }) => {
        const ne = bounds.getNorthEast()
        const sw = bounds.getSouthWest()
        /**
         * useSupercluster accepts bounds in the form of [westLng, southLat, eastLng, northLat]
         * const { clusters, supercluster } = useSupercluster({
         *	points: points,
         *	bounds: mapBounds.bounds,
         *	zoom: mapBounds.zoom,
         * })
         */
        setMapBounds({
            ...mapBounds,
            bounds: [sw.lng(), sw.lat(), ne.lng(), ne.lat()],
            zoom,
        })
        setHighlighted(null)
    }

    const updateCoordinates = () => {
        setUsedCoordinates(!usedCoordinates ? 1 : 0)
        // reset drag
        setDragStart(null)
        setDragEnd(null)
        setDragging(null)
    }

    useEffect(() => {
        getEventLocationCoordinates(selectedLocation)
            .then((data) => {
                setAllCoordinates([[data]])
                // setCurrCoordinates(data)
                console.log('COORDINATE DATA')
                console.log(data)
                console.log('----------------------------')
            })
            .catch((error) => {
                console.log(error)
            })
    }, [selectedLocation])

    useEffect(() => {
        setCurrCoordinates(allCoordinates[usedCoordinates])

        console.log('CRRRD')
        console.log(allCoordinates)
    }, [allCoordinates])

    return (
        <main className={styles.main}>
            <div className={styles.mapContainer}>
                <GoogleMap
                    key={`${currCoordinates ? currCoordinates[0].lat : 47.0549163}-${currCoordinates ? currCoordinates[0].lng : 21.9285231}`}
                    apiKey={''}
                    defaultCenter={{
                        lat: currCoordinates
                            ? currCoordinates[0].lat
                            : 47.0549163,
                        lng: currCoordinates
                            ? currCoordinates[0].lng
                            : 21.9285231,
                    }}
                    defaultZoom={5}
                    options={mapOptions}
                    mapMinHeight='80vh'
                    onGoogleApiLoaded={onGoogleApiLoaded}
                    onChange={onMapChange}
                >
                    {currCoordinates &&
                        console.log(defaultCenter) == null &&
                        currCoordinates.map(({lat, lng, name}, index) => (
                            <Marker
                                // eslint-disable-next-line react/no-array-index-key
                                key={index}
                                lat={lat}
                                lng={lng}
                                markerId={name}
                                onClick={onMarkerClick}
                                className={styles.marker}
                                draggable={index === 0}
                                onDrag={(e, {latLng}) =>
                                    setDragging({
                                        lat: latLng.lat,
                                        lng: latLng.lng,
                                    })
                                }
                                onDragStart={(e, {latLng}) =>
                                    setDragStart({
                                        lat: latLng.lat,
                                        lng: latLng.lng,
                                    })
                                }
                                onDragEnd={(e, {latLng}) =>
                                    setDragEnd({
                                        lat: latLng.lat,
                                        lng: latLng.lng,
                                    })
                                }
                                // zIndex={highlighted === name ? 1000 : 0}
                            />
                        ))}
                </GoogleMap>
                {highlighted && (
                    <div className={styles.highlighted}>
                        {highlighted}
                        <button
                            type='button'
                            onClick={() => setHighlighted(null)}
                        >
                            X
                        </button>
                    </div>
                )}
            </div>
        </main>
    )
}

// React imports
import { useState } from 'react';

// App imports
import { Layers } from './layers';
import { Geolocate } from './geolocate';

// Context imports
import { useGeo } from 'context/geo';
import { useMarkers } from 'context/data/markers';

// Third-party imports
import { Map } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

export const MapContainer = () => {
	const { viewport, mapRef, mapStyle } = useGeo();
	const { addMarker } = useMarkers();

	const [ isMapLoaded, setIsMapLoaded ] = useState(false);	
	
	return (
		<Map
			ref={mapRef}
			initialViewState={viewport}
			mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
			mapStyle={mapStyle}
			onLoad={() => setIsMapLoaded(true)}
			onClick={(event: any) => addMarker(event)}
		>
			{isMapLoaded && 
				<>
					<Layers/>
					<Geolocate/>
				</>
			}
		</Map>
	)
}

MapContainer.displayName="MapContainer";
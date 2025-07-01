// React imports
import { useState } from 'react';

// App imports
import './styles.scss';

// Context imports
import { useGeo } from 'context/geo';

// Third party imports
import { GeolocateControl } from 'react-map-gl/mapbox';

export const Geolocate = () => {
	const { setViewport } = useGeo();

	const [ activeTooltip, setActiveTooltip ] = useState<any>(null);

	return (
		<GeolocateControl
			showAccuracyCircle={false} 
			showUserLocation={false}
			positionOptions={{enableHighAccuracy: true}}
			position="bottom-right"
			onGeolocate={(e: any) => {
				const { longitude, latitude } = e.coords;
				setViewport({ longitude, latitude })
			}}
		/>
	)
}

Geolocate.displayName="Geolocate";
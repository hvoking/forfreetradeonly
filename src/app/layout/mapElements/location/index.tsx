// App imports
import './styles.scss';

// Context imports
import { useMapboxReverseApi } from 'context/api/mapbox/reverse';

export const Location = () => {
	const { mapboxReverseData } = useMapboxReverseApi();

	if (!mapboxReverseData) return <></>;

	const features = mapboxReverseData.features;

	const city = features[5]?.place_name;

	return (
		<div className="map-location">
			{city}
		</div>
	)
}

Location.displayName="Location";
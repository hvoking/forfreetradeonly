// App imports
import './styles.scss';

// Context imports
import { useReverseGeocodingApi } from 'context/api/google/reverse';

export const Location = () => {
	const { placeInfo } = useReverseGeocodingApi();

	if (!placeInfo) return <></>;

	return (
		<div className="map-location">
			{placeInfo}
		</div>
	)
}

Location.displayName="Location";
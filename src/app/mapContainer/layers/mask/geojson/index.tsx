// App imports
import { Lines } from './lines';

// Context imports
import { useMarkers } from 'context/data/markers';

export const Geojson = ({ boundary, marker }: any) => {
	const { providers } = useMarkers();

	if (!boundary) return <></>;
	
	const currentProvider = providers.find((item: any) => item.name === marker.name);

	return (	
		<Lines 
			boundary={boundary} 
			source={currentProvider.source}
			markerId={marker.id}
		/>
	)
}

Geojson.displayName="Geojson";
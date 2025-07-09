// App imports
import { Lines } from './lines';

export const Geojson = ({ boundary, marker }: any) => {
	if (!boundary) return <></>;

	return (	
		<Lines 
			boundary={boundary} 
			source={'composite'}
			markerId={marker.id}
		/>
	)
}

Geojson.displayName="Geojson";
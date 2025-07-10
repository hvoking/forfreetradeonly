// App imports
import { Lines } from './lines';

export const Geometry = ({ boundary, marker }: any) => {
	if (!boundary) return <></>;

	return (	
		<Lines 
			boundary={boundary} 
			markerId={marker.id}
		/>
	)
}

Geometry.displayName="Geometry";
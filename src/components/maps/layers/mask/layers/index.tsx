// App imports
import { Lines } from './lines';

// Context imports
import { useMarkers } from 'context/markers';

export const Layers = ({ boundary, marker }: any) => {
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

Layers.displayName="Layers";
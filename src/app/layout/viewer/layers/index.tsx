// App imports
import { Mask } from './mask';

// Context imports
import { useMarkers } from 'context/data/markers';

export const Layers = () => {
	const { markers } = useMarkers();
	const entries = Object.entries(markers);
	
	return (
		<>
			{entries.map(([ key, value ]: any) => 
				<Mask key={key} marker={value}/>
			)}
		</>
	)
}

Layers.displayName="Layers";
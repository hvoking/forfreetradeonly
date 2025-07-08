// React imports
import { useState, useContext, createContext } from 'react';

// Context imports
import { useMarkers } from 'context/data/markers';
import { useGeo } from 'context/geo';

const BoundaryContext: React.Context<any> = createContext(null);

export const useBoundary = () => useContext(BoundaryContext)

export const BoundaryProvider = ({children}: any) => {
	const { mapRef } = useGeo();
	const { markers, setCurrentMarkerId, addMarker } = useMarkers();

	const [ optionsCoords, setOptionsCoords ] = useState<any>(null);

	const isInside = (point: any) => {
		const map = mapRef.current;
		if (!map) return null;

		const markerLayers = Object.keys(markers).map((id) => `boundary-fill-${id}`);
		const features = map.queryRenderedFeatures(point, { layers: markerLayers });
		if (!features.length) return null;

		const markerId = features[0].layer.id.replace("boundary-fill-", "");
		setCurrentMarkerId(markerId);
		return markerId || null;
	}

	const onContextMenu = (event: any) => {
		event.preventDefault();
		const map = mapRef.current.getMap();

	    if (map.isMoving() || map.isZooming() || map.isRotating()) {
	      return;
	    }

	    const { point, lngLat } = event;
		const markerId = isInside(point);

		!markerId ? 
		setOptionsCoords(null) : 
		setOptionsCoords(lngLat);
	}

	const onClick = (event: any) => {
		setOptionsCoords(null);
		addMarker(event);
	}

	return (
		<BoundaryContext.Provider value={{ 
			onContextMenu, onClick,
			optionsCoords, setOptionsCoords
		}}>
			{children}
		</BoundaryContext.Provider>
	)
}

BoundaryContext.displayName = "BoundaryContext";
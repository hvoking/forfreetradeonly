// React imports
import { useContext, createContext } from 'react';

// App imports
import { fillProperties, filterGeometries, filterLines } from './helpers';

// Context imports
import { useGeo } from 'context/geo';
import { useMarkers } from 'context/markers';

// Third-party imports
import { signal } from '@preact/signals-react';

const MaskContext: React.Context<any> = createContext(null)

export const useMask = () => useContext(MaskContext)

export const MaskProvider = ({children}: any) => {
	const { mapRef } = useGeo();
	const { radius } = useMarkers();

	const map = mapRef.current;

	const mapFeatures = signal<any[]>([]);
	
  const getLayersBySource = (sourceLayer: string) => {
  	map?.getStyle()
			.layers
			.filter((layer: any) => layer['source-layer'] === sourceLayer)
			.map((layer: any) => layer.id);
  }

	const layers = getLayersBySource('road');

	mapFeatures.value = map?.queryRenderedFeatures({ layers });

	const getGeojson = (boundary: any, source: string, geometryType: string) => {
	  const fillProperty = fillProperties[geometryType] || 'fill-color';
	  const isLine = geometryType === 'LineString' || geometryType === 'MultiLineString';

	  if (!isLine) {
	    const geomFeatures = filterGeometries(mapFeatures.value, boundary, source);
	    return { type: 'FeatureCollection', features: geomFeatures }
	  }

	  const lineFeatures: any = filterLines(mapFeatures.value, boundary, source, fillProperty);
	  const features = lineFeatures.filter((item: any) => Object.keys(item.properties).length !== 0);
	  return { type: 'FeatureCollection', features };
	};

	return (
		<MaskContext.Provider value={{ 
			getGeojson
		}}>
			{children}
		</MaskContext.Provider>
	)
}

MaskContext.displayName = "MaskContext";
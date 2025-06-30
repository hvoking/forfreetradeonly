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
	const sharedGeoJsonDataMap = signal(new Map());

	const upsertGeoJsonData = (sourceId: any, geojsonProperties: any) => {
	  const newMap = new Map(sharedGeoJsonDataMap.value);
	  newMap.set(sourceId, geojsonProperties);
	  sharedGeoJsonDataMap.value = newMap;
	}

	const getGeojsonProperties = (sourceId: any) => {
      return sharedGeoJsonDataMap.value.get(sourceId);
    }

  const upsertGeojsonProperties = (sourceId: any, geojsonProperties: any) => {
    const newMap = new Map(sharedGeoJsonDataMap.value);
    newMap.set(sourceId, geojsonProperties);
    sharedGeoJsonDataMap.value = newMap;
  }
  
  const removeGeojsonProperties = (sourceId: any) => {
    const newMap = new Map(sharedGeoJsonDataMap.value);
    newMap.delete(sourceId);
    sharedGeoJsonDataMap.value = newMap;
  }

	const layerIds = map?.getStyle()
		.layers
		.filter((layer: any) =>{
			return layer.source === 'composite' && 
			layer['source-layer'] === 'road';

		})
		.map((layer: any) => layer.id);

	mapFeatures.value = map?.queryRenderedFeatures({ layers: layerIds });

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
			getGeojson, 
			sharedGeoJsonDataMap,
			upsertGeojsonProperties,
			getGeojsonProperties,
			removeGeojsonProperties
		}}>
			{children}
		</MaskContext.Provider>
	)
}

MaskContext.displayName = "MaskContext";
// React imports
import { useContext, createContext } from 'react';

// Third-party providers
import { signal } from '@preact/signals-react';

const GeojsonContext: React.Context<any> = createContext(null);

export const useGeojson = () => useContext(GeojsonContext)

export const GeojsonProvider = ({children}: any) => {
	const sharedGeoJsonDataMap = signal(new Map());

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

	return (
		<GeojsonContext.Provider value={{
			sharedGeoJsonDataMap,
			upsertGeojsonProperties,
			getGeojsonProperties,
			removeGeojsonProperties,
		}}>
			{children}
		</GeojsonContext.Provider>
	)
}

GeojsonContext.displayName = "GeojsonContext";
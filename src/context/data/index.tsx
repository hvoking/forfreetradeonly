// React imports
import { useContext, createContext } from 'react';

// Third-party imports
import { signal } from '@preact/signals-react';

const DataContext: React.Context<any> = createContext(null)

export const useData = () => useContext(DataContext)

export const DataProvider = ({children}: any) => {
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
		<DataContext.Provider value={{ 
			sharedGeoJsonDataMap,
			upsertGeojsonProperties,
			getGeojsonProperties,
			removeGeojsonProperties
		}}>
			{children}
		</DataContext.Provider>
	)
}

DataContext.displayName = "DataContext";
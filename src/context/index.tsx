import { GeoProvider } from './geo';
import { MapboxProvider } from './mapbox';
import { SearchProvider } from './search';
import { SizesProvider } from './sizes';
import { DataProvider } from './data';

export const ContextProvider = ({children}: any) => {
  return (
    <GeoProvider>
    <DataProvider>
    <MapboxProvider>
    <SearchProvider>
    <SizesProvider>
      {children}
    </SizesProvider>
    </SearchProvider>
    </MapboxProvider>
    </DataProvider>
    </GeoProvider>
  )
}

ContextProvider.displayName="ContextProvider";
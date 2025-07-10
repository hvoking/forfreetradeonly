import { GeoProvider } from './geo';
import { MapboxProvider } from './mapbox';
import { SearchProvider } from './search';
import { SizesProvider } from './sizes';
import { DataProvider } from './data';
import { MarkersProvider } from './markers';

export const ContextProvider = ({children}: any) => {
  return (
    <GeoProvider>
    <MapboxProvider>
    <DataProvider>
    <MarkersProvider>
    <SearchProvider>
    <SizesProvider>
      {children}
    </SizesProvider>
    </SearchProvider>
    </MarkersProvider>
    </DataProvider>
    </MapboxProvider>
    </GeoProvider>
  )
}

ContextProvider.displayName="ContextProvider";
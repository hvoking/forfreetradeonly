import { GeoProvider } from './geo';
import { MapboxProvider } from './mapbox';
import { EventsProvider } from './events';
import { SizesProvider } from './sizes';
import { DataProvider } from './data';

export const ContextProvider = ({children}: any) => {
  return (
    <GeoProvider>
    <DataProvider>
    <MapboxProvider>
    <EventsProvider>
    <SizesProvider>
      {children}
    </SizesProvider>
    </EventsProvider>
    </MapboxProvider>
    </DataProvider>
    </GeoProvider>
  )
}

ContextProvider.displayName="ContextProvider";
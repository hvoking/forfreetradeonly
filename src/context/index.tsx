import { MarkersProvider } from './markers';
import { GeojsonProvider } from './geojson';
import { GeoProvider } from './geo';
import { ApiProvider } from './api';
import { EventsProvider } from './events';
import { SizesProvider } from './sizes';

export const ContextProvider = ({children}: any) => {
  return (
    <GeoProvider>
    <MarkersProvider>
    <GeojsonProvider>
    <ApiProvider>
    <EventsProvider>
    <SizesProvider>
      {children}
    </SizesProvider>
    </EventsProvider>
    </ApiProvider>
    </GeojsonProvider>
    </MarkersProvider>
    </GeoProvider>
  )
}

ContextProvider.displayName="ContextProvider";
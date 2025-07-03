import { MarkersProvider } from './markers';
import { MaskProvider } from './mask';
import { GeoProvider } from './geo';
import { ApiProvider } from './api';
import { EventsProvider } from './events';
import { SizesProvider } from './sizes';
import { DataProvider } from './data';

export const ContextProvider = ({children}: any) => {
  return (
    <GeoProvider>
    <MarkersProvider>
    <MaskProvider>
    <DataProvider>
    <ApiProvider>
    <EventsProvider>
    <SizesProvider>
      {children}
    </SizesProvider>
    </EventsProvider>
    </ApiProvider>
    </DataProvider>
    </MaskProvider>
    </MarkersProvider>
    </GeoProvider>
  )
}

ContextProvider.displayName="ContextProvider";
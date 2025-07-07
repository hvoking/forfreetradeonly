import { GeoProvider } from './geo';
import { ApiProvider } from './api';
import { EventsProvider } from './events';
import { SizesProvider } from './sizes';
import { DataProvider } from './data';

export const ContextProvider = ({children}: any) => {
  return (
    <GeoProvider>
    <DataProvider>
    <ApiProvider>
    <EventsProvider>
    <SizesProvider>
      {children}
    </SizesProvider>
    </EventsProvider>
    </ApiProvider>
    </DataProvider>
    </GeoProvider>
  )
}

ContextProvider.displayName="ContextProvider";
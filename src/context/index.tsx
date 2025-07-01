import { MarkersProvider } from './markers';
import { MaskProvider } from './mask';
import { GeoProvider } from './geo';
import { ApiProvider } from './api';
import { DraggableProvider } from './draggable';
import { BoundaryProvider } from './boundary';
import { SizesProvider } from './sizes';
import { SearchProvider } from './search';

export const MainProvider = ({children}: any) => {
  return (
    <GeoProvider>
    <MarkersProvider>
    <MaskProvider>
    <ApiProvider>
    <SearchProvider>
    <DraggableProvider>
    <BoundaryProvider>
    <SizesProvider>
      {children}
    </SizesProvider>
    </BoundaryProvider>
    </DraggableProvider>
    </SearchProvider>
    </ApiProvider>
    </MaskProvider>
    </MarkersProvider>
    </GeoProvider>
  )
}

MainProvider.displayName="MainProvider";
import { LayerProvider } from './layer';
import { MarkersProvider } from './markers';
import { GeojsonProvider } from './geojson';

export const DataProvider = ({children}: any) => {
  return (
    <LayerProvider>
    <MarkersProvider>
    <GeojsonProvider>
      {children}
    </GeojsonProvider>
    </MarkersProvider>
    </LayerProvider>
  )
}

DataProvider.displayName="DataProvider";
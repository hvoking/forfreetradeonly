import { LayerProvider } from './layer';
import { GeojsonProvider } from './geojson';

export const DataProvider = ({children}: any) => {
  return (
    <LayerProvider>
    <GeojsonProvider>
      {children}
    </GeojsonProvider>
    </LayerProvider>
  )
}

DataProvider.displayName="DataProvider";
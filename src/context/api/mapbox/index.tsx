// Context imports
import { MapboxReverseApiProvider } from './reverse';
import { MapboxSearchApiProvider } from './search';

export const MapboxApiProvider = ({ children }: any) => {
  return (
    <MapboxSearchApiProvider>
    <MapboxReverseApiProvider>
      {children}
    </MapboxReverseApiProvider>
    </MapboxSearchApiProvider>
  )
}

MapboxApiProvider.displayName="MapboxApiProvider";
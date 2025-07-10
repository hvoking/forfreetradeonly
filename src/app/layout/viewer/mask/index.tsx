// React imports
import { useState, useEffect } from 'react';

// App imports
import { CustomMarker } from './marker';
import { Boundary } from './boundary';
import { Geometry } from './geometry';

// Context imports
import { useMapboxIsochroneApi } from 'context/mapbox/isochrone';

// Third party imports
import * as turf from '@turf/turf';

export const Mask = ({ marker }: any) => {
  const { fetchIsochrone } = useMapboxIsochroneApi();

  const [ boundary, setBoundary ] = useState<any>(null);

  const { id, center, radius, geometryType } = marker; 
  const { lng, lat } = center;

  useEffect(() => {
    const fetchBoundary = async (marker: any) => {
      if (geometryType === 'iso') {
        const data = await fetchIsochrone(marker);
        setBoundary(data.features[0]);
      } 
      else {
        const circle = turf.circle([ lng, lat ], radius);
        setBoundary(circle);
      }
    };
    fetchBoundary(marker);
  }, [ marker ]);

  return (
    <div key={id}>
      <Boundary marker={marker} boundary={boundary}/>
      <Geometry marker={marker} boundary={boundary}/>
      <CustomMarker marker={marker}/>
    </div>
  )
};

Mask.displayName="Mask";
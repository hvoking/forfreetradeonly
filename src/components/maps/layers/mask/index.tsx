// React imports
import { useState, useEffect } from 'react';

// App imports
import { CustomMarker } from './marker';
import { Boundary } from './boundary';
import { SubLayers } from './sublayers';

// Context imports
import { useIsochroneApi } from 'context/api/isochrone';

// Third party imports
import * as turf from '@turf/turf';

export const Mask = ({ marker }: any) => {
  const { fetchIsochrone } = useIsochroneApi();

  const [ boundary, setBoundary ] = useState<any>(null);

  const { id, center, radius, geometryType } = marker; 
  const { lng, lat } = center;

  useEffect(() => {
    const fetchBoundary = async (marker: any) => {
      // call api for creating isochrone boundary
      if (geometryType === 'iso') {
        const data = await fetchIsochrone(marker);
        setBoundary(data.features[0]);
      } 
      // create a circle as boundary
      else {
        const circle = turf.circle([ lng, lat ], radius, { steps: 32});
        setBoundary(circle);
      }
    };
    fetchBoundary(marker);
  }, [ marker, fetchIsochrone ]);

  return (
    <div key={id}>
      <Boundary marker={marker} boundary={boundary}/>
      <SubLayers marker={marker} boundary={boundary}/>
      <CustomMarker marker={marker}/>
    </div>
  )
};

Mask.displayName="Mask";
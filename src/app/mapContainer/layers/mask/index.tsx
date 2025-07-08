// React imports
import { useState, useEffect } from 'react';

// App imports
import { CustomMarker } from './marker';
import { Boundary } from './boundary';
import { Geojson } from './geojson';

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
      // call api for creating isochrone boundary
      if (geometryType === 'iso') {
        const data = await fetchIsochrone(marker);
        setBoundary(data.features[0]);
      } 
      // create a circle as boundary
      else {
        const circle = turf.circle([ lng, lat ], radius);
        setBoundary(circle);
      }
    };
    fetchBoundary(marker);
  }, [ marker, fetchIsochrone ]);

  return (
    <div key={id}>
      <Boundary marker={marker} boundary={boundary}/>
      <Geojson marker={marker} boundary={boundary}/>
      <CustomMarker marker={marker}/>
    </div>
  )
};

Mask.displayName="Mask";
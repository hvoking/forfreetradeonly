// React imports
import { useState } from 'react';

// App imports
import { Header } from './header';
import { Options } from './options';
import './styles.scss';

// Context imports
import { useMarkers } from 'context/data/markers';

// Third-party imports
import { Marker } from 'react-map-gl/mapbox';

export const Tooltip = ({ markerId }: any) => {
  const { markers, colorPalette } = useMarkers();
  const [ activeFeature, setActiveFeature ] = useState<any>(null);

  if (!markerId) return <></>;

  const currentMarker = markers[markerId];

  return (
      <div className="popup-item" onClick={(e: any) => e.stopPropagation()}>
        <Header 
          markerId={markerId} 
          activeFeature={activeFeature}
          setActiveFeature={setActiveFeature}
          currentMarker={currentMarker}
        />
        <Options 
          markerId={markerId} 
          activeFeature={activeFeature} 
          colorPalette={colorPalette}
          currentMarker={currentMarker}
        />
      </div>
  );
}

Tooltip.diplayName="Tooltip";
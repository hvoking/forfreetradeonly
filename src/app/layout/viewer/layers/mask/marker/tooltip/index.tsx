// React imports
import { useState } from 'react';

// App imports
import { Header } from './header';
import { Options } from './options';
import './styles.scss';

// Context imports
import { useMarkers } from 'context/data/markers';

export const Tooltip = ({ markerId }: any) => {
  const { markers } = useMarkers();
  const [ activeFeature, setActiveFeature ] = useState<any>('circle');

  if (!markerId) return <></>;

  const currentMarker = markers[markerId];

  return (
      <div className="popup-item" onClick={(e: any) => e.stopPropagation()}>
        <Header 
          markerId={markerId} 
          activeFeature={activeFeature}
          setActiveFeature={setActiveFeature}
        />
        <Options 
          activeFeature={activeFeature} 
          currentMarker={currentMarker}
        />
      </div>
  );
}

Tooltip.diplayName="Tooltip";
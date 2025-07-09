// App imports
import { Card } from './card';
import './styles.scss';

// Context imports
import { useMarkers } from 'context/data/markers';

export const Features = () => {
  const { markers } = useMarkers();

  if (!(Object.keys(markers).length)) return <></>;

  return (
    <div className="features-selection">
      <h2>Agent Features</h2>
      <p className="instructions">
        Custom Data Visualizations
      </p>
      <div className="features-wrapper">
        {Object.entries(markers).map(([key, value]: any) => (
          <div key={key}>
            <Card marker={value}/>
          </div>
        ))}
      </div>
    </div>
  );
};

Features.displayName = 'Features';
// App imports
import { Card } from './card';

// Context imports
import { useMarkers } from 'context/markers';

export const Grid = () => {
	const { markers } = useMarkers();

	return (
		<div className="features-wrapper">
        {Object.entries(markers).map(([key, value]: any) => (
          <div key={key}>
            <Card marker={value}/>
          </div>
        ))}
      </div>
	)
}

Grid.displayName="Grid";
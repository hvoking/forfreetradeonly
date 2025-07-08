// App imports
import './styles.scss';

// Context imports
import { useGeo } from 'context/geo';

const listOfBaseMaps = [
	{"Mapbox Light": "mapbox://styles/mapbox/light-v11"},
	{"Mapbox Dark": "mapbox://styles/mapbox/dark-v11"},
	{"Satellite Streets": "mapbox://styles/mapbox/satellite-streets-v12"},
	{"Navigation Night": "mapbox://styles/mapbox/navigation-night-v1"},
]

export const Basemaps = () => {
	const { setMapStyle } = useGeo();

	return (
		<div className="basemap-selector">
			<h2>Select Your Basemap</h2>
			<p className="instructions">Choose an basemap from the options below.</p>
			<div className="thumbnail-container">
				{listOfBaseMaps.map((item, index) => {
				  const [[name, url]] = Object.entries(item);
				  return (
				    <div key={index}>
				    	<img 
				    		className="thumbnail"
				    		src={process.env.PUBLIC_URL + `/static/basemaps/${index + 1}.png`} 
				    		alt={`custom-${index + 1}`}
				    		onClick={() => setMapStyle(url)}
				    	/>
				    	<div>{name}</div>
				    </div>
				  );
				})}
			</div>
		</div>
	)
}

Basemaps.displayName="Basemaps"
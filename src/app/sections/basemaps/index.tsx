// App imports
import './styles.scss';

// Context imports
import { useGeo } from 'context/geo';

const basemapsArray = [
	{
		"Mapbox Light": {
			url: "mapbox://styles/mapbox/light-v11",
			img: "light"
		}
	},
	{
		"Mapbox Dark": {
			url: "mapbox://styles/mapbox/dark-v11",
			img: "dark"
		}
	},
	{
		"Satellite Streets": {
			url: "mapbox://styles/mapbox/satellite-streets-v12",
			img: "sat"
		}
	},
	{
		"Navigation Night": {
			url: "mapbox://styles/mapbox/navigation-night-v1",
			img: "nav"
		}
	},
]

export const Basemaps = () => {
	const { setMapStyle } = useGeo();

	return (
		<div className="basemap-selector">
			<h2>Select Your Basemap</h2>
			<p className="instructions">Choose an basemap from the options below.</p>
			<div className="thumbnail-container">
				{basemapsArray.map((item, index) => {
				  const [[name, { img, url }]] = Object.entries(item);
				  return (
				    <div key={index}>
				    	<img 
				    		className="thumbnail"
				    		src={process.env.PUBLIC_URL + `/static/basemaps/${img}.png`} 
				    		alt={`custom-${img}`}
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
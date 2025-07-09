// App imports
import './styles.scss'

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

export const Selector = () => {
	const { setMapStyle } = useGeo();

	return (
		<div className="thumbnail-wrapper">
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
	)
}

Selector.displayName="Selector";
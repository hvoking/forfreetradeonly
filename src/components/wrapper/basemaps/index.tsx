// React imports
import { useState } from 'react';

// App imports
import { Cross } from './cross';
import './styles.scss';

// Context imports
import { useGeo } from 'context/geo';
import { Menu } from './menu';

export const Basemaps = () => {
	const [ activePage, setActivePage ] = useState(false);

	const { setMapStyle } = useGeo();

	if (!activePage) return <Menu setActivePage={setActivePage}/>

	return (
		<div className="basemap-selector">
			<div className="thumbnail-container">
				<div>Satellite</div>
				<img 
					className="thumbnail"
					src={process.env.PUBLIC_URL + `/static/basemaps/satellite/1.png`} 
					alt="satellite"
					onClick={() => setMapStyle("mapbox://styles/mapbox/satellite-streets-v12")}
				/>
			</div>
			<div className="thumbnail-container">
				<div>Light</div>
				<img 
					src={process.env.PUBLIC_URL + `/static/basemaps/light/1.png`} 
					alt="light"
					className="thumbnail"
					onClick={() => setMapStyle("mapbox://styles/mapbox/light-v11")}
				/>
			</div>
			<div className="thumbnail-container">
				<div>Dark</div>
				<img 
					src={process.env.PUBLIC_URL + `/static/basemaps/dark/1.png`} 
					alt="dark"
					className="thumbnail"
					onClick={() => setMapStyle("mapbox://styles/mapbox/dark-v11")}
				/>
			</div>
			<div className="basemaps-cross-wrapper" onClick={() => setActivePage(false)}>
				<Cross/>
			</div>
		</div>
	)
}

Basemaps.displayName="Basemaps"
// React imports
import { useState } from 'react';

// App imports
import { Header } from './header';
import { Charts } from './charts';
import { Footer } from './footer';
import './styles.scss';

// Context imports
import { useMarkers } from 'context/data/markers';
import { useGeojson } from 'context/data/geojson';

export const Card = ({ marker }: any) => {
	const [ activeCharts, setActiveCharts ] = useState(true);
	
	const { providers } = useMarkers();
	const { getGeojsonProperties } = useGeojson();

	const { id, name } = marker;

	const linesData = getGeojsonProperties(`lines-source-${id}`);
	const polygonsData = getGeojsonProperties(`polygons-source-${id}`);
	const pointsData = getGeojsonProperties(`points-source-${id}`);

	const currentProvider = providers.find((item: any) => item.name === name);

	const { type: currentType, columnName, graphicType, provider } = currentProvider;

	const isLine = currentType === "LineString";
	const isPoint = currentType === 'Point';

	const currentData = 
		isLine ? linesData : 
		isPoint ? pointsData : 
		polygonsData;

	const currentColor = 
		isLine ?  'line-color' : 
		isPoint ? 'circle-color' :
		'fill-color';

	return (
		<div key={id} className="agent-card">
		  	<Header 
		  		marker={marker} 
		  		activeCharts={activeCharts} 
		  		setActiveCharts={setActiveCharts}
		  	/>
			{activeCharts && 
				<Charts 
					data={currentData} 
					name={columnName} 
					colorLabel={currentColor} 
					graphicType={graphicType}
				/>
			}
			{activeCharts && <Footer provider={provider}/>}
		</div>
	)
}

Card.displayName="Card";
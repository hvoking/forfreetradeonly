// React imports
import { useState } from 'react';

// App imports
import { Header } from './header';
import { Charts } from './charts';
import { Footer } from './footer';
import './styles.scss';

// Context imports
import { useMarkers } from 'context/markers';
import { useGeojson } from 'context/geojson';

export const Card = ({ marker }: any) => {
	const [ activeCharts, setActiveCharts ] = useState(true);
	
	const { providers } = useMarkers();
	const { getGeojsonProperties } = useGeojson();

	const { id, name, fillColor, fillOpacity } = marker;

	const markerColor = fillColor.replace("b", "ba").replace(")", `, ${fillOpacity})`)

	const linesData = getGeojsonProperties(`lines-source-${id}`);
	const polygonsData = getGeojsonProperties(`polygons-source-${id}`);
	const pointsData = getGeojsonProperties(`points-source-${id}`);
	const clusterData = getGeojsonProperties(`cluster-source-${id}`);

	const currentProvider = providers.find((item: any) => item.name === name);

	const { type: currentType, columnName, graphicType, provider } = currentProvider;

	const isLine = currentType === "LineString";
	const isPoint = currentType === 'Point';
	const isCluster = currentType === 'Cluster';

	const currentData = 
		isLine ? linesData : 
		isPoint ? pointsData : 
		isCluster ? clusterData :
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
					backgroundColor={markerColor}
				/>
			}
			{activeCharts && <Footer provider={provider}/>}
		</div>
	)
}

Card.displayName="Card";
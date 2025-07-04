// Context imports
import { useData } from 'context/data';
import { useGeojson } from 'context/geojson';

// Third-party imports
import { Source, Layer } from 'react-map-gl/mapbox';

export const Lines = ({ boundary, source, markerId }: any) => {
	const { upsertGeojsonProperties } = useGeojson();
	const { getGeojson } = useData();

	const geoJsonData = getGeojson(boundary, source, 'LineString');

	if (!geoJsonData) return <></>;

	const sourceId = `lines-source-${markerId}`;

	const geojsonProperties = geoJsonData.features.map((item: any) => item.properties)

	upsertGeojsonProperties(sourceId, geojsonProperties);

	const layerId = `lines-layer-${markerId}`;
	
	const layerStyle: any = {
	  layerId,
	  type: "line",
	  source,
	  paint: {
	    'line-width': 2,
	    'line-color': ['get', 'line-color'],
	  },
	};

	return (
		<Source 
		  id={sourceId} 
		  type="geojson" 
		  data={geoJsonData}
		>
		  <Layer {...layerStyle}/>
		</Source>
	)
}

Lines.displayName="Lines";
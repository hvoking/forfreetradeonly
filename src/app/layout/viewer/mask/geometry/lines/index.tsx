// Context imports
import { useLayer } from 'context/data/layer';
import { useGeojson } from 'context/data/geojson';

// Third-party imports
import { Source, Layer } from 'react-map-gl/mapbox';

export const Lines = ({ boundary, source, markerId }: any) => {
	const { getGeojson } = useLayer();
	const { upsertGeojsonProperties } = useGeojson();

	const geoJsonData = getGeojson(boundary, 'LineString', 'road');

	if (!geoJsonData) return <></>;

	const sourceId = `lines-source-${markerId}`;
	const layerId = `lines-layer-${markerId}`;

	const geojsonProperties = geoJsonData.features.map((item: any) => item.properties)

	upsertGeojsonProperties(sourceId, geojsonProperties);
	
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
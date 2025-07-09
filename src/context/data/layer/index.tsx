// React imports
import { useContext, createContext } from 'react';

// App imports
import { fillProperties, filterGeometries, filterLines } from './helpers';

const LayerContext: React.Context<any> = createContext(null);

export const useLayer = () => useContext(LayerContext)

export const LayerProvider = ({children}: any) => {
	const getLayersBySource = (currentMap: any, sourceLayer: string) => {
		return currentMap.getStyle()
			.layers
			.filter((layer: any) => layer['source-layer'] === sourceLayer)
			.map((layer: any) => layer.id);
	}

	const getFeaturesBySource = (currentMap: any, currentSource: any) => {
		const layers = getLayersBySource(currentMap, currentSource);
		const currentFeatures = currentMap.queryRenderedFeatures({ layers });
		return currentFeatures;
	}

	const getGeojson = (currentMap: any, boundary: any, source: string, geometryType: string) => {
		const fillProperty = fillProperties[geometryType] || 'fill-color';
		const isLine = geometryType === 'LineString' || geometryType === 'MultiLineString';

		const currentFeatures = getFeaturesBySource(currentMap, 'road');

		if (!isLine) {
			const geomFeatures = filterGeometries(currentFeatures, boundary, source);
			return { type: 'FeatureCollection', features: geomFeatures }
		}

		const lineFeatures: any = filterLines(currentFeatures, boundary, source, fillProperty);
		const features = lineFeatures.filter((item: any) => Object.keys(item.properties).length !== 0);
		return { type: 'FeatureCollection', features };
	};

	return (
		<LayerContext.Provider value={{ getGeojson }}>
			{children}
		</LayerContext.Provider>
	)
}

LayerContext.displayName = "LayerContext";
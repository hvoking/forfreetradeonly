// Third-party imports
import * as turf from '@turf/turf';

export const fillProperties: any = {
	Point: 'circle-color',
	Polygon: 'fill-color',
	LineString: 'line-color',
}

const roadColors: any = {
  residential: 'rgba(245, 207, 116, 1)',
  motorway: 'rgba(204, 153, 255, 1)',
  motorway_link: 'rgba(204, 153, 255, 1)',
  primary: 'rgba(204, 153, 255, 1)',
  primary_link: 'rgba(204, 153, 255, 1)',
  secondary: 'rgba(204, 153, 255, 1)',
  secondary_link: 'rgba(204, 153, 255, 1)',
  tertiary: 'rgba(204, 153, 255, 1)',
  unclassified: 'rgba(245, 207, 116, 1)',
  living_street: 'rgba(245, 207, 116, 1)',
  trunk_link: 'rgba(204, 153, 255, 1)',
  trunk: 'rgba(204, 153, 255, 1)',
  "construction": 'rgba(245, 207, 116, 1)',
  "construction:residential": 'rgba(245, 207, 116, 1)',
  "construction:secondary": 'rgba(204, 153, 255, 1)',
  "construction:tertiary": 'rgba(204, 153, 255, 1)',
  "construction:pedestrian": 'rgba(204, 153, 255, 1)',
};

const getColor = (layerType: any, layerPaint: any, property: string) => {
  const processedPaint = { ...layerPaint };
  processedPaint[property] = roadColors[layerType];
  return processedPaint;
};

export const filterLines = (mapFeatures: any[], boundary: any, source: string, fillProperty: any) => {
    const lines = mapFeatures?.reduce((total: any[], item: any) => {
      const { geometry, layer, source: src, properties: itemProperties } = item;

      if (src !== source) return total;

      const color = getColor(itemProperties.type, layer.paint, fillProperty);

      const properties = { ...color, ...itemProperties };

      let lineFeatures: any[] = [];

      if (geometry.type === 'LineString') {
        lineFeatures.push({
          type: 'Feature',
          geometry,
          properties,
        });
      } 
      else if (geometry.type === 'MultiLineString') {
        for (const coords of geometry.coordinates) {
          lineFeatures.push({
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
            properties,
          });
        }
      } else {
        return total;
      }

      for (const line of lineFeatures) {
        if (turf.booleanWithin(line, boundary)) {
          total.push(line);
        } else if (turf.booleanIntersects(line, boundary)) {
          const split = turf.lineSplit(line, boundary);
          for (const feature of split.features) {
            if (turf.booleanWithin(feature, boundary)) {
              total.push(feature);
            }
          }
        }
      }
    return total;
    }, []);
    return lines;
  };

export const filterGeometries = (features: any[], boundary: any, source: string) =>
  features.filter(({ source: src, geometry }) =>
    src === source && 
    turf.booleanPointInPolygon(turf.centroid(geometry), boundary)
  );
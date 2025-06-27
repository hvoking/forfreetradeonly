// Third-party imports
import * as turf from '@turf/turf';

export const fillProperties: any = {
	Point: 'circle-color',
	Polygon: 'fill-color',
	LineString: 'line-color'
}

export const filterGeometries = (features: any[], boundary: any, source: string) =>
  features.filter(({ source: src, geometry }) =>
    src === source && 
    turf.booleanPointInPolygon(turf.centroid(geometry), boundary)
  );

export const filterLines = (mapFeatures: any[], boundary: any, source: string, fillProperty: any) => {
    const lines = mapFeatures?.reduce((total: any[], item: any) => {
      const { geometry, layer, source: src, properties } = item;
      if (src !== source) return total;

      let lineFeatures: any[] = [];

      if (geometry.type === 'LineString') {
        lineFeatures.push({
          type: 'Feature',
          geometry,
          properties,
        });
      } else if (geometry.type === 'MultiLineString') {
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
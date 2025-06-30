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
  "pedestrian": 'rgba(123, 210, 223, 1)',
  "service": 'rgba(123, 210, 223, 1)',
  "footway": 'rgba(123, 210, 223, 1)',
  "service:parking_aisle": 'rgba(123, 210, 223, 1)',
  "service:driveway": 'rgba(123, 210, 223, 1)',
  "service:alley": 'rgba(123, 210, 223, 1)',
  "service:drive_through": 'rgba(123, 210, 223, 1)',
  "track:grade1": 'rgba(255, 0, 0, 1)',
  "track:grade2": 'rgba(255, 0, 0, 1)',
  "track:grade3": 'rgba(255, 0, 0, 1)',
  "track:grade4": 'rgba(255, 0, 0, 1)',
  "track:grade5": 'rgba(255, 0, 0, 1)',
  "platform": 'rgba(255, 0, 0, 1)',
  "cycleway": 'rgba(255, 0, 0, 1)',
  "bridleway": 'rgba(255, 0, 0, 1)',
  "steps": 'rgba(255, 0, 0, 1)',
  "path": 'rgba(255, 0, 0, 1)',
  "track": 'rgba(255, 0, 0, 1)',
  "mountain_bike": 'rgba(255, 0, 0, 1)',
  "tram": 'rgba(255, 0, 0, 1)',
  "crossing": 'rgba(255, 0, 0, 1)',
  "rail": 'rgba(255, 0, 0, 1)',
  "pier": 'rgba(255, 0, 0, 1)',
  "canal": 'rgba(255, 0, 0, 1)',
  "river": 'rgba(255, 0, 0, 1)',
  "ditch": 'rgba(255, 0, 0, 1)',
  "drain": 'rgba(255, 0, 0, 1)',
  "stream": 'rgba(255, 0, 0, 1)',
  "breakwater": 'rgba(255, 0, 0, 1)',
  "road": 'rgba(255, 0, 0, 1)',
  "sidewalk": 'rgba(255, 0, 0, 1)',
  "subway": 'rgba(255, 0, 0, 1)',
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
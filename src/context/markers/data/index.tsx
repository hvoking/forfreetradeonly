export const providers = [
	{
		name: "streets",
		provider: "mapbox", 
		source: 'composite',
		layer: 'road', 
		label: 'Streets', 
		type: "LineString", 
		columnName: "type", 
		graphicType: "dots"
	}
]
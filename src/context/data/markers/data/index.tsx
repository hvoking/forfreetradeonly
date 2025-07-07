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

export const colorPalette = [
    "rgba(245, 246, 248, 1)",
    "rgba(255, 249, 177, 1)",
    "rgba(244, 208, 62, 1)", 
    "rgba(230, 127, 34, 1)",
    "rgba(241, 149, 138, 1)",
    "rgba(88, 214, 141, 1)",
    "rgba(166, 204, 245, 1)",
    "rgba(108, 216, 250, 1)",
];
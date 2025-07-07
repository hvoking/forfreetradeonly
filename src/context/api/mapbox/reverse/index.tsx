// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// App imports
import { useGeo } from 'context/geo';

const MapboxReverseApiContext: React.Context<any> = createContext(null)

export const useMapboxReverseApi = () => useContext(MapboxReverseApiContext);

export const MapboxReverseApiProvider = ({children}: any) => {
	const { viewport } = useGeo();
	const [ mapboxReverseData, setMapboxReverseData ] = useState<any>(null);

	useEffect(() => {
	  const fetchData = async () => {
	  	const { longitude, latitude } = viewport;

	    const tempUrl = `
	    	https://api.mapbox.com/geocoding/v5/
	    	mapbox.places/
	    	${longitude},${latitude}.json
	    	?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}
	    	&language=en
	    `;
	    const url = tempUrl.replace(/\s/g, '');
	    try {
		    const res = await fetch(url);
		    if (!res.ok) {
	  			throw new Error(`HTTP error! status: ${res.status}`);
	  		}
		    const receivedData = await res.json();
		    setMapboxReverseData(receivedData)
	    }
	    catch (error) {
	    	console.error("Error fetching address:", error);
	    	return null;
	    }
	  }
	  fetchData();
	}, [ viewport ]);

	return (
		<MapboxReverseApiContext.Provider value={{ mapboxReverseData }}>
			{children}
		</MapboxReverseApiContext.Provider>
	)
}

MapboxReverseApiContext.displayName = "MapboxReverseApiContext";
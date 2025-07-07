// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// App imports
import { useGeo } from 'context/geo';

const ReverseGeocodingApiContext: React.Context<any> = createContext(null)

export const useReverseGeocodingApi = () => {
	return (
		useContext(ReverseGeocodingApiContext)
	)
}

export const ReverseGeocodingApiProvider = ({children}: any) => {
	const { viewport } = useGeo();
	const [ mapboxReverseData, setMapboxReverseData ] = useState<any>(null);

	const token = process.env.REACT_APP_MAPBOX_TOKEN;

	const { longitude, latitude } = viewport;

	useEffect(() => {
	  const fetchData = async () => {
	    const tempUrl = `
	    	https://api.mapbox.com/geocoding/v6/
	    	mapbox.places/
	    	${longitude},${latitude}.json
	    	?access_token=${token}
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
		<ReverseGeocodingApiContext.Provider value={{ 
			mapboxReverseData
		}}>
			{children}
		</ReverseGeocodingApiContext.Provider>
	)
}

ReverseGeocodingApiContext.displayName = "ReverseGeocodingApiContext";
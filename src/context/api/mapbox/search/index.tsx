// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from 'context/geo';

const MapboxSearchApiContext: React.Context<any> = createContext(null)

export const useMapboxSearchApi = () => {
	return (
		useContext(MapboxSearchApiContext)
	)
}

export const MapboxSearchApiProvider = ({children}: any) => {
	const [ mapboxSearchData, setMapboxSearchData ] = useState(null);
	const [ searchText, setSearchText ] = useState('');
	const [ finalSearchText, setFinalSearchText ] = useState('');
	const { markerCoordinates } = useGeo();

	const { longitude, latitude } = markerCoordinates;

	useEffect(() => {
	  const fetchData = async () => {
	  	const temporarySearchText = searchText.replace(" ", "__");
	    const tempUrl = `
	    	https://api.mapbox.com/geocoding/v6/
	    	mapbox.places/
	    	${temporarySearchText}.json
	    	?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}
	    	&country=BR
	    	&language=pt
	    	&proximity=${longitude},${latitude}
	    `;
	    const url = tempUrl
	    	.replace(/\s/g, '')
	    	.replace("__", " ");

	    try {
		    const res = await fetch(url);
		    if (!res.ok) {
	  			throw new Error(`HTTP error! status: ${res.status}`);
	  		}
		    const receivedData = await res.json();
		    setMapboxSearchData(receivedData)
	    }
	    catch (error) {
	    	console.error("Error fetching address:", error);
	    	return null;
	    }
	  }
	  searchText && fetchData();
	}, [ searchText ]);

	return (
		<MapboxSearchApiContext.Provider value={{ 
			mapboxSearchData, 
			searchText, setSearchText, 
			finalSearchText, setFinalSearchText,
		}}>
			{children}
		</MapboxSearchApiContext.Provider>
	)
}

MapboxSearchApiContext.displayName = "MapboxSearchApiContext";
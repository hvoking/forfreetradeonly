// React imports
import { useContext, createContext } from 'react';

const StylesApiContext: React.Context<any> = createContext(null)

export const useStylesApi = () => useContext(StylesApiContext)

export const StylesApiProvider = ({children}: any) => {
	const fetchData = async (tableSchema: string, tableName: string) => {
		const url = `
	    	${process.env.REACT_APP_API_URL}/
	    	style
	    	?table_schema=${tableSchema}
	    	&table_name=${tableName}
	    `.replace(/\s/g, '');
	    try {
		  	const res = await fetch(url);
	  	  	if (!res.ok) {
	  			throw new Error(`HTTP error! status: ${res.status}`);
	  		}
		    const receivedData = await res.json();
		    return receivedData;
	    }
	    catch (error) {
			console.error("Error fetching address:", error);
			return null;
		}
	}
	return (
		<StylesApiContext.Provider value={{ fetchData }}>
			{children}
		</StylesApiContext.Provider>
	)
}

StylesApiContext.displayName = "StylesApiContext";
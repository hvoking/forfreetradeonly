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
	  	const res = await fetch(url);
	    const receivedData = await res.json();
	    return receivedData;
	}
	return (
		<StylesApiContext.Provider value={{ fetchData }}>
			{children}
		</StylesApiContext.Provider>
	)
}

StylesApiContext.displayName = "StylesApiContext";
// React imports
import { useContext, createContext } from 'react';

const RagApiContext: React.Context<any> = createContext(null)

export const useRagApi = () => useContext(RagApiContext)

export const RagApiProvider = ({children}: any) => {
	const fetchRag = async (question: any, metaData: any) => {
		try {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/rag`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					question,
					meta_data: JSON.stringify(metaData),
				}),
			});
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
		<RagApiContext.Provider value={{ fetchRag }}>
			{children}
		</RagApiContext.Provider>
	)
}

RagApiContext.displayName = "RagApiContext";
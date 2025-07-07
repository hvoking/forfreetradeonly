import { MapboxApiProvider } from './mapbox';
import { RagApiProvider } from './rag';

export const ApiProvider = ({ children }: any) => {
	return (
		<MapboxApiProvider>
		<RagApiProvider>
			{children}
		</RagApiProvider>
		</MapboxApiProvider>
	)
}

ApiProvider.displayName="ApiProvider";
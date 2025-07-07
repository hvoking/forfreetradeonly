import { MapboxApiProvider } from './mapbox';
import { IsochroneApiProvider } from './isochrone';
import { RagApiProvider } from './rag';

export const ApiProvider = ({ children }: any) => {
	return (
		<MapboxApiProvider>
		<IsochroneApiProvider>
		<RagApiProvider>
			{children}
		</RagApiProvider>
		</IsochroneApiProvider>
		</MapboxApiProvider>
	)
}

ApiProvider.displayName="ApiProvider";
import { GoogleApiProvider } from './google';
import { MapboxApiProvider } from './mapbox';
import { IsochroneApiProvider } from './isochrone';
import { RagApiProvider } from './rag';

export const ApiProvider = ({ children }: any) => {
	return (
		<GoogleApiProvider>
		<MapboxApiProvider>
		<IsochroneApiProvider>
		<RagApiProvider>
			{children}
		</RagApiProvider>
		</IsochroneApiProvider>
		</MapboxApiProvider>
		</GoogleApiProvider>
	)
}

ApiProvider.displayName="ApiProvider";
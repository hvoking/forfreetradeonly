import { GoogleApiProvider } from './google';
import { IsochroneApiProvider } from './isochrone';
import { RagApiProvider } from './rag';

export const ApiProvider = ({ children }: any) => {
	return (
		<GoogleApiProvider>
		<IsochroneApiProvider>
		<RagApiProvider>
			{children}
		</RagApiProvider>
		</IsochroneApiProvider>
		</GoogleApiProvider>
	)
}

ApiProvider.displayName="ApiProvider";
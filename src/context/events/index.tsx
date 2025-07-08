import { BoundaryProvider } from './boundary';
import { SearchProvider } from './search';

export const EventsProvider = ({ children }: any) => {
	return (
		<SearchProvider>
		<BoundaryProvider>
			{children}
		</BoundaryProvider>
		</SearchProvider>
	)
}

EventsProvider.displayName="EventsProvider";
import { DraggableProvider } from './draggable';
import { BoundaryProvider } from './boundary';
import { SearchProvider } from './search';

export const EventsProvider = ({ children }: any) => {
	return (
		<SearchProvider>
		<DraggableProvider>
		<BoundaryProvider>
			{children}
		</BoundaryProvider>
		</DraggableProvider>
		</SearchProvider>
	)
}

EventsProvider.displayName="EventsProvider";
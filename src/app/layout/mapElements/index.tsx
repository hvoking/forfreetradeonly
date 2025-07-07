// App imports
import { Location } from './location';
import { Cursor } from './cursor';
import { Search } from './search';

export const MapElements = () => {
	return (
		<>
			<Location/>
			<Cursor/>
			<Search/>
		</>
	)
}

MapElements.displayName="MapElements";
// App imports
import { Selector } from './selector';
import './styles.scss';

export const Basemaps = () => {
	return (
		<div className="basemap-selector">
			<h2>Select Your Basemap</h2>
			<p className="instructions">
				Choose an basemap from the options below.
			</p>
			<Selector/>
		</div>
	)
}

Basemaps.displayName="Basemaps"
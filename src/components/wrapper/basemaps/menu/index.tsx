// React imports
import { useState } from 'react';

// App imports
import './styles.scss';

export const Menu = ({ setActivePage }: any) => {
	const [ activeTooltip, setActiveTooltip ] = useState<any>(null);

	const onClick = () => {
		setActivePage(true);
		setActiveTooltip(null);
	};

	return (
		<div 
			className="map-layers" 
			onClick={onClick}
			onMouseEnter={() => setActiveTooltip("basemaps")}
			onMouseLeave={() => setActiveTooltip(null)}
		>
			<div>
				<svg viewBox="0 0 40 40">
					<g className="layers-svg-group">
						<polygon points="0 25, 20 15, 40 25, 20 35"/>
						<polygon points="0 20, 20 10, 40 20, 20 30"/>
						<polygon points="0 15, 20 5, 40 15, 20 25"/>
					</g>
				</svg>
			</div>
			{activeTooltip === "basemaps" && 
				<span className="basemap-tooltip">Basemaps</span>
			}
		</div>
	)
}

Menu.displayName="Menu";
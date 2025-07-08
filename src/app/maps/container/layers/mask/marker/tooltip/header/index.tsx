// App imports
import { Properties } from './properties';
import './styles.scss';

// Context imports
import { useMarkers } from 'context/data/markers';

export const Header = ({ markerId, activeFeature, setActiveFeature, currentMarker }: any) => {
	const { updateMarkers } = useMarkers();

	const isActiveColor = (name: any) => 
		activeFeature === name ? 
		"rgba(52, 152, 219, 0.3)" : 
		"rgba(255, 255, 255, 0)";

	const onClick = (boundaryType: any) => {
		setActiveFeature(boundaryType)
		if (boundaryType === "circle" || boundaryType === "iso") {
			updateMarkers(markerId, "geometryType", boundaryType);
		}
	}

	const SectionItem = ({ name }: any) => {
		return (
			<div 
				className="section-item" 
				style={{backgroundColor: isActiveColor(name) 
			}}>
				<img 
					src={process.env.PUBLIC_URL + `/static/icons/${name}.svg`} 
					alt={name}
					className="boundary-icon"
					onClick={() => onClick(name)}
				/>
			</div>
		)
	}

	return (
		<div className="header-selector">
			<section className="boundary-selectors">
				<SectionItem name={"circle"}/>
				<SectionItem name={"iso"}/>
			</section>
			<Properties 
				currentMarker={currentMarker} 
				isActiveColor={isActiveColor} 
				onClick={onClick}
			/>
		</div>
	)
}

Header.displayName="Header";
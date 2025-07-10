// App imports
import './styles.scss';

// Context imports
import { useMarkers } from 'context/data/markers';

export const Header = ({ marker }: any) => {
	const { updateMarkers } = useMarkers();

	const { geometryType, id } = marker;

	const isActiveColor = (name: any) => 
		geometryType === name ? 
		"rgba(52, 152, 219, 0.3)" : 
		"rgba(255, 255, 255, 0)";

	const onClick = (boundaryType: any) => {
		updateMarkers(id, "geometryType", boundaryType);
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
		</div>
	)
}

Header.displayName="Header";
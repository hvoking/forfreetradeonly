// App imports
import './styles.scss';

export const Menu = ({ setActiveFeatures, featuresLength }: any) => {
	const path = process.env.PUBLIC_URL + "/static/icons/folder.svg";
	const onClick = () => setActiveFeatures(true);

	return (
		<div className="features-menu-wrapper" onClick={onClick}>
			<div className="features-notifications">
				{featuresLength}
			</div>
			<img 
				className="features-icon"
				src={path} 
				alt="folder" 
			/>
		</div>
	)
}

Menu.displayName="Menu";
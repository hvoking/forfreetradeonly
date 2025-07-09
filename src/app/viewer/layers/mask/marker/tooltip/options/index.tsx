// App imports
import { Slider } from './slider';
import { Mobility } from './mobility';
import './styles.scss';

export const Options = ({ activeFeature, currentMarker }: any) => {
	if (!activeFeature) return <></>;

	const { id, radius, contoursMinutes } = currentMarker;
	
	return (
		<div className="options-wrapper">
		  {activeFeature === "circle" && 
  				<Slider 
  					markerId={id} 
  					markerProperty='radius'
  					minBound={0} 
  					maxBound={1}
  					title={"Radius"}
  					initialState={radius}
  				/>
  			}
  			{activeFeature === "iso" && 
	  			<>
	  				<Mobility markerId={id}/>
	  				<Slider 
	  					markerId={id} 
	  					minBound={5} 
	  					maxBound={15} 
	  					markerProperty={"contoursMinutes"} 
	  					title={"Minutes"}
	  					initialState={contoursMinutes}
	  				/>
	  			</>
	  		}
		</div>
	)
}

Options.displayName="Options";
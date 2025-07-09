// React imports
import { useState } from 'react';

// App imports
import { Tooltip } from './tooltip';
import { Trash } from './trash';
import './styles.scss';

// Context imports
import { useMarkers } from 'context/data/markers';

// Third-party imports
import { Marker } from 'react-map-gl/mapbox';

export const CustomMarker = ({ marker }: any) => {
	const { updateMarkers, rejectMarker } = useMarkers();
	const { id, center, image, name } = marker;

	const [ activeTrash, setActiveTrash ] = useState(false);
	const [ dragging, setDragging ] = useState(false);
	
	const onClick = (e: any) => {
		e.stopPropagation();
		!dragging && setActiveTrash((prev: boolean) => !prev);
	}

	const onDragStart = (e: any) =>  {
		updateMarkers(id, "center", e.lngLat);
		setDragging(true);
		setActiveTrash(false);
	}
	
	const onDrag = (e: any) => updateMarkers(id, "center", e.lngLat);

	const onDragEnd = () => setTimeout(() => setDragging(false), 0);

	return (
		<Marker
			key={id}
			longitude={center.lng}
			latitude={center.lat}
			anchor="bottom"
			draggable
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
		>
			<div className="custom-marker" onClick={onClick}>
				<img 
					src={image} 
					alt="agent-avatar"
					className="agent-avatar"
				/>
				<div className="marker-provider">
					{name}
				</div>
			</div>
			{activeTrash && 
				<>
					<Trash onClick={(e: any) => rejectMarker(e, id)}/>
					<Tooltip markerId={id}/>
				</>
			}
	    </Marker>
	)
}

CustomMarker.displayName="CustomMarker";
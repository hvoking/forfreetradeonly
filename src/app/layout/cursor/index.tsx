// React imports
import { useEffect, useRef } from 'react';

// App imports
import './styles.scss';

// Context imports
import { useMarkers } from 'context/markers';

export const Cursor = () => {
	const cursorRef = useRef<any>(null);

	const { addPin, currentImage } = useMarkers();

	useEffect(() => {
		const moveCursor = (e: MouseEvent) => {
			if (cursorRef?.current) {
				cursorRef.current.style.left = `${e.pageX - 30}px`;
				cursorRef.current.style.top = `${e.pageY - 30}px`;
			}
		};
		window.addEventListener('mousemove', moveCursor);
		return () => {
			window.removeEventListener('mousemove', moveCursor);
		};
	}, []);

	if (!addPin) return <></>;
	
	return (
		<div 
			ref={cursorRef} 
			className="maps-go-circle maps-custom-cursor"
		>
			<div className="map-pin-wrapper">
				<img 
					className="map-pin-image"
					src={currentImage} 
					alt="add-pin" 
					width="100%"
				/>
			</div>
		</div>
	)
}

Cursor.displayName="Cursor";
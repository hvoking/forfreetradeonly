// React imports
import { useEffect, useRef } from 'react';

// App imports
import './styles.scss';

// Context imports
import { useMarkers } from 'context/data/markers';

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
		<img 
			ref={cursorRef} 
			className="custom-cursor" 
			src={currentImage} 
			alt="add-pin" 
		/>
	)
}

Cursor.displayName="Cursor";
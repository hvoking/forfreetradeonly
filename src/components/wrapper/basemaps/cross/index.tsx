export const Cross = () => {
	return (
		<svg 
			viewBox="0 0 40 40" 
			width={20} 
			style={{
				userSelect: "none", 
				cursor: "pointer"
			}}
		>
			<line
				x1={0}	
				x2={40}	
				y1={0}	
				y2={40}	
				stroke="rgba(0, 0, 0, 1)"
				strokeWidth={3}
			/>
			<line
				x1={40}	
				x2={0}	
				y1={0}	
				y2={40}	
				stroke="rgba(0, 0, 0, 1)"
				strokeWidth={3}
			/>
		</svg>
	)
}

Cross.displayName="Cross";
export const SmallCross = ({ setCurrentInfo }: any) => {
	return (
		<svg 
			viewBox="0 0 40 40" 
			width={20} 
			onClick={() => setCurrentInfo(false)}
			style={{ cursor: "pointer"}}
		>
			<line
				x1={10}	
				x2={30}	
				y1={10}	
				y2={30}	
				stroke="rgba(0, 0, 0, 1)"
				strokeWidth={3}
			/>
			<line
				x1={30}	
				x2={10}	
				y1={10}	
				y2={30}	
				stroke="rgba(0, 0, 0, 1)"
				strokeWidth={3}
			/>
		</svg>
	)
}

SmallCross.displayName="SmallCross";
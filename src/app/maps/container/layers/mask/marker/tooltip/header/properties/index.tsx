export const Properties = ({ currentMarker, isActiveColor, onClick }: any) => {
	const { stroke, fillColor } = currentMarker;

	return (
		<section className="section-selectors">
			<div 
				className="section-item" 
				style={{backgroundColor: isActiveColor("fill") }}
				onClick={() => onClick("fill")}
			>
				<div 
					style={{ 
						width: "25px", 
						height: "25px", 
						borderRadius: "50%", 
						backgroundColor: fillColor
					}}
				/>
				<div className="header-title">fill</div>
			</div>
			<div 
				className="section-item" 
				onClick={() => onClick("stroke")}
				style={{backgroundColor: isActiveColor("stroke") 
			}}>
				<div 
					style={{
						width: "20px", 
						height: "20px", 
						borderRadius: "50%", 
						border: `4px solid ${stroke}`
					}}
				/>
				<div className="header-title">stroke</div>
			</div>
		</section>
	)
}

Properties.displayName="Properties";
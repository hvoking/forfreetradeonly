// App imports
import './styles.scss';

export const SearchIcon = () => {
	const currentImage = "/static/icons/search.svg";

	return (
		<div className="search-icon-wrapper">
			<img 
		    	src={process.env.PUBLIC_URL + currentImage}
		    	alt="search" 
		    	width="23px"
		    	height="23px"
		    />
	    </div>
	)
}

SearchIcon.displayName="SearchIcon";
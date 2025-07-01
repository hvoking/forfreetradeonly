// App imports
import { Suggestions } from './suggestions';
import { SearchIcon } from './icon';
import { SearchBar } from './bar';
import './styles.scss';

export const Search = () => {
	return (
		<div className="search-wrapper">
			<SearchBar/>
			<SearchIcon/>
			<Suggestions/>
		</div>
	)
}

Search.displayName="Search";
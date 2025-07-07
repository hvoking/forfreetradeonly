// React imports
import { useState, useRef, useContext, createContext } from 'react';

// Context imports
import { useGeo } from 'context/geo';
import { useMapboxSearchApi } from 'context/api/mapbox/search';

const SearchContext: React.Context<any> = createContext(null)

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({children}: any) => {
  const inputRef = useRef<any>(null);

  const [ suggestionIndex, setSuggestionIndex ] = useState(0);
  const [ suggestionsActive, setSuggestionsActive ]= useState(false);
  
  const { setViewport } = useGeo();
  const { mapboxSearchData, searchText, setSearchText } = useMapboxSearchApi();

  const suggestions = mapboxSearchData?.features.reduce((total: any, item: any) => {
    const place_name = item.place_name.toLowerCase()
    total.push(place_name)
    return total
  }, []);

  const handleChange = (e: any) => {
    const query = e.target.value;
    setSearchText(query);

    if (query.length > 0) {
      setSuggestionsActive(true);
    }
    else {
      setSuggestionsActive(false)
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 38) { // up arrow
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    else if (e.keyCode === 40) { // down arrow
      if (suggestionIndex - 1 === suggestions.length) {
        return
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    else if (e.keyCode === 13) { // enter
      const cityPattern = /[^,]*$/;
      const currentSearchValue: any = suggestions[suggestionIndex]
      const match = currentSearchValue && currentSearchValue.match(cityPattern)[0].replace(/^\s/, '');

      mapboxSearchData?.features.filter((item: any) => {
        const place_name = item.place_name.toLowerCase()
        const place_coordinates = item.geometry.coordinates;
        if (place_name === currentSearchValue) {
          setViewport({
            longitude: place_coordinates[0], 
            latitude: place_coordinates[1]
          });
        }
      })

      currentSearchValue && setSearchText(currentSearchValue);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
    else if (e.keyCode === 27) { // scape
      setSearchText("");
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  };

  const cleanSuggestions = () => {
    setSearchText("");
    setSuggestionIndex(0);
    setSuggestionsActive(false);
  }

  const handleClick = (e: any) => {
    const cityPattern = /[^,]*$/;
    const currentSearchValue = e.target.innerText;
    const match = currentSearchValue?.match(cityPattern)[0].replace(/^\s/, '');

    mapboxSearchData?.features.filter((item: any) => {
      const place_name = item.place_name.toLowerCase()
      const place_coordinates = item.geometry.coordinates;
      if (place_name === currentSearchValue) {
        setViewport({
          longitude: place_coordinates[0], 
          latitude: place_coordinates[1]
        })
      }
    })
    setSearchText(currentSearchValue);
    setSuggestionsActive(false);
  };

  return (
    <SearchContext.Provider value={{ 
      inputRef, 
      searchText, 
      handleChange, 
      handleKeyDown, 
      suggestionsActive, 
      suggestions, 
      suggestionIndex, 
      setSuggestionIndex, 
      handleClick,
      cleanSuggestions
    }}>
      {children}
    </SearchContext.Provider>
  )
}

SearchContext.displayName = "SearchContext";
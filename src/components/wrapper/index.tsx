// App imports
import { Sections } from './sections';
import { Location } from './location';
import { Cursor } from './cursor';
import { Basemaps } from './basemaps';
import { Maps } from './maps';
import { Search } from './search';

export const Wrapper = ({ children }: any) => {
  return (
    <div className="map-wrapper">
      <Maps/>
      <Sections/>
      <Location/>
      <Cursor/>
      <Basemaps/>
      <Search/>
    </div>
  );
};

Wrapper.displayName = "Wrapper";
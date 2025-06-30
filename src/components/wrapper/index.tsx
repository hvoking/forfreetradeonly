// App imports
import { Header } from './header';
import { Nav } from './nav';
import { Sections } from './sections';
import { Location } from './location';
import { Cursor } from './cursor';
import { Basemaps } from './basemaps';
import './styles.scss';

export const Wrapper = ({ children }: any) => {
  return (
    <div className="main-wrapper"> 
      <Header/>
      <Nav/>
      <div className="map-wrapper">
        { children }
        <Sections/>
        <Location/>
        <Cursor/>
        <Basemaps/>
      </div>
    </div>
  );
};

Wrapper.displayName = "Wrapper";
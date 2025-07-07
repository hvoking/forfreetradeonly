// App imports
import { Sections } from './sections';
import { MapContainer } from './mapContainer';
import { MapElements } from './mapElements';


export const Layout = ({ children }: any) => {
  return (
    <div className="layout">
      <Sections/>
      <MapContainer/>
      <MapElements/>
    </div>
  );
};

Layout.displayName = "Layout";
// App imports
import { Sidebar } from './sidebar'; 
import { Sections } from './sections';
import { MapContainer } from './mapContainer';
import { MapElements } from './mapElements';
import './styles.scss';

// Context imports
import { ContextProvider } from 'context';

export const App = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  return (
    <ContextProvider>
      <div className="App"> 
        <Sidebar/>
        <div className="layout">
          <Sections/>
          <MapContainer/>
          <MapElements/>
        </div>
      </div>
    </ContextProvider>
  );
};

App.displayName = "App";
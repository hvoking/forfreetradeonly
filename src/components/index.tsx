// App imports
import { Sidebar } from './sidebar'; 
import { Wrapper } from './wrapper';
import './styles.scss';

export const Main = () => {
  return (
    <div className="main"> 
      <Sidebar/>
      <Wrapper/>
    </div>
  );
};

Main.displayName = "Main";
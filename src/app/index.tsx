// App imports
import { Sidebar } from './sidebar'; 
import { Layout } from './layout';
import './styles.scss';

// Context imports
import { ContextProvider } from 'context';

export const App = () => {
  return (
    <ContextProvider>
      <div className="app"> 
        <Sidebar/>
        <Layout/>
      </div>
    </ContextProvider>
  );
};

App.displayName = "App";
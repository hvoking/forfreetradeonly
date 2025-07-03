// App imports
import { Sections } from './sections';
import { Location } from './location';
import { Cursor } from './cursor';
import { Maps } from './maps';
import { Search } from './search';

export const Layout = ({ children }: any) => {
  return (
    <div className="layout">
      <Maps/>
      <Sections/>
      <Location/>
      <Cursor/>
      <Search/>
    </div>
  );
};

Layout.displayName = "Layout";
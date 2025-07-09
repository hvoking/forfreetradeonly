// App imports
import { Sections } from './sections';
import { Viewer } from './viewer';
import { Widgets } from './widgets';

export const Layout = () => {
	return (
		<div className="layout">
          <Sections/>
          <Viewer/>
          <Widgets/>
        </div>
	)
}

Layout.displayName="Layout";
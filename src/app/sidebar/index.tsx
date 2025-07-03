// App imports
import { Logo } from './logo';
import { Navigation } from './navigation';

export const Sidebar = () => {
	return (
		<>
			<Logo/>
			<Navigation/>
		</>
	)
}

Sidebar.displayName="Sidebar";
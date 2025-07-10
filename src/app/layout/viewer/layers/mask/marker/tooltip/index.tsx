// App imports
import { Header } from './header';
import { Options } from './options';
import './styles.scss';

export const Tooltip = ({ marker }: any) => {
  if (!marker) return <></>;

  return (
      <div className="popup-item" onClick={(e: any) => e.stopPropagation()}>
        <Header marker={marker}/>
        <Options marker={marker}/>
      </div>
  );
}

Tooltip.diplayName="Tooltip";
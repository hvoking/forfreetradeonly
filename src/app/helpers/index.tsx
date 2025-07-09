// App imports
import { Location } from './location';
import { Cursor } from './cursor';
import { Search } from './search';

export const Helpers = () => {
  return (
    <>
      <Location/>
      <Cursor/>
      <Search/>
    </>
  )
}

Helpers.displayName="Helpers";
import React from 'react';
import css from './App.module.scss';
import { observer } from 'mobx-react-lite';
import { RootState } from '../State/RootState';
import { CitiesCanvas } from './CitiesCanvas';
import { NearestNeighbourControl } from './controls/NearestNeighbourControl';
import { GenerateCitiesControl } from './controls/GenerateCitiesControl';

/**
 * prevent default
 */
export function pd<T extends Function>(handler: T) {
  return (e: { preventDefault: Function }) => {
    e.preventDefault();
    handler(e);
  };
}

const App = observer<{ state: RootState }>(({ state }) => (
  <div className={css.host}>
    <div className={css.leftPane + ' p-3'}>
      <h2>Traveling Salesman</h2>
      <GenerateCitiesControl state={state} />
      <NearestNeighbourControl state={state} />
    </div>
    <div className={css.rightPane + ' p-5'}>
      <CitiesCanvas cities={state.cities} path={state.path} />
    </div>
  </div>
));

export default App;

import React from 'react';
import css from './App.module.scss';
import { observer } from 'mobx-react-lite';
import { RootState } from '../state/RootState';
import { CitiesCanvas } from './CitiesCanvas';
import { FindPathByNearestNeighbourControl } from './controls/FindPathByNearestNeighbourControl';
import { FindPathByRandomControl } from './controls/FindPathByRandomControl';
import { GenerateCitiesControl } from './controls/GenerateCitiesControl';
import { FindPathByGaByBookControl } from './controls/FindPathByGaByBookControl';
import { FindPathByGaByMeControl } from './controls/FindPathByGaByMeControl';

const App = observer<{ state: RootState }>(({ state }) => (
  <div className={css.host}>
    <div className={css.leftPane + ' p-3'}>
      <h2>Traveling Salesman</h2>
      <GenerateCitiesControl state={state} />
      <FindPathByRandomControl state={state} />
      <FindPathByNearestNeighbourControl state={state} />
      <FindPathByGaByBookControl state={state} />
      <FindPathByGaByMeControl state={state} />
    </div>
    <div className={css.rightPane}>
      <CitiesCanvas cities={state.cities} path={state.path} />
    </div>
  </div>
));

export default App;

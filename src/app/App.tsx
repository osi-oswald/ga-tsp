import React from 'react';
import css from './App.module.scss';
import { observer } from 'mobx-react-lite';
import { RootState } from '../state/RootState';
import { CitiesCanvas } from './CitiesCanvas';
import { FindPathByNearestNeighbourControl } from './controls/FindPathByNearestNeighbourControl';
import { FindPathByRandomControl } from './controls/FindPathByRandomControl';
import { GenerateCitiesControl } from './controls/GenerateCitiesControl';
import { FindPathByGaClassicControl } from './controls/FindPathByGaClassicControl';

const App = observer<{ state: RootState }>(({ state }) => (
  <div className={css.host}>
    <div className={css.leftPane + ' p-3'}>
      <h2>Traveling Salesman</h2>
      <GenerateCitiesControl state={state} />
      <FindPathByNearestNeighbourControl state={state} />
      <FindPathByRandomControl state={state} />
      <FindPathByGaClassicControl state={state} />
    </div>
    <div className={css.rightPane + ' p-5'}>
      <CitiesCanvas cities={state.cities} path={state.path} />
    </div>
  </div>
));

export default App;

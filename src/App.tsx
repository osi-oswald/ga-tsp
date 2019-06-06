import React from 'react';
import css from './App.module.scss';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';
import { RootState } from './state/RootState';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';

const App = observer(({ state }: { state: RootState }) => (
  <div className={css.host}>
    <div className={css.leftPane + ' p-3'}>
      <h2>Taveling Salesman</h2>
      <br />
      <FormGroup>
        <FormLabel>Number of cities</FormLabel>
        <FormControl
          value={state.nrOfCities ? state.nrOfCities.toString() : ''}
          onChange={(e: any) => (state.nrOfCities = +e.target.value)}
          type="number"
          placeholder="Number of cities"
        />
      </FormGroup>
      <div className="m-n2 d-flex">
        <Button
          className="m-2 flex-even"
          onClick={() => state.generateByRandom()}
        >
          random
        </Button>
        <Button
          className="m-2 flex-even"
          onClick={() => state.generateInCircle()}
        >
          circle
        </Button>
      </div>
      <br />
      <FormLabel>Path by nearest neighbour</FormLabel>
      <div className="d-flex">
        <Button className="flex-even">find</Button>
      </div>
      <br />
    </div>
    <div className={css.rightPane + ' p-5'}>
      <svg
        viewBox={`-50 -50 ${state.scale + 100} ${state.scale + 100}`}
        preserveAspectRatio="true"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      >
        {state.cities.map(city => (
          <circle cx={city.x} cy={city.y} r="5" fill="red" />
        ))}
      </svg>
    </div>
  </div>
));

export default App;

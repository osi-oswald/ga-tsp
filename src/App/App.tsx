import React from 'react';
import css from './App.module.scss';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';
import { RootState } from '../State/RootState';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { CitiesPane } from '../CitiesPane/CitiesPane';

const App = observer(({ state }: { state: RootState }) => (
  <div className={css.host}>
    <div className={css.leftPane + ' p-3'}>
      <h2>Traveling Salesman</h2>
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
      <div>
        <Button
          className="w-100"
          onClick={() => state.findPathByNearestNeighbour()}
        >
          Path by nearest neighbour
        </Button>
      </div>
      <p className="py-2 text-center">
        Length by nearest neighbour: {state.pathLengthByNearestNeighbour}
      </p>
    </div>
    <div className={css.rightPane + ' p-5'}>
      <CitiesPane
        scale={state.scale}
        cities={state.cities}
        paths={state.paths}
      />
    </div>
  </div>
));

export default App;

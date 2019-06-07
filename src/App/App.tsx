import React from 'react';
import css from './App.module.scss';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';
import { RootState } from '../State/RootState';
import { Col, Form, FormControl, Row } from 'react-bootstrap';
import { CitiesPane } from '../CitiesPane/CitiesPane';

/**
 * prevent default
 */
export function pd<T extends Function>(handler: T) {
  return (e: { preventDefault: Function }) => {
    e.preventDefault();
    handler(e);
  };
}

const App = observer(({ state }: { state: RootState }) => (
  <div className={css.host}>
    <div className={css.leftPane + ' p-3'}>
      <h2>Traveling Salesman</h2>

      <div className="my-4">
        <h6>Generate cities</h6>
        <Row className="my-2">
          <Col className="my-auto">Count</Col>
          <Col>
            <Form onSubmit={pd(() => state.generateByLastChoice())}>
              <FormControl
                value={state.nrOfCities ? state.nrOfCities.toString() : ''}
                onChange={(e: any) => (state.nrOfCities = +e.target.value)}
                type="number"
                placeholder="Number of cities"
              />
            </Form>
          </Col>
        </Row>
        <Row className="my-2">
          <Col>
            <Button className="w-100" onClick={() => state.generateCitiesByRandom()}>
              random
            </Button>
          </Col>
          <Col>
            <Button className="w-100" onClick={() => state.generateCitiesInCircle()}>
              circle
            </Button>
          </Col>
        </Row>
      </div>

      <div className="my-4">
        <h6>Nearest Neighbour</h6>
        <Row className="my-2">
          <Col>
            <Button className="w-100" onClick={() => state.findPathByNearestNeighbour()}>
              find
            </Button>
          </Col>
          <Col className="my-auto">Length: {state.pathLengthByNearestNeighbour || '?'}</Col>
        </Row>
      </div>
    </div>

    <div className={css.rightPane + ' p-5'}>
      <CitiesPane cities={state.cities} paths={state.paths} />
    </div>
  </div>
));

export default App;

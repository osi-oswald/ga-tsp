import { observer } from 'mobx-react-lite';
import { Col, Form, FormControl, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { pd } from '../App';

export const GenerateCitiesControl = observer<{
  state: {
    generateByLastChoice: Function;
    generateCitiesByRandom: Function;
    generateCitiesInCircle: Function;
    nrOfCities: number;
  };
}>(({ state }) => (
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
));

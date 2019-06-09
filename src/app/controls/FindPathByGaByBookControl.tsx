import { observer } from 'mobx-react-lite';
import { Col, FormControl, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { RootState } from '../../state/RootState';
import css from './control.module.scss';

export const FindPathByGaByBookControl = observer<{ state: RootState }>(({ state }) => (
  <div className={css.control + ' my-3'}>
    <h6>Path by GA by the book</h6>

    <Row className="my-2">
      <Col className="my-auto">Population size</Col>
      <Col>
        <FormControl
          value={state.populationOfGaByBook ? state.populationOfGaByBook.toString() : ''}
          onChange={(e: any) => (state.populationOfGaByBook = +e.target.value)}
          type="number"
        />
      </Col>
    </Row>

    <Row className="my-2">
      <Col className="my-auto">Crossover rate</Col>
      <Col>
        <FormControl
          value={state.crossoverRateOfGaByBook ? state.crossoverRateOfGaByBook.toString() : ''}
          onChange={(e: any) => (state.crossoverRateOfGaByBook = +e.target.value)}
          type="number"
        />
      </Col>
    </Row>

    <Row className="my-2">
      <Col className="my-auto">Mutation rate</Col>
      <Col>
        <FormControl
          value={state.mutationRateOfGaByBook ? state.mutationRateOfGaByBook.toString() : ''}
          onChange={(e: any) => (state.mutationRateOfGaByBook = +e.target.value)}
          type="number"
        />
      </Col>
    </Row>

    <Row className="my-2">
      <Col className="my-auto">Elitism rate</Col>
      <Col>
        <FormControl
          value={state.elitismRateOfGaByBook ? state.elitismRateOfGaByBook.toString() : ''}
          onChange={(e: any) => (state.elitismRateOfGaByBook = +e.target.value)}
          type="number"
        />
      </Col>
    </Row>

    <Row className="my-2">
      <Col className="my-auto">
        <div>Length: {state.pathLengthByGaByBook.toFixed(2)}</div>
        <div className="small">Generation: {state.generationsOfGaByBook}</div>
      </Col>
      <Col className="my-auto">
        <Button className="w-100" onClick={() => state.findPathByGaByBook()}>
          find
        </Button>
      </Col>
    </Row>
  </div>
));

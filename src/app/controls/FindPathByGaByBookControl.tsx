import { observer } from 'mobx-react-lite';
import { Col, FormControl, Row, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { RootState } from '../../state/RootState';
import css from './control.module.scss';

export const FindPathByGaByBookControl = observer<{ state: RootState }>(({ state }) => (
  <div className={css.control + ' my-3'}>
    <h6>GA by the book</h6>

    <Row className="my-2">
      <Col className="my-auto">
        <div>Length: {state.pathLengthByGaByBook.toFixed(2)}</div>
        <div className="small">Generation: {state.generationsOfGaByBook}</div>
      </Col>
      <Col className="my-auto">
        {state.terminateGaByBook ? (
          <Button className="w-100 bg-secondary" onClick={() => state.terminateGaByBook!()}>
            stop
          </Button>
        ) : (
          <Button className="w-100" onClick={() => state.findPathByGaByBook()}>
            find
          </Button>
        )}
      </Col>
    </Row>

    <Row className="my-2">
      <Col className="my-auto">Population size</Col>
      <Col>
        <FormControl
          value={state.populationOfGaByBook != null ? state.populationOfGaByBook.toString() : ''}
          onChange={(e: any) => (state.populationOfGaByBook = +e.target.value)}
          type="number"
        />
      </Col>
    </Row>

    <Row className="my-2">
      <Col className="my-auto">Crossover rate</Col>
      <Col>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">%</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={
              state.crossoverRateOfGaByBook != null
                ? (state.crossoverRateOfGaByBook * 100).toString()
                : ''
            }
            onChange={(e: any) => (state.crossoverRateOfGaByBook = +e.target.value / 100)}
            type="number"
          />
        </InputGroup>
      </Col>
    </Row>

    <Row className="my-2">
      <Col className="my-auto">Mutation rate</Col>
      <Col>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">%</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={
              state.mutationRateOfGaByBook != null
                ? (state.mutationRateOfGaByBook * 100).toString()
                : ''
            }
            onChange={(e: any) => (state.mutationRateOfGaByBook = +e.target.value / 100)}
            type="number"
          />
        </InputGroup>
      </Col>
    </Row>

    <Row className="my-2">
      <Col className="my-auto">Elitism rate</Col>
      <Col>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">%</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={
              state.elitismRateOfGaByBook != null
                ? (state.elitismRateOfGaByBook * 100).toString()
                : ''
            }
            onChange={(e: any) => (state.elitismRateOfGaByBook = +e.target.value / 100)}
            type="number"
          />
        </InputGroup>
      </Col>
    </Row>
  </div>
));

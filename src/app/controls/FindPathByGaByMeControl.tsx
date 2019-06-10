import { observer } from 'mobx-react-lite';
import { Col, FormControl, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { RootState } from '../../state/RootState';
import css from './control.module.scss';

export const FindPathByGaByMeControl = observer<{ state: RootState }>(({ state }) => (
  <div className={css.control + ' my-3'}>
    <h6>GA by osi-oswald {'😎'}</h6>

    <Row className="my-2">
      <Col className="my-auto">
        <div>Length: {state.pathLengthByGaByMe.toFixed(2)}</div>
        <div className="small">Generation: {state.generationsOfGaByMe}</div>
      </Col>
      <Col className="my-auto">
        {state.terminateGaByMe ? (
          <Button className="w-100 bg-secondary" onClick={() => state.terminateGaByMe!()}>
            stop
          </Button>
        ) : (
          <Button className="w-100" onClick={() => state.findPathByGaByMe()}>
            find
          </Button>
        )}
      </Col>
    </Row>

    <Row className="my-2">
      <Col className="my-auto">Population size</Col>
      <Col>
        <FormControl
          value={state.populationOfGaByMe != null ? state.populationOfGaByMe.toString() : ''}
          onChange={(e: any) => (state.populationOfGaByMe = +e.target.value)}
          type="number"
        />
      </Col>
    </Row>
  </div>
));

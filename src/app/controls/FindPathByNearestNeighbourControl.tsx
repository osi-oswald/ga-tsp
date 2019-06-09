import { observer } from 'mobx-react-lite';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import React from 'react';
import css from './control.module.scss';

export const FindPathByNearestNeighbourControl = observer<{
  state: { findPathByNearestNeighbour: Function; pathLengthByNearestNeighbour: number };
}>(({ state }) => (
  <div className={css.control + ' my-3'}>
    <h6>Nearest Neighbour</h6>
    <Row className="my-2">
      <Col className="my-auto">Length: {state.pathLengthByNearestNeighbour.toFixed(2)}</Col>
      <Col className="my-auto">
        <Button className="w-100" onClick={() => state.findPathByNearestNeighbour()}>
          find
        </Button>
      </Col>
    </Row>
  </div>
));

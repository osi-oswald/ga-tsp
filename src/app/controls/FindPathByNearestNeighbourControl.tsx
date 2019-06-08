import { observer } from 'mobx-react-lite';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import React from 'react';

export const FindPathByNearestNeighbourControl = observer<{
  state: { findPathByNearestNeighbour: Function; pathLengthByNearestNeighbour: number };
}>(({ state }) => (
  <div className="my-4">
    <h6>Path by Nearest Neighbour</h6>
    <Row className="my-2">
      <Col>
        <Button className="w-100" onClick={() => state.findPathByNearestNeighbour()}>
          find
        </Button>
      </Col>
      <Col className="my-auto">Length: {state.pathLengthByNearestNeighbour.toFixed(2)}</Col>
    </Row>
  </div>
));

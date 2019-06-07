import { observer } from 'mobx-react-lite';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import React from 'react';

export const FindPathByRandomControl = observer<{
  state: { findPathByRandom: Function; pathLengthByRandom: number };
}>(({ state }) => (
  <div className="my-4">
    <h6>Path by Random</h6>
    <Row className="my-2">
      <Col>
        <Button className="w-100" onClick={() => state.findPathByRandom()}>
          find
        </Button>
      </Col>
      <Col className="my-auto">Length: {state.pathLengthByRandom.toFixed(1)}</Col>
    </Row>
  </div>
));

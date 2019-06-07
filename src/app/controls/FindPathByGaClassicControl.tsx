import { observer } from 'mobx-react-lite';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import React from 'react';

export const FindPathByGaClassicControl = observer<{
  state: { findPathByGaClassic: Function; pathLengthByGaClassic: number };
}>(({ state }) => (
  <div className="my-4">
    <h6>Path by GA classic</h6>
    <Row className="my-2">
      <Col>
        <Button className="w-100" onClick={() => state.findPathByGaClassic()}>
          find
        </Button>
      </Col>
      <Col className="my-auto">Length: {state.pathLengthByGaClassic.toFixed(1)}</Col>
    </Row>
  </div>
));

import { observer } from 'mobx-react-lite';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import React from 'react';

export const FindPathByGaByMeControl = observer<{
  state: {
    findPathByGaByMe: Function;
    pathLengthByGaByMe: number;
    generationsOfGaByMe: number;
  };
}>(({ state }) => (
  <div className="my-4">
    <h6>Path by GA by me</h6>
    <Row className="my-2">
      <Col>
        <Button className="w-100" onClick={() => state.findPathByGaByMe()}>
          find
        </Button>
      </Col>
      <Col className="my-auto">
        <div>Length: {state.pathLengthByGaByMe.toFixed(1)}</div>
        <div>G: {state.generationsOfGaByMe}</div>
      </Col>
    </Row>
  </div>
));

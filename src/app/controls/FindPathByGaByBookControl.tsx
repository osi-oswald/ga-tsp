import { observer } from 'mobx-react-lite';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import React from 'react';

export const FindPathByGaByBookControl = observer<{
  state: {
    findPathByGaByBook: Function;
    pathLengthByGaByBook: number;
    generationsOfGaByBook: number;
  };
}>(({ state }) => (
  <div className="my-4">
    <h6>Path by GA by the book</h6>
    <Row className="my-2">
      <Col>
        <Button className="w-100" onClick={() => state.findPathByGaByBook()}>
          find
        </Button>
      </Col>
      <Col className="my-auto">
        <div>Length: {state.pathLengthByGaByBook.toFixed(2)}</div>
        <div>G: {state.generationsOfGaByBook}</div>
      </Col>
    </Row>
  </div>
));

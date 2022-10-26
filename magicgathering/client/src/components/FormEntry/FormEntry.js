import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

function FormEntry({ label, defValue, refer }) {
  return (
    <Form.Group as={Row} md="4" controlId="validationCustom01">
      <Form.Label column sm="2">
        {label}
      </Form.Label>
      <Col sm="10">
        <Form.Control
          required
          type="text"
          placeholder={label}
          defaultValue={defValue}
          ref={refer}
        />
      </Col>
    </Form.Group>
  );
}

export default FormEntry;

import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import AdaptativeModal from './AdaptativeModal.js';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


function EditCardModal(props) {
  
    const {card, handleClose, show} = props;

    const name = useRef(card.cardName);
    const valor = useRef(card.value);
    const description = useRef(card.description);

    const modalTitle= "Edit card "+ card.cardName;
    const footer = true;

    const handleSaveCard = () =>{
        props.handleSave(name.current, valor.current, description.current);
    }

    const modalProps = {
      modalTitle,
      footer,
      handleClose: handleClose,
      handleSave: handleSaveCard,
      show: show,
    } 


    return (  
        <AdaptativeModal {...modalProps}>
            <Form noValidate>
                <Form.Group as = {Row}  md="4" controlId="validationCustom01">
                    <Form.Label column sm= "2">Card name</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            required
                            type="text"
                            placeholder="Card Name"
                            defaultValue={card.cardName}
                            ref = {name}
                        />
                    </Col>

                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as = {Row}  md="4" controlId="validationCustom02">
                    <Form.Label column sm= "2" >Value</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            required
                            type="text"
                            placeholder="Value"
                            defaultValue={card.value}
                            ref= {valor}
                        />
                    </Col>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group  md="4" controlId="validationCustom03">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Description"
                        defaultValue={card.description}
                        ref= {description}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Form>
        </AdaptativeModal>
    );
}

export default EditCardModal;

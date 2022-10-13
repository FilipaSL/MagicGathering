import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AdaptativeModal from "../AdaptativeModal.js";
import Form from "react-bootstrap/Form";
import FormEntry from "./FormEntry.js";

function EditCardModal({ card, handleClose, handleSave, show }) {
  const name = useRef(card.cardName);
  const valor = useRef(card.value);
  const description = useRef(card.description);

  const modalTitle = card.cardName
    ? "Edit card " + card.cardName
    : "Create a new Card";
  const footer = true;

  const handleSaveCard = () => {
    handleSave(name.current, valor.current, description.current);
  };

  const modalProps = {
    modalTitle,
    footer,
    handleClose: handleClose,
    handleSave: handleSaveCard,
    show: show,
  };

  return (
    <AdaptativeModal {...modalProps}>
      <Form noValidate>
        <FormEntry defValue={card.cardName} label="Card name" refer={name} />
        <FormEntry defValue={card.value} label="Value" refer={valor} />
        <FormEntry
          defValue={card.description}
          label="Description"
          refer={description}
        />
      </Form>
    </AdaptativeModal>
  );
}

export default EditCardModal;

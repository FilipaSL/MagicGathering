import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AdaptativeModal from "../AdaptativeModal.js";
import Form from "react-bootstrap/Form";
import FormEntry from "../../FormEntry/FormEntry.js";
import AlertBar from "../../AlertBar/AlertBar.js";

function EditCardModal({
  card,
  handleClose,
  handleSave,
  show,
  modalError,
  handleCloseError,
}) {
  const name = useRef(card ? card.cardName : null);
  const valor = useRef(card ? card.value : null);
  const description = useRef(card ? card.description : null);

  if (!show) {
    return (
      <AdaptativeModal
        props={(handleClose, handleSave, show)}
      ></AdaptativeModal>
    );
  }

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

  const alertProps = {
    message: modalError,
    handleClose: handleCloseError,
  };
  return (
    <AdaptativeModal {...modalProps}>
      {modalError ? <AlertBar {...alertProps} /> : <></>}
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

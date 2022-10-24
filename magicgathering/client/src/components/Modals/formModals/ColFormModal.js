import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AdaptativeModal from "../AdaptativeModal.js";
import Form from "react-bootstrap/Form";
import FormEntry from "./FormEntry.js";

function EditCollectionModal({ collection, handleClose, handleSave, show }) {
  const name = useRef(collection ? collection.colName : null);
  
  if (!show) {
    return (
      <AdaptativeModal
        props={(handleClose, handleSave, show)}
      ></AdaptativeModal>
    );
  }

  const modalTitle = collection.colName
    ? "Edit collection " + collection.colName
    : "Create a new Collection";
  const footer = true;

  const handleSaveCollection = () => {
    handleSave(name.current);
  };

  const modalProps = {
    modalTitle,
    footer,
    handleClose: handleClose,
    handleSave: handleSaveCollection,
    show: show,
  };

  return (
    <AdaptativeModal {...modalProps}>
      <Form noValidate>
        <FormEntry
          defValue={collection.colName}
          label="Collection Name"
          refer={name}
        />
      </Form>
    </AdaptativeModal>
  );
}

export default EditCollectionModal;

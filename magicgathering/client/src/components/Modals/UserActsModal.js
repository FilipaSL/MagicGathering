import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import InfoDisplay from "../InfoDisplay/InfoDisplay.js";
import { Row } from "react-bootstrap";
import AdaptativeModal from "./AdaptativeModal.js";
import CardsModal from "./CardsModal.js";

function UserActsModal({
  user,
  viewModal,
  collections,
  handleViewModal,
  handleViewCardsModal,
  handleViewEditCollectionModal,
  otherUserCardsModalProps,
  handleColDelete,
}) {
  if (!viewModal) {
    return (
      <AdaptativeModal props={(handleColDelete, viewModal)}></AdaptativeModal>
    );
  }

  const modalTitle = "User " + user.userName + " Info";
  const footer = false;
  let showCol;

  const modalProps = {
    modalTitle,
    footer,
    handleClose: handleViewModal,
    show: viewModal,
  };

  if (collections) {
    showCol = collections.map((collection, index) => {
      let displayProps = {
        collection,
        index,
        handleViewCardsModal,
        handleViewEditCollectionModal,
        handleColDelete,
      };
      return <InfoDisplay key={index} {...displayProps}></InfoDisplay>;
    });
  } else {
    showCol = "None collection to show.";
  }

  return (
    <>
      <AdaptativeModal {...modalProps}>
        <Row xs={2} md={3} className="justify-content-center">
          {showCol}
        </Row>
      </AdaptativeModal>
      <CardsModal {...otherUserCardsModalProps}></CardsModal>
    </>
  );
}

export default UserActsModal;

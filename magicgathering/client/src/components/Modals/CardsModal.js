import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AdaptativeModal from "./AdaptativeModal.js";
import InfoDisplay from "../InfoDisplay/InfoDisplay.js";
import Row from "react-bootstrap/Row";

function CardsModal({
  viewCards,
  viewCardsModal,
  handleViewCardsModal,
  colName,
  handleCardDelete,
  handleViewEditCardModal,
}) {
  const modalTitle = "Collection " + colName + " Cards";
  const footer = false;
  let cardsList = [];

  const modalProps = {
    modalTitle,
    footer,
    handleClose: handleViewCardsModal,
    show: viewCardsModal,
  };

  const displayCardProps = {
    isCard: true,
    handleCardDelete,
    handleViewEditCardModal,
    colName,
  };

  if (viewCardsModal && viewCards) {
    cardsList = viewCards.map((card, index) => {
      let cardProps = {
        ...displayCardProps,
        card,
        index,
      };
      return <InfoDisplay key={index} {...cardProps} />;
    });
  }
  else{
    cardsList = "No cards to display."
  }

  return (
    <AdaptativeModal {...modalProps}>
      {cardsList.length > 0 ? (
        <Row xs={2} md={3} className="justify-content-center">
          {cardsList}
        </Row>
      ) : (
        <p> There are no cards on this collection</p>
      )}
    </AdaptativeModal>
  );
}

export default CardsModal;

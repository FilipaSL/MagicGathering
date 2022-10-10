import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import AdaptativeModal from './AdaptativeModal.js';
import InfoDisplay from '../InfoDisplay/InfoDisplay.js';
import Row from 'react-bootstrap/Row';


function CardsModal(props) {
  
    const {viewCards, viewCardsModal, handleViewCardsModal, colName, handleCardDelete, handleViewEditCardModal} = props;
    const modalTitle= "Collection "+ colName + " Cards";
    const footer = false;

    const modalProps = {
      modalTitle,
      footer,
      handleClose: handleViewCardsModal,
      show: viewCardsModal,
    } 

    const displayCardProps = {
      isCard: true,
      handleCardDelete,
      colName
    }

    const cardsList = viewCards.map((card, index)=>{
      let cardProps = {
        ...displayCardProps,
        card,
        index,
        handleViewEditCardModal
      }
      return <InfoDisplay key = {index} {...cardProps} />

    })

    return (
        
        <AdaptativeModal {...modalProps}>
         <Row xs={2} md={3} className="justify-content-center"> {cardsList}</Row>
        </AdaptativeModal>
    );
}

export default CardsModal;

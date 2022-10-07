import React, {useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import AdaptativeModal from './AdaptativeModal.js';
import InfoDisplay from '../DisplayCards/InfoDisplay.js';
import Row from 'react-bootstrap/Row';


function CardsModal(props) {
  
    const {viewCards, viewCardsModal, handleViewCardsModal, colName} = props;
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
      colName
    }

    const cardsList = viewCards.map((card, index)=>{
      let cardProps = {
        ...displayCardProps,
        card,
        index
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

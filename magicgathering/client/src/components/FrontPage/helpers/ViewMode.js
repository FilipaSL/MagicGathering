import InfoDisplay from "../../InfoDisplay/InfoDisplay";
import Row from "react-bootstrap/Row";

//Conditional Rendering according with view mode
const ViewMode = ({
  viewMode,
  filteredCards,
  filteredCollections,
  getCardCol,
  handleCardDelete,
  handleViewEditCardModal,
  handleChangeCardCollection,
  handleViewCardsModal,
  handleViewEditCollectionModal,
  handleColDelete,
}) => {
  let cardList;
  let lists;
  let collectionList;

  //Fill in variable with list of cards to display
  if (filteredCards) {
    cardList = filteredCards.map((card, index) => {
      let displayProps = {
        isCard: true,
        card,
        index,
        getCardCol,
        handleCardDelete,
        handleViewEditCardModal,
        handleChangeCardCollection,
      };
      return <InfoDisplay key={index} {...displayProps}></InfoDisplay>;
    });
  }

  //Fill in variable with list of collections to display
  if (filteredCollections) {
    collectionList = filteredCollections.map((collection, index) => {
      let displayProps = {
        collection,
        index,
        handleViewCardsModal,
        handleViewEditCollectionModal,
        handleColDelete,
      };
      return <InfoDisplay key={index} {...displayProps}></InfoDisplay>;
    });
  }
  switch (viewMode) {
    case 1:
      lists = (
        <div className="items-display">
          <p>Your Cards</p>
          <Row xs={2} md={3} className="justify-content-center">
            {cardList}
          </Row>
        </div>
      );
      break;
    case 2:
      lists = (
        <div className="items-display-minimum ">
          <p>Your Collections</p>
          <Row xs={2} md={3} className="justify-content-center">
            {collectionList}
          </Row>
        </div>
      );
      break;
    case 3:
    default:
      lists = (
        <div className="items-display">
          <p>Your Cards</p>
          <Row xs={2} md={3} className="justify-content-center">
            {cardList}
          </Row>

          <p>Your Collections</p>
          <Row xs={2} md={3} className="justify-content-center">
            {collectionList}
          </Row>
        </div>
      );
  }

  return lists;
};
export default ViewMode;

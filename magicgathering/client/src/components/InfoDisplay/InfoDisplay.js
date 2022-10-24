import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import "./InfoDisplay.css";

function InfoDisplay({
  isCard,
  collection,
  card,
  user,
  cardInfo,
  index,
  handleCardDelete,
  handleColDelete,
  handleUserDelete,
  handleViewEditCardModal,
  handleViewCardsModal,
  handleViewEditCollectionModal,
  handleViewEditUserModal,
  handleChangeCardCollection,
  getCardCol,
}) {
  if (card) {
    return (
      <Card
        className="card"
        key={index}
        bg="Info"
        text="dark"
        style={{ width: "18rem" }}
      >
        <Card.Header as="h5">
          <Card.Title>{card.cardName}</Card.Title>
          {getCardCol ? (
            <Card.Subtitle className="subtitle">
              Collection: {getCardCol(card.collectionId)}
            </Card.Subtitle>
          ) : (
            <></>
          )}
          <Card.Subtitle className="subtitle2">
            Value: {card.value}
          </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Card.Text>{card.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <ButtonGroup aria-label="First group">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleViewEditCardModal(card._id)}
            >
              Edit
            </Button>
            {handleChangeCardCollection ? (
              <>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleChangeCardCollection(card._id)}
                >
                Change Collection
              </Button>
         
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleCardDelete(card._id)}
            >
              Delete
            </Button></>
            ) : (
              <></>
            )}
          </ButtonGroup>   
        </Card.Footer>
      </Card>
    );
  } else if (collection) {
    return (
      <Card
        className="card"
        key={index}
        bg="Info"
        text="dark"
        style={{ width: "18rem" }}
      >
        <Card.Header as="h5"></Card.Header>
        <Card.Body>
          <Card.Title>{collection.colName}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <ButtonGroup aria-label="First group">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleViewEditCollectionModal(collection._id)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline-info"
              onClick={() => handleViewCardsModal(collection._id)}
            >
              View Cards
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleColDelete(collection._id)}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Card.Footer>
      </Card>
    );
  } else if (user) {
    return (
      <Card
        className="card"
        key={index}
        bg="Info"
        text="dark"
        style={{ width: "18rem" }}
      >
        <Card.Header as="h5">
          Fellow User is {user.admin ? "Admin" : "NOT Admin"}
        </Card.Header>
        <Card.Body>
          <Card.Title>Username: {user.userName}</Card.Title>
          <Card.Title>Real Name: {user.realName}</Card.Title>
          <Card.Text>Password: YOU WISH!</Card.Text>
        </Card.Body>
        <Card.Footer>
          <ButtonGroup aria-label="First group">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleViewEditUserModal(user._id)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleUserDelete(user._id)}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Card.Footer>
      </Card>
    );
  }
}

export default InfoDisplay;

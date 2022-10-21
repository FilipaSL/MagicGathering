import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";

import AdaptativeModal from "./AdaptativeModal.js";
import Row from "react-bootstrap/Row";

function CollectionsModal({
  collections,
  unnoficialCol,
  show,
  handleColClick,
  handleClose,
}) {
  const modalTitle = "Choose one from the following collections";
  const footer = false;

  const modalProps = {
    modalTitle,
    footer,
    handleClose,
    show,
  };
  let collectionList = [];

  if (show) {
    collectionList = collections.map((collection, index) => {
      return (
        <Card
          className="collection"
          key={index}
          bg="Info"
          text="dark"
          style={{ width: "18rem" }}
          onClick={() => handleColClick(collection._id)}
        >
          <Card.Header as="h5">
            <Card.Body>
              <Card.Title>{collection.colName}</Card.Title>
            </Card.Body>
          </Card.Header>
        </Card>
      );
    });
    collectionList.push(
      <Card
        className="unnoficialCol"
        key={unnoficialCol._id + "esta"}
        bg="Info"
        text="dark"
        style={{ width: "18rem" }}
        onClick={() => handleColClick(unnoficialCol)}
      >
        <Card.Header as="h5">
          <Card.Body>
            <Card.Title>Out of any collection</Card.Title>
          </Card.Body>
        </Card.Header>
      </Card>
    );
  }

  return (
    <AdaptativeModal {...modalProps}>
      {collectionList.length > 0 ? (
        <Row xs={2} md={3} className="justify-content-center">
          {collectionList}
        </Row>
      ) : (
        <p> There are no collections to display</p>
      )}
    </AdaptativeModal>
  );
}

export default CollectionsModal;

import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import CardsModal from "./Modals/ShowCardsModal";
import EditCardModal from "./Modals/formModals/CardFormModal";
import EditColModal from "./Modals/formModals/ColFormModal";
import EditUserModal from "./Modals/formModals/UserFormModal";
import UserOpsModal from "./Modals/UsersModal";
import HeaderNav from "./HeaderNav";
import InfoDisplay from "./InfoDisplay/InfoDisplay";
import "./UserPage.css";

function UserPage({ loggedUser }) {
  let cardList;
  let lists;
  let collectionList;
  //User cards and collections
  const [collections, setCollections] = useState(null);
  const [cards, setOfficialCards] = useState(null);
  const [users, setUsers] = useState(null);
  const [unOfficialCol, setUnOfficialCol] = useState(null);

  //FilteredCards and collections
  const [filteredCollections, setFilteredCollections] = useState(null);
  const [filteredCards, setFilteredOfficialCards] = useState(null);

  //view collection's cards info
  const [viewCardsModal, setViewCardsModal] = useState(false);
  const [modalColName, setModalColName] = useState(null);
  const [modalCards, setModalCards] = useState(null);

  //delete operations status
  const [deletingCardID, setDeletingCard] = useState(null);
  const [deletingColID, setDeletingCol] = useState(null);

  //Edit Cards Modal
  const [viewEditCardModal, setViewEditCardModal] = useState(false);
  const [cardEditModal, setCardToEditModal] = useState(null);
  const [saveEditedCard, setSaveEditedCard] = useState(null);

  //Edit Collections Modal
  const [viewEditCollectionModal, setViewEditCollectionModal] = useState(false);
  const [collectionEditModal, setCollectionToEditModal] = useState(null);

  //Edit Users Modal
  const [viewUsersModal, setViewUsersModal] = useState(false);
  const [viewEditUsersModal, setViewEditUsersModal] = useState(false);
  const [userEditModal, setUserToEditModal] = useState(null);

  //view Mode
  const [viewMode, setViewMode] = useState(3);

  //GET Operations
  useEffect(() => {
    fetch(`/api/collections/user/${loggedUser._id}`)
      .then((res) => res.json())
      .then((col) => {
        setCollections(col);
        setFilteredCollections(col);
      })
      .catch((error) => {
        console.log(error);
      });

    fetch(`/api/unCollections/user/${loggedUser._id}`)
      .then((res) => res.json())
      .then((colID) => {
        setUnOfficialCol(colID._id);
      })
      .catch((error) => {
        console.log(error);
      });

    fetch(`/api/cards/${loggedUser._id}`)
      .then((res) => res.json())
      .then((cards) => {
        setOfficialCards(cards.flat());
        setFilteredOfficialCards(cards.flat());
      })
      .catch((error) => {
        console.log(error);
      });
    if (loggedUser.admin) {
      fetch(`/api/users`)
        .then((res) => res.json())
        .then((users) => {
          const allUsers = users.filter((user) => user._id !== loggedUser._id);
          setUsers(allUsers);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loggedUser._id]);

  //Delete Operations
  useEffect(() => {
    if (deletingCardID !== null) {
      fetch(`/api/card/${deletingCardID}`, { method: "delete" })
        .then(() => {
          const cardsNiche = cards.filter(
            (card) => card._id !== deletingCardID
          );
          setOfficialCards(cardsNiche);
          setFilteredOfficialCards(cardsNiche);
          setDeletingCard(null);
        })
        .catch((error) => {
          console.log("Error Deleting Card");
        });
    }
  }, [deletingCardID]);

  useEffect(() => {
    if (deletingColID !== null && unOfficialCol !== null) {
      fetch(`/api/collection/${deletingColID}/${unOfficialCol}/`, {
        method: "delete",
      })
        .then(() => {
          const colsNiche = collections.filter(
            (col) => col.id !== deletingColID
          );
          setCollections(colsNiche);
          setFilteredCollections(colsNiche);
          setDeletingCol(null);
        })
        .catch((error) => {});
    }
  }, [deletingColID]);

  //Post methods
  useEffect(() => {
    if (saveEditedCard !== null) {
    }
  }, [saveEditedCard]);

  //Handle Functions

  const handleViewMode = (value) => {
    setViewMode(value);
  };

  const handleViewCardsModal = (colId) => {
    setViewCardsModal(!viewCardsModal);

    if (!viewCardsModal) {
      const nameCollection = collections.find((col) => {
        if (col && col._id == colId) {
          return col.colName;
        }
        return "";
      });

      setModalColName(nameCollection.colName);

      const amostra = cards.filter((card) => {
        return card.collectionId == colId;
      });

      setModalCards(amostra);
    }
  };

  const handleSearch = (word) => {
    //filter Cards
    const cardsNiche = cards.filter((card) =>
      card.cardName.toUpperCase().includes(word.toUpperCase())
    );
    setFilteredOfficialCards(cardsNiche);
    //filterCollections
    const colNiche = collections.filter((col) =>
      col.colName.toUpperCase().includes(word.toUpperCase())
    );
    setFilteredCollections(colNiche);
  };

  const handleCardDelete = (id) => {
    setDeletingCard(id);
  };

  const handleColDelete = (id) => {
    setDeletingCol(id);
  };

  const handleViewEditCardModal = (id) => {
    if (!id) {
      setCardToEditModal({
        cardName: "",
        value: 0,
        description: "",
      });
    }
    setViewEditCardModal(!viewEditCardModal);
    if (!viewEditCardModal) {
      const desiredCard = cards.find((card) => card._id === id);
      if (desiredCard) {
        setCardToEditModal(desiredCard);
      }
    }
  };

  const handleViewEditCollectionModal = (id) => {
    if (!id) {
      setCollectionToEditModal({
        colName: "",
      });
    }
    setViewEditCollectionModal(!viewEditCollectionModal);
    if (!viewEditCollectionModal) {
      const desiredCollection = collections.find(
        (collection) => collection._id === id
      );
      if (desiredCollection) {
        setCollectionToEditModal(desiredCollection);
      }
    }
  };

  const handleSaveEditCollectionModal = (name) => {
    console.log(name);
  };

  const handleSaveEditUsersModal = (name) => {
    console.log(name);
  };

  const handleUserDelete = (name) => {
    console.log(name);
  };

  const handleViewUsersModal = () => {
    setViewUsersModal(!viewUsersModal);
  };

  const handleViewEditUserModal = (id) => {
    console.log(id);
    setViewEditUsersModal(!viewEditUsersModal);
    if (!viewEditUsersModal) {
      const desiredUser = users.find((user) => user._id === id);
      if (desiredUser) {
        setUserToEditModal(desiredUser);
      }
    }
  };

  const handleSaveEditCardModal = (name, valor, description) => {
    //I am editing
    if (cardEditModal._id) {
      const newCard = JSON.stringify({
        cardName: name.value,
        value: valor.value,
        description: description.value,
        collectionId: "634599e5de9a666b84728ee8",
      });

      console.log(newCard);

      fetch(`http://localhost:3001/api/card/${cardEditModal._id}`, {
        method: "PATCH",
        body: newCard,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((cards) => {
          console.log(cards);
        })
        .catch((error) => {
          console.log("Error Editig Card: " + error);
        });
    }
    //I am creating
    else {
      console.log("Pedido de put");
    }

    /* const newCard = `{
            id:${cardEditModal.id},
            cardName:${name.value},
            value:${valor.value},
            description:${description.value},
        }`;*/
  };

  //Props definitions
  const headerProps = {
    handleViewMode,
    handleSearch,
    handleViewEditCardModal,
    handleViewEditCollectionModal,
    handleViewEditUserModal,
    handleViewUsersModal,
    loggedUser,
  };

  const cardsModalProps = {
    viewCardsModal,
    handleViewCardsModal,
    viewCards: modalCards,
    colName: modalColName,
    handleViewEditCardModal,
    handleCardDelete,
  };

  const usersModalProps = {
    viewUsersModal,
    handleViewUsersModal,
    userList: users,
    handleUserEdit: handleViewEditUserModal,
    handleUserDelete,
  };

  const editCardsModalProps = {
    show: viewEditCardModal,
    handleClose: handleViewEditCardModal,
    card: cardEditModal,
    handleSave: handleSaveEditCardModal,
  };

  const editCollectionsModalProps = {
    show: viewEditCollectionModal,
    handleClose: handleViewEditCollectionModal,
    collection: collectionEditModal,
    handleSave: handleSaveEditCollectionModal,
  };

  const editUsersModalProps = {
    show: viewEditUsersModal,
    handleClose: handleViewEditUserModal,
    user: userEditModal,
    handleSave: handleSaveEditUsersModal,
  };

  let getCardCol = (collectionId) => {
    if (collections) {
      let collection = collections.find((col) => col._id == collectionId);

      return collection ? collection.colName : "None";
    }
    return "None";
  };

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
      };
      return <InfoDisplay key={index} {...displayProps}></InfoDisplay>;
    });
  }

  //Fill in variable with list of collections to display
  if (filteredCollections) {
    collectionList = filteredCollections.map((collection, index) => {
      if (collection) {
        let displayProps = {
          collection,
          index,
          handleViewCardsModal,
          handleViewEditCollectionModal,
          handleColDelete,
        };
        return <InfoDisplay key={index} {...displayProps}></InfoDisplay>;
      }
    });
  }

  //Conditional Rendering according with view mode

  switch (viewMode) {
    case 1:
      lists = (
        <div>
          <p>Your Cards</p>
          <Row xs={2} md={3} className="justify-content-center">
            {cardList}
          </Row>
        </div>
      );
      break;
    case 2:
      lists = (
        <div>
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
        <div>
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

  return (
    <div className="userPage">
      <div className="header">
        <HeaderNav {...headerProps} style={{ width: "100%" }}></HeaderNav>
      </div>
      <div className="body">{lists}</div>
      {viewCardsModal ? <CardsModal {...cardsModalProps}></CardsModal> : <></>}
      {viewEditCardModal ? (
        <EditCardModal {...editCardsModalProps}></EditCardModal>
      ) : (
        <></>
      )}
      {viewEditCollectionModal ? (
        <EditColModal {...editCollectionsModalProps}></EditColModal>
      ) : (
        <></>
      )}
      {viewUsersModal ? (
        <UserOpsModal {...usersModalProps}></UserOpsModal>
      ) : (
        <></>
      )}
      {viewEditUsersModal ? (
        <EditUserModal {...editUsersModalProps}></EditUserModal>
      ) : (
        <></>
      )}
    </div>
  );
}

export default UserPage;

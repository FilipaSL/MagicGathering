import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import CardsModal from "./Modals/ShowCardsModal";
import EditCardModal from "./Modals/formModals/CardFormModal";
import EditColModal from "./Modals/formModals/ColFormModal";
import EditUserModal from "./Modals/formModals/UserFormModal";
import UserOpsModal from "./Modals/UsersModal";
import HeaderNav from "./HeaderNav";
import InfoDisplay from "./InfoDisplay/InfoDisplay";
import cardRequests from "../endpoints/cards.endpoint";
import userRequests from "../endpoints/users.endpoint";
import collectionRequests from "../endpoints/collections.endpoint";
import AlertBar from "./AlertBar";
import "./UserPage.css";

function UserPage({ loggedUser, handleUserLogout }) {
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

  //Edit Cards Modal
  const [viewEditCardModal, setViewEditCardModal] = useState(false);
  const [cardEditModal, setCardToEditModal] = useState(null);

  //Edit Collections Modal
  const [viewEditCollectionModal, setViewEditCollectionModal] = useState(false);
  const [collectionEditModal, setCollectionToEditModal] = useState(null);

  //Edit Users Modal
  const [viewUsersModal, setViewUsersModal] = useState(false);
  const [viewEditUsersModal, setViewEditUsersModal] = useState(false);
  const [userEditModal, setUserToEditModal] = useState(null);

  const [viewAlertBar, setViewAlertBar] = useState(false);
  const [alertBarProps, setAlertBarProps] = useState(null);

  //view Mode
  const [viewMode, setViewMode] = useState(3);

  //GET Operationsreturn;
  useEffect(() => {
    collectionRequests.getAllCollectionsFromUser().then((response) => {
      const col = response.data;
      if (houstonWeHaveAnError(response)) return;

      const showCollections = col.filter((elem) => elem.official === 1);
      setCollections(showCollections);
      setFilteredCollections(showCollections);
      const unnColl = col.find((elem) => elem.official === 0);
      setUnOfficialCol(unnColl._id);

      cardRequests.getUserCards(col).then((resp) => {
        cards = resp.data;
        if (houstonWeHaveAnError(resp)) return;

        setOfficialCards(cards);
        setFilteredOfficialCards(cards);
      });
    });

    if (loggedUser.admin) {
      userRequests.getAllUsers().then((users) => {
        const allUsers = users.filter((user) => user._id !== loggedUser._id);
        setUsers(allUsers);
      });
    }
  }, [loggedUser]);

  //Handle Functions

  const handleViewMode = (value) => {
    setViewMode(value);
  };

  const handleViewAlert = (value) => {
    setViewAlertBar(value);
  };

  const handleViewCardsModal = (colId) => {
    setViewCardsModal(!viewCardsModal);

    if (!viewCardsModal) {
      const nameCollection = collections.find((col) => {
        if (col && col._id === colId) {
          return col.colName;
        }
        return "";
      });

      setModalColName(nameCollection.colName);

      const amostra = cards.filter((card) => {
        return card.collectionId === colId;
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

  const handleCardDelete = (deletingCardId) => {
    if (deletingCardId !== null) {
      cardRequests
        .deleteCard(deletingCardId)
        .then((ans) => {
          if (houstonWeHaveAnError(ans)) return;

          const cardsNiche = cards.filter(
            (card) => card._id !== deletingCardId
          );
          setOfficialCards(cardsNiche);
          setFilteredOfficialCards(cardsNiche);
        })
        .catch((error) => {
          houstonWeHaveAnError("Error Deleting Card: " + error);
        });
    }
  };

  const handleColDelete = (deletingColId) => {
    collectionRequests
      .deleteCollection(deletingColId)
      .then((ans) => {
        if (houstonWeHaveAnError(ans)) return;

        const colsNiche = collections.filter(
          (col) => col._id !== deletingColId
        );
        setCollections(colsNiche);
        setFilteredCollections(colsNiche);
      })
      .catch((error) => {
        houstonWeHaveAnError("Error Deleting Collection: " + error);
      });
  };

  const handleUserDelete = (deleteUserId) => {
    userRequests
      .deleteUser(deleteUserId)
      .then((ans) => {
        if (houstonWeHaveAnError(ans)) return;

        const userNiche = collections.filter((col) => col._id !== deleteUserId);
        setUsers(userNiche);
      })
      .catch((error) => {
        houstonWeHaveAnError("Error Deleting User: " + error);
      });
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
    //I am editing
    if (collectionEditModal._id) {
      const newCollection = JSON.stringify({
        colName: name.value,
      });

      collectionRequests
        .updateCollection(collectionEditModal._id, newCollection)
        .then((col) => {
          if (houstonWeHaveAnError(col)) return;

          const newColList = collections.map((coll) => {
            if (coll._id === collectionEditModal._id) {
              return col;
            }
            return coll;
          });
          const filter = newColList.filter((elem) => elem.official === 1);
          setCollections(newColList);
          setFilteredCollections(filter);
        })
        .catch((error) => {
          houstonWeHaveAnError("Error Editing Collection: " + error);
        });
    }
    //I am creating
    else {
      const newCollection = JSON.stringify({
        official: 1,
        colName: name.value,
      });
      collectionRequests
        .createCollection(newCollection)
        .then((newColl) => {
          if (houstonWeHaveAnError(newColl)) return;

          const clone = collections;
          clone.push(newColl);
          setCollections(clone);
        })
        .catch((error) => {
          houstonWeHaveAnError("Error Creating Collection: " + error);
        });
    }
  };

  const handleSaveEditUsersModal = (name) => {
    console.log(name);
  };

  const handleViewUsersModal = () => {
    setViewUsersModal(!viewUsersModal);
  };

  const handleViewEditUserModal = (id) => {
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
      });

      cardRequests
        .updateCard(cardEditModal._id, newCard)
        .then((res) => res.json())
        .then((received) => {
          if (houstonWeHaveAnError(received)) return;

          const alterCards = cards.map((card) => {
            if (card._id === cardEditModal._id) {
              return received;
            }
            return card;
          });
          setOfficialCards(alterCards);
        })
        .catch((error) => {
          houstonWeHaveAnError("Error Editing Card: " + error);
        });
    }
    //I am creating
    else {
      const newCard = JSON.stringify({
        cardName: name.value,
        value: valor.value,
        description: description.value,
        collectionId: unOfficialCol,
      });
      cardRequests
        .createCard(newCard)
        .then((createdCard) => {
          if (houstonWeHaveAnError(createdCard)) return;
          const clone = cards;
          clone.push(createdCard);
          setOfficialCards(clone);
        })
        .catch((error) => {
          houstonWeHaveAnError("Error Creating Card: " + error);
        });
    }
  };

  //Props definitions
  const headerProps = {
    handleViewMode,
    handleSearch,
    handleViewEditCardModal,
    handleViewEditCollectionModal,
    handleViewEditUserModal,
    handleViewUsersModal,
    handleUserLogout,
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
      let collection = collections.find((col) => col._id === collectionId);

      return collection ? collection.colName : "None";
    }
    return "None";
  };

  const houstonWeHaveAnError = (obj) => {
    if (obj.data == null) {
      setViewAlertBar(true);

      setAlertBarProps({
        show: viewAlertBar,
        handleClose: handleViewAlert,
        message: obj.message,
        variant: "danger",
      });
      return false;
    }
    return true;
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
      <AlertBar {...alertBarProps}></AlertBar>
      <div className="header">
        <HeaderNav {...headerProps} style={{ width: "100%" }}></HeaderNav>
      </div>
      <div className="body">{lists}</div>
      <CardsModal {...cardsModalProps}></CardsModal>

      <EditCardModal {...editCardsModalProps}></EditCardModal>

      <EditColModal {...editCollectionsModalProps}></EditColModal>

      <UserOpsModal {...usersModalProps}></UserOpsModal>

      <EditUserModal {...editUsersModalProps}></EditUserModal>
    </div>
  );
}

export default UserPage;

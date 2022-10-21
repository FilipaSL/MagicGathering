import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import CardsModal from "../Modals/CardsModal";
import EditCardModal from "../Modals/formModals/CardFormModal";
import EditColModal from "../Modals/formModals/ColFormModal";
import EditUserModal from "../Modals/formModals/UserFormModal";
import UserOpsModal from "../Modals/UsersModal";
import CollectionsModal from "../Modals/CollectionsModal";
import HeaderNav from "../HeaderNav/HeaderNav";
import InfoDisplay from "../InfoDisplay/InfoDisplay";
import cardRequests from "../../endpoints/cards.endpoint";
import userRequests from "../../endpoints/users.endpoint";
import collectionRequests from "../../endpoints/collections.endpoint";
import AlertBar from "../AlertBar/AlertBar";
import "./FrontPage.css";

function FrontPage({ loggedUser, handleUserLogout }) {
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

  //view alerts
  const [viewAlertBar, setViewAlertBar] = useState(false);
  const [alertBarProps, setAlertBarProps] = useState(null);

  //Choose card collection
  const [viewCollectionModal, setViewCollectionModal] = useState(false);
  const [cardToCollectionID, setCardToCollId] = useState(null);

  //view Mode
  const [viewMode, setViewMode] = useState(3);

  //GET Operationsreturn;
  useEffect(() => {
    collectionRequests.getAllCollectionsFromUser().then((response) => {
      const col = response.data;
      if (houstonWeHaveAnAlert(response)) {
        return;
      }

      const showCollections = col.filter((elem) => elem.official === 1);
      setCollections(showCollections);
      setFilteredCollections(showCollections);
      const unnColl = col.find((elem) => elem.official === 0);
      setUnOfficialCol(unnColl._id);

      cardRequests.getUserCards(col).then((resp) => {
        let cardData = resp.data;
        if (houstonWeHaveAnAlert(resp)) {
          return;
        }
        setOfficialCards(cardData);
        setFilteredOfficialCards(cardData);
      });
    });

    if (loggedUser.admin) {
      userRequests.getAllUsers().then((data) => {
        const usersData = data.data;
        if (houstonWeHaveAnAlert(data)) {
          return;
        }

        const allUsers = usersData.filter(
          (user) => user._id !== loggedUser._id
        );
        setUsers(allUsers);
      });
    } else {
      setUsers([loggedUser]);
    }
  }, [loggedUser]);

  //Handle Functions

  const handleViewMode = (value) => {
    setViewMode(value);
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
          if (houstonWeHaveAnAlert(ans, "Card Deleted!")) {
            return;
          }

          const cardsNiche = cards.filter(
            (card) => card._id !== deletingCardId
          );
          setOfficialCards(cardsNiche);
          setFilteredOfficialCards(cardsNiche);
        })
        .catch((error) => {
          houstonWeHaveAnAlert("Error Deleting Card: " + error);
        });
    }
  };

  const handleColDelete = (deletingColId) => {
    collectionRequests
      .deleteCollection(deletingColId)
      .then((ans) => {
        if (houstonWeHaveAnAlert(ans, "Collection Deleted!")) {
          return;
        }

        const colsNiche = collections.filter(
          (col) => col._id !== deletingColId
        );
        setCollections(colsNiche);
        setFilteredCollections(colsNiche);
      })
      .catch((error) => {
        houstonWeHaveAnAlert("Error Deleting Collection: " + error);
      });
  };

  const handleUserDelete = (deleteUserId) => {
    userRequests
      .deleteUser(deleteUserId)
      .then((ans) => {
        if (houstonWeHaveAnAlert(ans, "User Deleted")) {
          return;
        }

        const userNiche = collections.filter((col) => col._id !== deleteUserId);
        setUsers(userNiche);
      })
      .catch((error) => {
        houstonWeHaveAnAlert("Error Deleting User: " + error);
      });
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
          if (houstonWeHaveAnAlert(col, "Collection Updated!")) {
            return;
          }

          const newColList = updateArray(
            collections,
            col.data,
            collectionEditModal._id
          );

          setCollections(newColList);
          setFilteredCollections(newColList);
          setViewEditCollectionModal(false);
        })
        .catch((error) => {
          houstonWeHaveAnAlert("Error Editing Collection: " + error);
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
          if (houstonWeHaveAnAlert(newColl, "Collection Created!")) {
            return;
          }

          const clone = collections;
          clone.push(newColl.data);
          setCollections(clone);

          setFilteredCollections(clone);
          setViewEditCollectionModal(false);
        })
        .catch((error) => {
          houstonWeHaveAnAlert("Error Creating Collection: " + error);
        });
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
        .then((received) => {
          if (houstonWeHaveAnAlert(received, "Card Edited!")) {
            return;
          }

          const newCardList = updateArray(
            cards,
            received.data,
            cardEditModal._id
          );

          setOfficialCards(newCardList);

          setFilteredOfficialCards(newCardList);
          setViewEditCardModal(false);
        })
        .catch((error) => {
          houstonWeHaveAnAlert("Error Editing Card: " + error);
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
          if (houstonWeHaveAnAlert(createdCard, "Card Created!")) {
            return;
          }
          const clone = cards;
          clone.push(createdCard.data);

          setOfficialCards(clone);
          setFilteredOfficialCards(clone);
          setViewEditCardModal(false);
        })
        .catch((error) => {
          houstonWeHaveAnAlert("Error Creating Card: " + error);
        });
    }
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

  const handleSaveEditUsersModal = (userName, realName, admin) => {
    if (userEditModal._id) {
      const newUser = JSON.stringify({
        userName: userName.value,
        realName: realName.value,
        admin: userEditModal.admin === 1 ? admin.value : userEditModal.admin,
      });

      userRequests
        .updateUser(userEditModal._id, newUser)
        .then((received) => {
          if (houstonWeHaveAnAlert(received, "User Edited!")) {
            return;
          }

          const newUserList = updateArray(
            users,
            received.data,
            userEditModal._id
          );

          setUsers(newUserList);
          setViewEditUsersModal(false);
        })
        .catch((error) => {
          houstonWeHaveAnAlert("Error Editing User: " + error);
        });
    }
  };

  const handleViewUsersModal = () => {
    setViewUsersModal(!viewUsersModal);
  };
  //receives cardID
  const handleChangeCardCollection = (id) => {
    setCardToCollId(id);
    setViewCollectionModal(true);
  };

  const handleUpdateCardColl = (id) => {
    const newCard = JSON.stringify({
      collectionId: id,
    });

    cardRequests
      .updateCard(cardToCollectionID, newCard)
      .then((received) => {
        if (houstonWeHaveAnAlert(received, "Card Collection Changed!")) {
          return;
        }

        const newCardList = updateArray(
          cards,
          received.data,
          cardToCollectionID
        );

        setOfficialCards(newCardList);
        setFilteredOfficialCards(newCardList);
        setViewCollectionModal(false);
      })
      .catch((error) => {
        houstonWeHaveAnAlert("Error Editing Card: " + error);
      });
    setViewCollectionModal(false);
  };

  const handleViewEditUserModal = (id) => {
    setViewEditUsersModal(!viewEditUsersModal);
    if (!viewEditUsersModal) {
      const desiredUser = users.find((user) => user._id === id);
      if (desiredUser) {
        setUserToEditModal(desiredUser);
      } else {
        setUserToEditModal(loggedUser);
      }
    }
  };

  //Props definitions
  const headerProps = {
    viewMode: handleViewMode,
    search: handleSearch,
    editCardModal: handleViewEditCardModal,
    editColModal: handleViewEditCollectionModal,
    editUserModal: handleViewEditUserModal,
    userModal: handleViewUsersModal,
    logout: handleUserLogout,
    loggedUser,
  };

  const cardsModalProps = {
    viewCardsModal,
    handleViewCardsModal,
    viewCards: modalCards,
    colName: modalColName,
    handleViewEditCardModal,
    handleCardDelete,
    handleChangeCardCollection,
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

  const chooseNewColectionModalProps = {
    collections,
    unnoficialCol: unOfficialCol,
    show: viewCollectionModal,
    handleColClick: handleUpdateCardColl,
    handleClose: setViewCollectionModal,
  };

  let getCardCol = (collectionId) => {
    if (collections) {
      let collection = collections.find((col) => col._id === collectionId);

      return collection ? collection.colName : "None";
    }
    return "None";
  };

  const updateArray = (toUpdate, objectToAlter, checker) => {
    const newArray = toUpdate.map((obj) => {
      if (obj._id === checker) {
        return objectToAlter;
      }
      return obj;
    });
    return newArray;
  };

  const houstonWeHaveAnAlert = (obj, message = null) => {
    if (obj.data === null) {
      setViewAlertBar(true);
      console.log("Houston we had an error");
      setAlertBarProps({
        handleClose: () => setViewAlertBar(false),
        message: obj.message,
        variant: "danger",
      });
      return true;
    } else if (message) {
      setViewAlertBar(true);
      setAlertBarProps({
        handleClose: () => setViewAlertBar(false),
        message: message,
        variant: "success",
      });
    }
    return false;
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
    <div className="FrontPage">
      <div className="header">
        <HeaderNav {...headerProps} style={{ width: "100%" }}></HeaderNav>
      </div>
      {viewAlertBar ? <AlertBar {...alertBarProps}></AlertBar> : <></>}

      <div className="body">{lists}</div>
      <CardsModal {...cardsModalProps}></CardsModal>

      <EditCardModal {...editCardsModalProps}></EditCardModal>

      <EditColModal {...editCollectionsModalProps}></EditColModal>

      <UserOpsModal {...usersModalProps}></UserOpsModal>

      <EditUserModal {...editUsersModalProps}></EditUserModal>

      <CollectionsModal {...chooseNewColectionModalProps}></CollectionsModal>
    </div>
  );
}

export default FrontPage;
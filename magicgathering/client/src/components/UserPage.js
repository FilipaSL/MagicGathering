import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import CardsModal from './Modals/CardsModal'
import EditCardModal from './Modals/EditCardModal'
import HeaderNav from './HeaderNav';
import InfoDisplay from './InfoDisplay/InfoDisplay';
import "./UserPage.css";

function UserPage(props) {
    let cardList;
    let lists;
    let collectionList;

    const {loggedUser} = props;

    //User cards and collections
    const [collections, setCollections] = useState(null);
    const [cards, setOfficialCards] = useState(null);
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
    const [cardEditModal, setCardToEditModal] = useState(null)
    const [saveEditedCard, setSaveEditedCard] = useState(null)


    //view Mode
    const [viewMode, setViewMode] = useState(3);


    //GET Operations
    useEffect(() => {
        fetch(`/api/collections/user/${loggedUser._id}`)
        .then((res) => res.json())
        .then((col) =>{
            setCollections(col)
            setFilteredCollections(col)
        }
            )
        .catch(
            (error) => { console.log(error) })

        fetch(`/api/unCollections/user/${loggedUser._id}`)
            .then((res) => res.json())
            .then((colID) =>{
                setUnOfficialCol(colID._id)
            }
                )
            .catch(
                (error) => { console.log(error) })

        fetch(`/api/cards/${loggedUser._id}`)
            .then((res) => res.json())
            .then((cards) =>{
                setOfficialCards(cards.flat())
                setFilteredOfficialCards(cards.flat())
            }
                    )
            .catch((error) => { console.log(error) })

    }, [loggedUser._id]);

    //Delete Operations
    useEffect(()=>{
        if(deletingCardID!==null){
            fetch(`/api/card/${deletingCardID}`, {method: 'delete'})
            .then(()=>{
                const cardsNiche = cards.filter((card)=>card.id!==deletingCardID);
                setOfficialCards(cardsNiche);
                setFilteredOfficialCards(cardsNiche);
                setDeletingCard(null); 
            })
            .catch((error) => {             
                console.log("Error Deleting Card")
                })
        }
       
    }, [deletingCardID]);

    useEffect(()=>{
        if(deletingColID!== null && unOfficialCol !== null){
            fetch(`/api/collection/${deletingColID}/${unOfficialCol}/`, {method: 'delete'})
            .then(() =>{
                const colsNiche = collections.filter((col)=>col.id!==deletingColID);
                setCollections(colsNiche);
                setFilteredCollections(colsNiche);
                setDeletingCol(null);
            }
                    )
            .catch((error) => { })
        }
      
    }, [deletingColID])

    //Post methods 
    useEffect(()=>{
        if(saveEditedCard !== null){
            fetch(`/api/card/${cardEditModal._id}`, 
            {method: 'post',
            body: saveEditedCard,
            "Content-Type": "application/json"})
            .then((res) => res.json())
            .then((cards)=>{
                console.log(cards)
            })
            .catch((error) => {  console.log("Error Editig Card: "+ error)})
        }
        
    }, [saveEditedCard]);


    //Handle Functions

    const handleViewMode =(value)=>{
        setViewMode(value);
    }

    const handleViewCardsModal = (colId)=>{
        setViewCardsModal(!viewCardsModal);

        if(!viewCardsModal){
            const nameCollection = collections.find((col)=>{
                if(col && col.id==colId){
                    return col.colName
                }
                return ""
            });

            setModalColName(nameCollection.colName);

            const amostra = cards.filter((card)=>card.collectionId == colId);
    
            setModalCards(amostra);
        }

    }

    const handleSearch = (word) =>{
        //filter Cards
        const cardsNiche = cards.filter((card)=>card.cardName.toUpperCase().includes(word.toUpperCase()))
        setFilteredOfficialCards(cardsNiche)
        //filterCollections
        const colNiche = collections.filter((col)=>col.colName.toUpperCase().includes(word.toUpperCase()))
        setFilteredCollections(colNiche)
    }

    const handleResetSearch =()=>{
        setFilteredOfficialCards(cards);
        setFilteredCollections(collections);
    }

    const handleCardDelete = (id)=>{
        setDeletingCard(id);
    }

    const handleColDelete = (id)=>{
        console.log("Collection to delete:::"+ id);
        setDeletingCol(id);
    }

    const handleViewEditCardModal = (id) =>{
        setViewEditCardModal(!viewEditCardModal)
        if(!viewEditCardModal){
            const desiredCard = cards.find((card)=> card._id == id);
            if(desiredCard){
                setCardToEditModal(desiredCard);
    
            }
        }
    }

    const handleSaveEditCardModal = (name, valor, description) =>{
       /* const newCard = `{
            id:${cardEditModal.id},
            cardName:${name.value},
            value:${valor.value},
            description:${description.value},
        }`;*/

        const newCard = JSON.stringify(
            {
                _id: cardEditModal._id,
                cardName: name.value,
                value: valor.value,
                description: description.value
            }
        )
        setSaveEditedCard(newCard);   
    }



    //Props definitions
    const headerProps = {
        handleViewMode,
        handleSearch,
        loggedUser
    }

    const cardsModalProps = {
        viewCardsModal,
        handleViewCardsModal,
        viewCards: modalCards,
        colName: modalColName,
        handleViewEditCardModal,
        handleCardDelete
    }

    const editCardsModalProps = {
        show: viewEditCardModal,
        handleClose: handleViewEditCardModal,
        card: cardEditModal,
        handleSave: handleSaveEditCardModal
    }
    
    let getCardCol = (cardId)=>{
        if(collections){
            let cardName = collections.find((col)=>col.id == cardId)

            return cardName ? cardName.colName : "None";
        }
        return "None";
    }

    //Fill in variable with list of cards to display
    if(filteredCards){
        cardList = filteredCards.map((card, index)=>{
            let displayProps= {
                isCard: true,
                card, 
                index, 
                getCardCol,
                handleCardDelete,
                handleViewEditCardModal
            }
            return(
                <InfoDisplay key ={index} {...displayProps}></InfoDisplay>
             )
         })
    }


    //Fill in variable with list of collections to display
    if(filteredCollections){
        collectionList = filteredCollections.map((collection, index)=>{
            if(collection){
                let displayProps= {
                    collection, 
                    index, 
                    handleViewCardsModal,
                    handleColDelete
                }
                return(
                   <InfoDisplay key ={index} {...displayProps}></InfoDisplay>
                 )
            }
         })
    }

    //Conditional Rendering according with view mode

    switch(viewMode){
        case 1:
            lists = <div> <p>Your Cards</p>

            <Row xs={2} md={3} className="justify-content-center"> {cardList}</Row></div>
            break;
        case 2:
            lists = <div> <p>Your Collections</p>
            <Row xs={2} md={3} className="justify-content-center"> {collectionList}</Row></div>
            break;
        case 3:
        default:
            lists = <div> 
                <p>Your Cards</p>
                <Row xs={2} md={3} className="justify-content-center"> {cardList}</Row>

                <p>Your Collections</p>
                <Row xs={2} md={3} className="justify-content-center"> {collectionList}</Row>
            </div>
    }
    
    return (
        <div className='userPage'>
            <div className='header'>
                <HeaderNav {...headerProps} style={{ width: '100%' }}></HeaderNav>
            </div>
            <div className='body'>
                {lists}
            </div>
           {viewCardsModal ? <CardsModal {...cardsModalProps}></CardsModal>: <></>}
           {viewEditCardModal ? <EditCardModal {...editCardsModalProps}></EditCardModal>: <></>}


        </div>
    );
}

export default UserPage;
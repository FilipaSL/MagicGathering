import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import CardsModal from './Modals/CardsModal'
import HeaderNav from './HeaderNav';
import DisplayCard from './DisplayCards/InfoDisplay';
import "./UserPage.css";

function UserPage(props) {
    let cardList;
    let lists;
    let collectionList;

    const {loggedUser} = props;

    //User cards and collections
    const [collections, setCollections] = useState(null);
    const [cards, setOfficialCards] = useState(null);

    //FilteredCards and collections
    const [filteredCollections, setFilteredCollections] = useState(null);
    const [filteredCards, setFilteredOfficialCards] = useState(null);

    //view collection's cards info
    const [viewCardsModal, setViewCardsModal] = useState(false);
    const [modalColName, setModalColName] = useState(null);
    const [modalCards, setModalCards] = useState(null);

    //view Mode
    const [viewMode, setViewMode] = useState(3);

    useEffect(() => {
        fetch(`/collections/user/${props.loggedUser.id}`)
        .then((res) => res.json())
        .then((col) =>{
            setCollections(col)
            setFilteredCollections(col)
        }
            )
        .catch(
            (error) => { })

        fetch(`/cards/${props.loggedUser.id}`)
            .then((res) => res.json())
            .then((cards) =>{
                setOfficialCards(cards.flat())
                setFilteredOfficialCards(cards.flat())
            }
                    )
            .catch((error) => { })

    }, [props.loggedUser.id]);

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

    const headerProps = {
        handleViewMode,
        handleSearch,
        loggedUser
    }

    const cardsModalProps = {
        viewCardsModal,
        handleViewCardsModal,
        viewCards: modalCards,
        colName: modalColName
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
                getCardCol
            }
            return(
                <DisplayCard key ={index} {...displayProps}></DisplayCard>
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
                    handleViewCardsModal
                }
                return(
                   <DisplayCard key ={index} {...displayProps}></DisplayCard>
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

        </div>
    );
}

export default UserPage;
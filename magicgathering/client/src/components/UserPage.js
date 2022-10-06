import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import HeaderNav from './HeaderNav';
import "./UserPage.css";

function UserPage(props) {
    let cardList;
    let collectionList;
    const {loggedUser} = props;

    const [viewMode, setViewMode] = useState(3)

    const handleViewMode =(value)=>{
        console.log(value);
        setViewMode(value);
    }

    const headerProps = {
        handleViewMode,
        loggedUser
    }

    if(props.cards){
        cardList = props.cards.map((card, index)=>{
            return(
              <Card className = "card" key= {index} bg= 'Info' text = 'dark' style={{ width: '18rem' }}>
                 <Card.Header as="h5">
                    <Card.Title>{card.cardName}</Card.Title>
                    <ButtonGroup aria-label="First group">
                        <Button variant="">Edit</Button>
                        <Button variant="secondary">Delete</Button>
                    </ButtonGroup>
                </Card.Header>
                 <Card.Body>
                     <Card.Text>
                     {card.description}
                     </Card.Text>
                 </Card.Body>
             </Card>
             )
         })
    }

    if(props.collections){
        collectionList = props.collections.map((collection, index)=>{
            return(
              <Card className = "card"  key= {index} bg= 'Info' text = 'dark' style={{ width: '18rem' }}>
                <Card.Header as="h5">
                <ButtonGroup aria-label="First group">
                        <Button variant="">Edit</Button>
                        <Button variant="secondary">Delete</Button>
                    </ButtonGroup>

                </Card.Header>
                 <Card.Img vaiant="top" src="../logo.svg" />
                 <Card.Body>
                     <Card.Title>{collection.colName}</Card.Title>
                 </Card.Body>
             </Card>
             )
         })
    }

    let lists;
    switch(viewMode){
        case 1:
            lists = <> <p>Your Cards</p>

            <div className='cardList'> {cardList}</div></>
            break;
        case 2:
            lists = <> <p>Your Collections</p>
            <div className='cardList'> {collectionList}</div></>
            break;
        case 3:
        default:
            lists = <> <p>Your Cards</p>

            <div className='cardList'> {cardList}</div>

            <p>Your Collections</p>
            <div className='cardList'> {collectionList}</div>
            </>
    }
    
    return (
        <div className='userPage'>
            <div className='header'>
                <HeaderNav {...headerProps}></HeaderNav>
            </div>
            <div className='body'>
                {lists}

            </div>
           

        </div>
    );
}

export default UserPage;
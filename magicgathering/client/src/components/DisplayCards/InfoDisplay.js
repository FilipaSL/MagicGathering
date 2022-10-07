import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import "./InfoDisplay.css";


function InfoDisplay(props){
                    
    const {isCard, collection, card, index} = props;

    if(isCard && card){
        return (
            <Card className = "card" key= {index} bg= 'Info' text = 'dark' style={{ width: '18rem' }}>
                <Card.Header as="h5">
                    <Card.Title>{card.cardName}</Card.Title>
                    {props.getCardCol? 
                    <Card.Subtitle className="subtitle">Collection: {props.getCardCol(card.collectionId)}</Card.Subtitle>: 
                    <></>}
                    <Card.Subtitle className="subtitle2">Value: {card.value}</Card.Subtitle>
                </Card.Header>
                <Card.Body>
                    <Card.Text>{card.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <ButtonGroup aria-label="First group">
                        <Button  size = "sm" variant="secondary">Edit</Button>
                        <Button  size = "sm" variant="secondary">Delete</Button>
                    </ButtonGroup>
                </Card.Footer>
            </Card>
            ) 
    }

   else if(collection){
    return (
        <Card className = "card"  key= {index} bg= 'Info' text = 'dark' style={{ width: '18rem' }}>
                <Card.Header as="h5">
                </Card.Header>
                 <Card.Img vaiant="top" src="../logo.svg" />
                 <Card.Body>
                     <Card.Title>{collection.colName}</Card.Title>
                 </Card.Body>
                 <Card.Footer>
                    <ButtonGroup aria-label="First group" >
                            <Button size = "sm" variant="light">Edit</Button>
                            <Button size = "sm" variant="outline-info" onClick={()=>props.handleViewCardsModal(collection.id)}>View Cards</Button>
                            <Button size = "sm" variant="outline-secondary">Delete</Button>
                        </ButtonGroup>
                 </Card.Footer>
             </Card>
    )
   }
        
    

}

export default InfoDisplay;
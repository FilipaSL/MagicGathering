import {useRef} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function HeaderNav(props){
    const searchWord = useRef(null);

    const handleView=(value)=> {
        props.handleViewMode(value);
    }
  
    
    const handleSearch=()=> {
        props.handleSearch(searchWord.current.value)
    }

   
    const handleLogout=()=> {    }

    return (
        <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">Main Menu</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <NavDropdown title="View Options" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1" onClick={()=>handleView(1)}>Cards</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2" onClick={()=>handleView(2)}>
                                    Collections
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3" onClick={()=>handleView(3)}>Both</NavDropdown.Item>
                            
                            </NavDropdown>
                            <NavDropdown title="Filter" id="basic-nav-dropdown">
                                    <InputGroup className="mb-3 w-auto">
                                        <Form.Control
                                        autoFocus
                                        placeholder="Search for a Collection or a Card"
                                        aria-label="Search for a Collection or a Card"
                                        aria-describedby="basic-addon2"
                                        className="mx-3 my-2 w-auto"
                                        ref= {searchWord}
                                        />
                                        <Button variant="outline-secondary" id="button-addon2" onClick={handleSearch}>
                                        Search
                                        </Button>
                                    </InputGroup>
                            </NavDropdown>
                        </Nav>
                        </Navbar.Collapse>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Signed in as: <a href="#login">{props.loggedUser.realName}</a>
                            </Navbar.Text>
                            <Nav.Link href="#action2" onClick={()=>handleLogout()}>Logout</Nav.Link>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
    )
}

export default HeaderNav;
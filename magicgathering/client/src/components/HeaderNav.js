
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function HeaderNav(props){
    const handleView=(value)=> {
        props.handleViewMode(value);
    }
  
    
    const handleSearch=()=> {
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
                            <NavDropdown title="Operations" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1" onClick={handleSearch}>Search</NavDropdown.Item>
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
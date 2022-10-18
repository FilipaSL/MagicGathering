import { useRef } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function HeaderNav({
  handleViewMode,
  handleSearch,
  handleViewEditCardModal,
  handleViewEditCollectionModal,
  handleViewEditUserModal,
  handleViewUsersModal,
  handleUserLogout,
  loggedUser,
}) {
  const searchWord = useRef(null);

  const handleView = (value) => {
    handleViewMode(value);
  };

  const handleSearchInput = () => {
    handleSearch(searchWord.current.value);
  };

  const handleLogout = () => {
    handleUserLogout();
  };

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">Main Menu</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="View Options" id="basic-nav-dropdown">
              <NavDropdown.Item
                href="#action/3.1"
                onClick={() => handleView(1)}
              >
                Cards
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.2"
                onClick={() => handleView(2)}
              >
                Collections
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.3"
                onClick={() => handleView(3)}
              >
                Both
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Operations" id="basic-nav-dropdown">
              <NavDropdown.Item
                href="#action/3.1"
                onClick={() => handleViewEditCardModal()}
              >
                Add Card
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.2"
                onClick={() => handleViewEditCollectionModal()}
              >
                Add Collection
              </NavDropdown.Item>
              {loggedUser.admin ? (
                <NavDropdown.Item
                  href="#action/3.3"
                  onClick={() => handleViewUsersModal()}
                >
                  Manage Users
                </NavDropdown.Item>
              ) : (
                <></>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse>
          <InputGroup size="sm">
            <Form.Control
              autoFocus
              placeholder="Search for a Collection or a Card"
              aria-label="Search for a Collection or a Card"
              aria-describedby="basic-addon"
              className="mx-3 my-2 w-auto"
              ref={searchWord}
            />
          </InputGroup>
          <Button
            variant="outline-secondary"
            id="button-addon"
            size="sm"
            onClick={handleSearchInput}
          >
            Search
          </Button>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as:{" "}
            <a
              href="#login"
              onClick={() => handleViewEditUserModal(loggedUser._id)}
            >
              {loggedUser.realName}
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link href="#action" onClick={() => handleLogout()}>
            Logout
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderNav;

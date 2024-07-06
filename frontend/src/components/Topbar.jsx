import { useNavigate } from "react-router-dom";
import "./topbar.css";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { handleSuccess } from "../utils";

export default function Topbar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <Navbar expand="lg" className="bg-dark navbar-dark customNavBar">
      <Container>
        <Navbar.Brand onClick={() => navigate("/home")}>Gamebook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="">Home</Nav.Link>
            <Nav.Link href="">Link</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <NavDropdown
              title={
                <img
                  src="https://picsum.photos/200"
                  alt="Avatar"
                  className="avatar"
                />
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>My profile</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/my-games")}>
                My games
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item>
                {/*//! SIGNOUT BUTTON */}
                <button onClick={handleSignOut} className="btn btn-danger">
                  Sign Out
                </button>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

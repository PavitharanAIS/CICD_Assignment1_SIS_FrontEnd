import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">SIS</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Student Info</Nav.Link>
                        <Nav.Link href="/aboutMe">About Me</Nav.Link>

                    </Nav>
                    <Nav className={"align-right"}>
                        <Nav.Link href="/logout">Logout</Nav.Link>
                    </Nav>
                </Container>
        </Navbar>
    );
}

export default NavBar;
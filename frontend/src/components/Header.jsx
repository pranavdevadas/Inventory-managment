import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useLogoutMutation } from "../slice/userApiSlice";
import { logout } from "../slice/authSlice";
import {toast} from 'react-toastify'

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation() 

  const logoutHandler= async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')
      toast.success('Logout Success')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Inventory</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Login
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Register
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="d-flex flex-column bg-dark"
      style={{ width: "250px", height: "100vh" }} // Sidebar styling
    >
      <Nav className="flex-column" defaultActiveKey="/admin/home">
        <Nav.Link as={Link} to="/admin/home">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/product">
          Product
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/orders">
          Orders
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default Sidebar;

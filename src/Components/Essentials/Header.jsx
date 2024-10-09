import React from "react";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary navigationBar py-2">
      <Container>
        <Navbar.Brand href="/dashboard"><h1>Saarthi</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto pe-3">
            <Nav.Link href="/dashboard" className="mx-2">Home</Nav.Link>
            <Nav.Link href="/about" className="mx-2">About</Nav.Link>
            <NavDropdown title="Services" id="basic-nav-dropdown" className="mx-2">
              <NavDropdown.Item href="/care/Health%20Care%20Assistance">Health Care</NavDropdown.Item>
              <NavDropdown.Item href="/care/Leisure%20Care">Leisure Care</NavDropdown.Item>
              <NavDropdown.Item href="/care/Companion%20Care">Companion Care</NavDropdown.Item>
              <NavDropdown.Item href="/care/Rehabilitation">Rehabilitation</NavDropdown.Item>
              <NavDropdown.Item href="/care/Mental%20Health%20Care">Mental Health Care</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/care/Emergency%20Care%20Assistance">Emergency Care</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse> 
      </Container>
    </Navbar>
  );
}
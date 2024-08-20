import React from "react";
import { Container, Navbar } from "react-bootstrap";
import styles from "./css/Header.module.css";

const Header = () => {
  return (
    <Navbar expand="lg" className={styles.headerNavbar}>
      <Container style={{ maxWidth: "93%" }}>
        <Navbar.Brand href="/" style={{ color: "white" }}>
          <h1 style={{ color: "#56c9aa" }}>Seolyu</h1>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;

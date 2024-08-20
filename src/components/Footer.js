import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./css/Footer.module.css";

const Footer = () => {
  return (
    <>
      <Container fluid className={styles.footerContainer}>
        <Row>
          <Col style={{ marginLeft: "50px" }}>© 2024 Seoluy</Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;

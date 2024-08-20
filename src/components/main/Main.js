import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "../css/Main.module.css";
import { useRouter } from "next/router";

const Main = () => {
  const router = useRouter();

  return (
    <Container fluid className={styles.bodyContainer}>
      <Row className={styles.row}>
        <Col md={6} className={styles.leftCol}>
          <h1 className={styles.h1Title}>Seolyu</h1>
          <Button onClick={() => router.push("/new")} className={styles.buttonRequest}>
            서류 무료 검토
          </Button>
        </Col>
        <Col md={6} className={styles.rightCol}>
          <div className={styles.imageContainer}>
            <img src="/image1.png" alt="Photo 1" className={styles.imgTop} />
            <img src="/image2.png" alt="Photo 2" className={styles.imgMiddle} />
            <img src="/image3.png" alt="Photo 3" className={styles.imgBottom} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Main;

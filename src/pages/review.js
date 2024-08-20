import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../components/css/Main.module.css";

const review = () => {
  return (
    <>
      <Header />
      <Container fluid className={styles.bodyContainer}>
        <Row className={styles.row}>
          <Col md={6} className={styles.leftCol}>
            <h1>빅테크 개발자의 </h1>
            <h1 style={{ fontStyle: "normal", color: "#56c9aa" }}> 무료 서류 검토</h1>
            <Button onClick={() => router.push("/review")} className={styles.buttonRequest}>
              신청하기
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
      <Footer />
    </>
  );
};

export default review;

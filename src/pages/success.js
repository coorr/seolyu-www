import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import styles from "../components/css/Success.module.css";

const Success = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <Container fluid className={styles.container}>
      <br />
      <Col className={styles.topImgCol}></Col>
      <br />
      <Col className={styles.topTextAreaCol}>
        <div className={styles.topTextBoxDiv}>
          <div className={styles.topTextBorderDiv}></div>
          <h3 className={styles.successTitle}>신청이 완료되었습니다!</h3>
          <p className={styles.successMessage}>
            귀하의 서류 검토 신청이 성공적으로 접수되었습니다. <br />
            서류 검토 결과는 7일 이내에 이메일로 발송될 예정입니다.
          </p>
          <Button variant="dark" className={styles.homeButton} onClick={handleGoHome}>
            홈으로 이동
          </Button>
        </div>
      </Col>
    </Container>
  );
};

export default Success;

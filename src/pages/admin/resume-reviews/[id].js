import React, { useState, useEffect } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header";
import AdminNavigation from "../../../components/AdminNavigation";
import styles from "../../../components/css/ResumeReview.module.css";
import { RESUME_REVIEWS } from "../../../reducers/resumeReviews";
import ResumeDetailModal from "../resume-detail-modal";

const ResumeReview = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id: resumeReviewId } = router.query;
  const { resumeReviewDetail } = useSelector((state) => state.resumeReviews);
  const [formData, setFormData] = useState({
    initialFeedbackTitle: "",
    initialFeedbackContent: "",
    midtermFeedbackTitle: "",
    midtermFeedbackContent: "",
    finalFeedbackTitle: "",
    finalFeedbackContent: "",
    additionalFeedbackTitle: "",
    additionalFeedbackContent: "",
    feedbackSummary: "",
    comment: "",
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (resumeReviewId) {
      dispatch({
        type: RESUME_REVIEWS.GET_DETAIL_REQUEST,
        id: resumeReviewId,
      });
    }
  }, [dispatch, resumeReviewId]);

  useEffect(() => {
    if (resumeReviewDetail) {
      setFormData({
        initialFeedbackTitle: resumeReviewDetail.initialFeedbackTitle || "",
        initialFeedbackContent: resumeReviewDetail.initialFeedbackContent || "",
        midtermFeedbackTitle: resumeReviewDetail.midtermFeedbackTitle || "",
        midtermFeedbackContent: resumeReviewDetail.midtermFeedbackContent || "",
        finalFeedbackTitle: resumeReviewDetail.finalFeedbackTitle || "",
        finalFeedbackContent: resumeReviewDetail.finalFeedbackContent || "",
        additionalFeedbackTitle: resumeReviewDetail.additionalFeedbackTitle || "",
        additionalFeedbackContent: resumeReviewDetail.additionalFeedbackContent || "",
        feedbackSummary: resumeReviewDetail.feedbackSummary || "",
        comment: resumeReviewDetail.comment || "",
      });
    }
  }, [resumeReviewDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: RESUME_REVIEWS.PUT_REQUEST,
      data: { ...formData },
      id: resumeReviewId,
      history: router,
    });
  };

  return (
    <>
      <Header />
      <AdminNavigation />
      <Container expand="lg" className={styles.formContainer}>
        <Form className={styles.formBox} noValidate onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "1%" }}>
            <div>
              <label style={{ fontSize: "1.5rem", fontWeight: "600" }}>리뷰 작성</label>
              <label>
                ({resumeReviewDetail?.name}, {resumeReviewDetail?.email})
              </label>
            </div>
            <div className={styles.buttonGroup}>
              {resumeReviewDetail?.resumeFile && (
                <Button variant="dark" href={resumeReviewDetail.resumeFile} download className={styles.roundButton}>
                  이력서
                </Button>
              )}
              {resumeReviewDetail?.requestDetails && (
                <Button variant="info" onClick={() => setShowModal(true)} className={styles.roundButton}>
                  요청 사항
                </Button>
              )}
              {resumeReviewDetail?.resumeUrl && (
                <Button variant="primary" href={resumeReviewDetail.resumeUrl} target="_blank" rel="noopener noreferrer" className={styles.roundButton}>
                  링크 열기
                </Button>
              )}
            </div>
          </div>

          <Row className={styles.formGroup}>
            <label className={styles.formLabel}>참여 검토관</label>
            <Col sm="12">
              <label className={styles.contentP}>• 이름 : {resumeReviewDetail?.reviewerName}</label>
              <label className={styles.contentP}>• 자기소개 : {resumeReviewDetail?.reviewerBiography}</label>
            </Col>
          </Row>

          <Form.Group as={Row} controlId="feedbackSummary" className={styles.formGroup}>
            <Form.Label sm="2" className={styles.formLabel}>
              요약
            </Form.Label>
            <Col sm="12" className={styles.colTextarea}>
              <Form.Control
                as="textarea"
                name="feedbackSummary"
                rows={3}
                value={formData.feedbackSummary}
                className={styles.formControlTextArea}
                onChange={handleChange}
                placeholder="내용을 입력해주세요."
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="initialFeedback" className={styles.formGroup}>
            <Form.Label sm="2" className={styles.formLabel}>
              I. 피드백
            </Form.Label>
            <Col sm="4">
              <Form.Control type="text" name="initialFeedbackTitle" value={formData.initialFeedbackTitle} className={styles.formControl} onChange={handleChange} placeholder="제목" />
            </Col>
            <Col sm="12" className={styles.colTextarea}>
              <Form.Control
                as="textarea"
                name="initialFeedbackContent"
                rows={3}
                value={formData.initialFeedbackContent}
                className={styles.formControlTextArea}
                onChange={handleChange}
                placeholder="내용을 입력해주세요."
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="midtermFeedback" className={styles.formGroup}>
            <Form.Label sm="2" className={styles.formLabel}>
              II. 피드백
            </Form.Label>
            <Col sm="4">
              <Form.Control type="text" name="midtermFeedbackTitle" value={formData.midtermFeedbackTitle} onChange={handleChange} className={styles.formControl} placeholder="제목" />
            </Col>
            <Col sm="12" className={styles.colTextarea}>
              <Form.Control
                as="textarea"
                name="midtermFeedbackContent"
                rows={3}
                value={formData.midtermFeedbackContent}
                className={styles.formControlTextArea}
                onChange={handleChange}
                placeholder="내용을 입력해주세요."
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="finalFeedback" className={styles.formGroup}>
            <Form.Label sm="2" className={styles.formLabel}>
              III. 피드백
            </Form.Label>
            <Col sm="4">
              <Form.Control type="text" name="finalFeedbackTitle" value={formData.finalFeedbackTitle} onChange={handleChange} className={styles.formControl} placeholder="제목" />
            </Col>
            <Col sm="12" className={styles.colTextarea}>
              <Form.Control
                as="textarea"
                name="finalFeedbackContent"
                rows={3}
                value={formData.finalFeedbackContent}
                onChange={handleChange}
                className={styles.formControlTextArea}
                placeholder="내용을 입력해주세요."
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="additionalFeedback" className={styles.formGroup}>
            <Form.Label sm="2" className={styles.formLabel}>
              IV. 피드백
            </Form.Label>
            <Col sm="4">
              <Form.Control type="text" name="additionalFeedbackTitle" value={formData.additionalFeedbackTitle} onChange={handleChange} className={styles.formControl} placeholder="제목" />
            </Col>
            <Col sm="12" className={styles.colTextarea}>
              <Form.Control
                as="textarea"
                name="additionalFeedbackContent"
                rows={3}
                value={formData.additionalFeedbackContent}
                className={styles.formControlTextArea}
                onChange={handleChange}
                placeholder="내용을 입력해주세요."
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="comment" className={styles.formGroup}>
            <Form.Label sm="2" className={styles.formLabel}>
              최종 의견
            </Form.Label>
            <Col sm="12" className={styles.colTextarea}>
              <Form.Control as="textarea" name="comment" rows={3} value={formData.comment} onChange={handleChange} className={styles.formControlTextArea} placeholder="내용을 입력해주세요." />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Button type="submit" className={styles.submitButton}>
              저장
            </Button>
          </Form.Group>
        </Form>

        {/* 모달 */}
        <ResumeDetailModal showModal={showModal} handleClose={() => setShowModal(false)} modalContent={resumeReviewDetail?.requestDetails} />
      </Container>
    </>
  );
};

export default ResumeReview;

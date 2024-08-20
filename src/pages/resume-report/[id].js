import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "../../components/css/ResumeReport.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RESUME_REVIEWS } from "../../reducers/resumeReviews";

const ResumeReport = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id: resumeReviewId } = router.query;
  const { resumeReview } = useSelector((state) => state.resumeReviews);

  useEffect(() => {
    if (resumeReviewId) {
      dispatch({
        type: RESUME_REVIEWS.GET_REQUEST,
        id: resumeReviewId,
      });
    }
  }, [dispatch, resumeReviewId]);

  return (
    <div className={styles.layout}>
      <Container fluid className={styles.topArea}>
        <Row className={styles.topBox}>
          <Col xs={12} md={6} className={styles.topletterImg}>
            <img src="/letter3.jpg" alt="letter" width={"100%"} />
          </Col>
          <Col xs={12} md={6}>
            <p className={styles.topNameP}>
              {resumeReview.applicantName} 님 <br />
              서류검토 리포팅
            </p>
          </Col>
        </Row>
      </Container>

      <Container fluid className={styles.container}>
        <div className={styles.contentBox}>
          <Row className={styles.contentRow}>
            <Col sm="12">
              <label className={styles.titleLabel}>참여 검토관</label>
              <p className={styles.contentP}>• {resumeReview.reviewerBiography}</p>
            </Col>
          </Row>
        </div>

        <div className={styles.contentBox}>
          <Row className={styles.contentRow}>
            <Col sm="12">
              <label className={styles.titleLabel}>요약</label>
              <p className={styles.contentP}>{resumeReview.feedbackSummary}</p>
            </Col>
          </Row>
        </div>

        <div className={styles.contentBox}>
          <Row className={styles.contentRow}>
            <Col sm="12">
              <label className={styles.titleLabel}>세부 피드백</label>
              {resumeReview.initialFeedbackTitle && (
                <div>
                  <label className={styles.childTitleLabel}>{resumeReview.initialFeedbackTitle}</label>
                  <p className={styles.contentP}>{resumeReview.initialFeedbackContent}</p>
                </div>
              )}

              {resumeReview.midtermFeedbackTitle && (
                <div className={styles.contentCol}>
                  <label className={styles.childTitleLabel}>{resumeReview.midtermFeedbackTitle}</label>
                  <p className={styles.contentP}>{resumeReview.midtermFeedbackContent}</p>
                </div>
              )}

              {resumeReview.finalFeedbackTitle && (
                <div className={styles.contentCol}>
                  <label className={styles.childTitleLabel}>{resumeReview.finalFeedbackTitle}</label>
                  <p className={styles.contentP}>{resumeReview.finalFeedbackContent}</p>
                </div>
              )}

              {resumeReview.additionalFeedbackTitle && (
                <div className={styles.contentCol}>
                  <label className={styles.childTitleLabel}>{resumeReview.additionalFeedbackTitle}</label>
                  <p className={styles.contentP}>{resumeReview.additionalFeedbackContent}</p>
                </div>
              )}
            </Col>
          </Row>
        </div>

        <div className={styles.contentBox}>
          <Row className={styles.contentRow}>
            <Col sm="12">
              <label className={styles.titleLabel}>최종 의견</label>
              <p className={styles.contentP}>{resumeReview.comment}</p>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ResumeReport;

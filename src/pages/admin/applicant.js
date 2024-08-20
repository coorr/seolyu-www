import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import styles from "../../components/css/Applicant.module.css";
import CustomPagination from "../../components/Pagination";
import AdminNavigation from "../../components/AdminNavigation";
import moment from "moment";
import { APPLICANT } from "../../reducers/applicant";
import { RESUME_REVIEWS } from "../../reducers/resumeReviews";

const Applicant = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { applicants, totalPages, totalElements, currentPage, searchParams } = useSelector((state) => state.applicant);

  useEffect(() => {
    getResumeReviews();
  }, [dispatch, currentPage]);

  const getResumeReviews = () => {
    dispatch({
      type: APPLICANT.GET_LIST_REQUEST,
      data: { ...searchParams, page: currentPage },
    });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      updateSearchParams({
        ...searchParams,
        [name]: value,
      })
    );
  };

  const updateSearchParams = (params) => ({
    type: APPLICANT.UPDATE_SEARCH_PARAMS,
    data: params,
  });

  const updateCurrentPage = (page) => ({
    type: APPLICANT.UPDATE_CURRENT_PAGE,
    data: page,
  });

  const handleSearchOnclick = () => {
    dispatch(updateCurrentPage(0)); // 검색 시 페이지를 1로 초기화
    getResumeReviews();
  };

  const handlePageChange = (page) => {
    dispatch(updateCurrentPage(page));
  };

  const handleStatusChange = (resumeReviewId, newStatus) => {
    const isConfirmed = window.confirm("상태를 변경하시겠습니까?");
    if (isConfirmed) {
      dispatch({
        type: RESUME_REVIEWS.PATCH_STATUS_REQUEST,
        id: resumeReviewId,
        data: { status: newStatus },
        history: router,
        searchParams: { ...searchParams },
        currentPage: currentPage,
      });
    }
  };
  return (
    <>
      <Header />
      <AdminNavigation />
      <Container>
        <h4 className="my-3">서류 검토 목록</h4>
        <Form className={styles.formSearch}>
          <Row className={styles.rowSearch}>
            <Col md={6}>
              <Form.Group controlId="formName" className={styles.searchGroup}>
                <Form.Label className={styles.labelSearch}>이름</Form.Label>
                <Form.Control className={styles.controlSearch} type="text" name="name" value={searchParams.name} onChange={handleSearchChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formEmail" className={styles.searchGroup}>
                <Form.Label className={styles.labelSearch}>이메일</Form.Label>
                <Form.Control className={styles.controlSearch} type="email" name="email" value={searchParams.email} onChange={handleSearchChange} />
              </Form.Group>
            </Col>
          </Row>
          <Row className={styles.rowSearch}>
            <Col md={6}>
              <Form.Group controlId="formReviewStatus" className={styles.searchGroup}>
                <Form.Label className={styles.labelSearch}>검토 여부</Form.Label>
                <Form.Control className={styles.controlSearch} as="select" name="status" value={searchParams.status} onChange={handleSearchChange}>
                  <option value="">전체</option>
                  <option value="READY">대기</option>
                  <option value="COMPLETED">완료</option>
                  <option value="CANCEL">취소</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formApplicationDate" className={styles.searchGroup}>
                <Form.Label className={styles.labelSearch}>생성일</Form.Label>
                <Form.Control className={styles.controlSearch} type="date" name="startedDate" value={searchParams.startedDate} onChange={handleSearchChange} />
                <p style={{ marginLeft: "2%", marginRight: "2%" }}>~</p>
                <Form.Control className={styles.controlSearch} type="date" name="endedDate" value={searchParams.endedDate} onChange={handleSearchChange} />
              </Form.Group>
            </Col>
          </Row>
        </Form>

        <div className={styles.divTotalElment}>
          <p className={styles.pTotalElement}>총 갯수 : {totalElements}개 </p>
          <Button variant="secondary" onClick={handleSearchOnclick}>
            조회
          </Button>
        </div>

        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>이름</th>
              <th>이메일</th>
              <th>포지션</th>
              <th>검토 진행</th>
              <th>검토 상태</th>
              <th>상태 변경</th>
              <th>검토일</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((app) => (
              <tr key={app.id}>
                <td>{app.resumeReviewId}</td>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.position}</td>
                <td>
                  <Button variant="secondary" onClick={() => router.push(`/admin/resume-reviews/${app.resumeReviewId}`)} className={`${styles.roundButton}`}>
                    작성
                  </Button>
                </td>
                <td>
                  <span className={`${styles.completedText}`}>{app.status}</span>
                </td>
                <td>
                  {app.status === "대기" && (
                    <Form.Select aria-label="Default select example" style={{ backgroundColor: "skyblue" }} value={app.status} onChange={(e) => handleStatusChange(app.resumeReviewId, e.target.value)}>
                      <option value="READY">대기</option>
                      <option value="COMPLETED">완료</option>
                      <option value="CANCEL">취소</option>
                    </Form.Select>
                  )}
                </td>
                <td>{app.completedAt ? moment(app.reviewedAt).format("YYYY-MM-DD HH:mm:ss") : ""}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <CustomPagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </Container>
    </>
  );
};

export default Applicant;

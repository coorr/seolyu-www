import React, { useState, useRef, useEffect } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import styles from "../components/css/New.module.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { APPLICANT } from "../reducers/applicant";
import { EVENT } from "../reducers/event";

const ApplicantNew = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    resumeFile: null,
    resumeURL: "",
    request: "",
  });

  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState("+ 이력서 추가하기");
  const fileInputRef = useRef(null);
  const { event, isActive } = useSelector((state) => state.event);

  // useEffect(() => {
  //   dispatch({
  //     type: EVENT.GET_LIST_REQUEST,
  //     data: {
  //       isActive: true,
  //       category: "RESUME_REVIEW",
  //     },
  //   });
  // }, [dispatch]);

  const validateField = (name, value) => {
    const newErrors = {};
    switch (name) {
      case "name":
        if (!value) {
          newErrors.name = "필수 질문입니다";
        }
        break;
      case "email":
        if (!value) {
          newErrors.email = "이메일은 필수 항목입니다";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          newErrors.email = "올바른 이메일 형식이 아닙니다";
        }
        break;
      case "position":
        if (!value) {
          newErrors.position = "포지션을 선택해주세요.";
        }
        break;
      case "resumeFile":
        if (!value) {
          newErrors.resumeFile = "이력서 파일을 업로드해주세요.";
        } else {
          const file = value;
          if (!file.name.endsWith(".pdf")) {
            newErrors.resumeFile = "PDF 형식의 파일만 업로드할 수 있습니다.";
          } else if (file.size > 20 * 1024 * 1024) {
            // 20MB
            newErrors.resumeFile = "파일 크기가 20MB를 초과할 수 없습니다.";
          }
        }
        break;
      case "resumeURL":
        if (value && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value)) {
          newErrors.resumeURL = "http:// 또는 https:// 를 포함해 형식에 맞는 URL을 입력해 주세요.";
        }
        break;
      case "request":
        if (value.length > 1000) {
          newErrors.request = "요청사항은 최대 1000자까지 입력 가능합니다.";
        }
        break;
      default:
        break;
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const newErrors = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...newErrors,
    }));
  };

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileErrors = validateField("resumeFile", file);
      setFormData((prevFormData) => ({
        ...prevFormData,
        resumeFile: file,
      }));

      setFileName(file.name);
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors, ...fileErrors };
        if (!fileErrors.resumeFile) {
          delete updatedErrors.resumeFile;
        }
        return updatedErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 이벤트 신청 유효성 체크
    if (!isActive) {
      alert("현재 이벤트는 마감되었습니다.");
      return;
    }

    // 신청자 입력 정보 유효성 체크
    const newErrors = {};
    console.log("formData :", formData);
    Object.keys(formData).forEach((key) => {
      const fieldErrors = validateField(key, formData[key]);
      Object.assign(newErrors, fieldErrors);
    });
    console.log("newErrors : ", newErrors);
    if (Object.keys(newErrors).length !== 0) {
      setErrors(newErrors);
      return;
    }

    const form = new FormData();
    form.append("file", formData.resumeFile);
    const data = {
      name: formData.name,
      email: formData.email,
      position: formData.position,
      httpUrl: formData.resumeURL,
      requestDetails: formData.request,
      eventId: event.id,
    };
    form.append("applicantPostReqDto", new Blob([JSON.stringify(data)], { type: "application/json" }));
    dispatch({
      type: APPLICANT.POST_CREATE_REQUEST,
      data: form,
      history: router,
    });
  };

  return (
    <>
      <Header />
      <Container expand="lg" className={styles.formContainer}>
        <Form className={styles.formBox} noValidate onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formName" className={styles.formGroup}>
            <Form.Label sm="2" className={styles.formLabel}>
              이름
              <Form.Label className={styles.formLabelRequired}>*</Form.Label>
            </Form.Label>
            <Col sm="6">
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.name} className={styles.formControl} placeholder="홍길동" />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formEmail" className={styles.formGroup}>
            <Form.Label sm="2" className={styles.formLabel}>
              이메일
              <Form.Label className={styles.formLabelRequired}>*</Form.Label>
            </Form.Label>
            <Col sm="6">
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.email}
                className={styles.formControl}
                placeholder="seolyu@gmail.com"
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPosition" className={styles.formGroup}>
            <Form.Label sm="2" className={styles.formLabel}>
              포지션
              <Form.Label className={styles.formLabelRequired}>*</Form.Label>
            </Form.Label>
            <Col sm="6">
              <Form.Control as="select" name="position" value={formData.position} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.position} className={styles.formControl}>
                <option value="">선택</option>
                <option value="FE">FE</option>
                <option value="BE">BE</option>
                <option value="iOS">iOS</option>
                <option value="ANDROID">Android</option>
                <option value="DEVOPS">Devops</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.position}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formResumeFile" className={styles.formGroup}>
            <Form.Label sm="2" className={styles.formLabel} style={{ marginBottom: "0px" }}>
              이력서 추가하기
              <Form.Label className={styles.formLabelRequired}>*</Form.Label>
            </Form.Label>
            <Form.Label className={styles.formLabelFile}>지원되는 파일(PDF) 1개를 업로드하세요. 최대 크기는 20MB입니다.</Form.Label>
            <Col sm="4">
              <Button type="button" onClick={handleFileButtonClick} className={styles.fileButton}>
                {fileName}
              </Button>
              <input type="file" hidden onChange={handleFileChange} ref={fileInputRef} accept=".pdf" />
            </Col>

            {errors.resumeFile && (
              <Form.Label sm="2" className={styles.formLabelRequired}>
                {console.log(errors.resumeFile)}
                {errors.resumeFile}
              </Form.Label>
            )}
          </Form.Group>

          <Form.Group as={Row} controlId="formResumeURL" className={styles.formGroup}>
            <Form.Label sm="2" className={styles.formLabel}>
              URL 이력서
            </Form.Label>
            <Col sm="12">
              <Form.Control
                type="url"
                name="resumeURL"
                value={formData.resumeURL}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.resumeURL}
                className={styles.formControl}
                placeholder="http://example.com"
              />
              <Form.Control.Feedback type="invalid">{errors.resumeURL}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formRequest" className={styles.formGroup}>
            <Form.Label sm="2" className={styles.formLabel}>
              요청사항
            </Form.Label>
            <Col sm="12">
              <Form.Control
                as="textarea"
                name="request"
                rows={3}
                value={formData.request}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.request}
                className={styles.formControlTextArea}
                placeholder="요청사항을 입력해주세요. (최대 1000자)"
              />
              <Form.Control.Feedback type="invalid">{errors.request}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            {isActive ? (
              <Button type="submit" className={styles.submitButton}>
                신청하기
              </Button>
            ) : (
              <Button type="button" className={styles.disabledButton} disabled>
                선착순 마감
              </Button>
            )}
          </Form.Group>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default ApplicantNew;

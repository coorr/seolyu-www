import React from "react";
import { Modal, Button } from "react-bootstrap";

const ResumeDetailModal = ({ showModal, handleClose, modalContent }) => {
  return (
    <Modal show={showModal} onHide={handleClose} style={{ marginTop: "3%" }}>
      <Modal.Header closeButton>
        <Modal.Title>요청 사항</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalContent}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResumeDetailModal;

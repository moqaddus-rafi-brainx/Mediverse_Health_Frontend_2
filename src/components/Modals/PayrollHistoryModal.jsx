/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Row, Col, Container } from "reactstrap";
import "./ModalStyles.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  pb: 4,
  borderRadius: "5px",
  height: 500,
  overflowY: "scroll",
};

export default function PayrollHistoryModal({ historyObject, open, handleClose }) {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="px-4 pt-3 d-flex align-items-center justify-content-between w-100">
            History
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </div>

          <hr />

          <div className="px-4">{historyObject?.user}</div>

          <Container fluid className="breakdown-rows pt-4 px-4">
            <Row>
              <Col sm="9">
                <h5>Before</h5>
                <Row className="breakdown-head py-2 fw-bold">
                  <Col sm="2">DAYS</Col>
                  <Col sm="2">JOB ID</Col>
                  <Col sm="3">JOBS</Col>
                  <Col sm="2">TIME</Col>
                  <Col sm="3">DATE</Col>
                </Row>
                {historyObject?.rows?.map((row, index) => (
                  <Row key={index} className="breakdown-head">
                    <Col sm="2">{row?.Day}</Col>
                    <Col sm="2">{row?.job_ids}</Col>
                    <Col sm="3">{row?.jobs}</Col>
                    <Col sm="2">{row?.before}</Col>
                    <Col sm="3">{row?.date}</Col>
                  </Row>
                ))}
              </Col>
              <Col sm="1"></Col>
              <Col sm="2">
                <h5>After</h5>
                <Row className="breakdown-updated">
                  <Col sm="12" className="fw-bold py-2">
                    UPDATED TIME
                  </Col>
                  {historyObject?.rows?.map((row, index) => (
                    <Col sm="12" key={index}>
                      {row?.after}
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}

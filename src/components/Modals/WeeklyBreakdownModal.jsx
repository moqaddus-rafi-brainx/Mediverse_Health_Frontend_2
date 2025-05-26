/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Row, Col, Container } from "reactstrap";
import "./ModalStyles.css";
import { minutesToHours } from "services/utilities";

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
};

export default function WeeklyBreakdownModal({
  user,
  dates,
  totalHours,
  paymentRule,
  open,
  handleClose,
}) {
  const getGrossPay = () => {
    if (totalHours / 60 <= paymentRule?.weekly_hour_limit) {
      return ((totalHours / 60) * paymentRule?.hourly_rate).toFixed(2);
    } else {
      return (paymentRule?.weekly_hour_limit * paymentRule?.hourly_rate).toFixed(2);
    }
  };

  const getOvertimePay = () => {
    if (totalHours / 60 > paymentRule?.weekly_hour_limit) {
      return (
        (totalHours / 60 - paymentRule?.weekly_hour_limit) *
        paymentRule?.overtime_rate
      ).toFixed(2);
    } else {
      return 0;
    }
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="px-4 py-3 d-flex align-items-center justify-content-between w-100">
            {user}
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </div>

          <div className="d-flex align-items-center justify-content-between btn-edit w-100 py-2 px-4">
            <div>Weekly Breakdowns</div>
            <small>{dates}</small>
          </div>

          <Container fluid className="breakdown-rows">
            <Row className="py-2 breakdown-head fw-bold">
              <Col sm="2">TOTAL HOURS</Col>
              <Col sm="2">HOURLY RATE</Col>
              <Col sm="2">VACATION PAY</Col>
              <Col sm="3">OVERTIME HOURS</Col>
              <Col sm="3">OVERTIME RATE</Col>
            </Row>

            <Row className="py-2">
              <Col sm="2">{minutesToHours(totalHours)}</Col>
              <Col sm="2">${paymentRule?.hourly_rate}</Col>
              <Col sm="2">10%</Col>
              <Col sm="3">
                {totalHours / 60 > paymentRule?.weekly_hour_limit
                  ? minutesToHours(totalHours / 60 - paymentRule?.weekly_hour_limit)
                  : "0h 0m"}
              </Col>
              <Col sm="3">${paymentRule?.overtime_rate}</Col>
            </Row>

            <Row className="py-2">
              <Col sm="2"></Col>
              <Col sm="2"></Col>
              <Col sm="2"></Col>
              <Col sm="3">Gross Pay</Col>
              <Col sm="3">${getGrossPay()}</Col>
            </Row>

            <Row className="py-2">
              <Col sm="2"></Col>
              <Col sm="2"></Col>
              <Col sm="2"></Col>
              <Col sm="3">Vacation Pay (10%)</Col>
              <Col sm="3">${getGrossPay() * 0.1}</Col>
            </Row>

            <Row className="py-2">
              <Col sm="2"></Col>
              <Col sm="2"></Col>
              <Col sm="2"></Col>
              <Col sm="3">Overtime Pay</Col>
              <Col sm="3">${getOvertimePay()}</Col>
            </Row>

            <Row className="py-2">
              <Col sm="2"></Col>
              <Col sm="2"></Col>
              <Col sm="2"></Col>
              <Col sm="3">Total Gross Pay</Col>
              <Col sm="3">${(Number(getGrossPay()) + Number(getGrossPay()) * 0.1).toFixed(2)}</Col>
            </Row>

            <Row className="py-2 grand-total">
              <Col sm="2"></Col>
              <Col sm="2"></Col>
              <Col sm="2"></Col>
              <Col sm="3">Grand Total</Col>
              <Col sm="3">
                $
                {(
                  Number(getGrossPay()) +
                  Number(getGrossPay()) * 0.1 +
                  Number(getOvertimePay())
                ).toFixed(2)}
              </Col>
            </Row>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}

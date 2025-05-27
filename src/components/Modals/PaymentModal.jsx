/* eslint-disable react/prop-types */
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close"; // Import the Close icon
import ArgonBox from "components/ArgonBox";
import {
  Card,
  TextField,
  Typography,
  FormLabel,
  Button,
  IconButton,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import { AttachMoney, AccessTime } from "@mui/icons-material";
import { style, iconStyles } from "./index";

export default function PaymentModal({
  payment,
  setPaymentRule,
  open,
  handleClose,
  userId,
  handleUpdate,
  nextPaymentRule
}) {
  const updateRule = () => {
    handleUpdate();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentRule({
      ...payment,
      [name]: parseFloat(value),
    });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Close button */}
          <ArgonBox display="flex" alignItems="center">
            <ArgonBox>
              <Typography variant="h4">Configure Payment Rules</Typography>
              <Typography variant="h6" fontWeight={"normal"} marginTop={1}>
                Please fill the following fields.
              </Typography>
            </ArgonBox>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                margin: "6% 2%",
              }}
            >
              <CloseIcon />
            </IconButton>
          </ArgonBox>

          {/* Modal content */}
          <ArgonBox sx={{ width: "100%", margin: "2% 0%" }}>
            <FormLabel sx={{ fontSize: "14px" }}>Hourly Rate</FormLabel>
            <div>
              {
                nextPaymentRule ? (
                  <Tooltip
                    title={`The hourly rate was updated to $${nextPaymentRule?.hourly_rate} by the admin. This change will be effective from coming Monday.`}
                    placement="top"
                  >
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Enter hourly rate"
                      name="hourly_rate"
                      type="number"
                      defaultValue={payment.hourly_rate}
                      onChange={handleChange}
                      inputProps={{
                        onInput: (e) => {
                          e.target.value = e.target.value.slice(0, 4); // Limit to 4 characters.
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton sx={iconStyles}>
                              <AttachMoney />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Tooltip>
                ) : (
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Enter hourly rate"
                    name="hourly_rate"
                    type="number"
                    defaultValue={payment.hourly_rate}
                    onChange={handleChange}
                    inputProps={{
                      onInput: (e) => {
                        e.target.value = e.target.value.slice(0, 4); // Limit to 4 characters.
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton sx={iconStyles}>
                            <AttachMoney />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )
              }

            </div>
          </ArgonBox>
          <ArgonBox sx={{ width: "100%", margin: "3% 0%" }}>
            <FormLabel sx={{ fontSize: "14px" }}>Weekly Hourly Limit</FormLabel>
            <div>
              {
                nextPaymentRule ? (
                  <Tooltip
                    title={`The weekly hour limit was updated to $${nextPaymentRule?.weekly_hour_limit} hours per week by the admin. This change will be effective from coming Monday.`}
                    placement="top"
                  >
                    <TextField
                      variant="outlined"
                      placeholder="Enter weekly hourly limit"
                      fullWidth
                      type="number"
                      name="weekly_hour_limit"
                      defaultValue={payment.weekly_hour_limit}
                      onChange={handleChange}
                      inputProps={{
                        onInput: (e) => {
                          e.target.value = e.target.value.slice(0, 3); // Limit to 3 characters.
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton sx={iconStyles}>
                              <AccessTime />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Tooltip>
                ) : (
                  <TextField
                    variant="outlined"
                    placeholder="Enter weekly hourly limit"
                    fullWidth
                    type="number"
                    name="weekly_hour_limit"
                    defaultValue={payment.weekly_hour_limit}
                    onChange={handleChange}
                    inputProps={{
                      onInput: (e) => {
                        e.target.value = e.target.value.slice(0, 3); // Limit to 3 characters.
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton sx={iconStyles}>
                            <AccessTime />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )
              }

            </div>
          </ArgonBox>

          <ArgonBox sx={{ width: "100%", margin: "3% 0%" }}>
            <FormLabel sx={{ fontSize: "14px" }}>Overtime Hourly Rate</FormLabel>
            <div>

              {
                nextPaymentRule ? (
                  <Tooltip
                    title={`The overtime hourly rate was updated to $${nextPaymentRule?.overtime_rate} by the admin. This change will be effective from coming Monday.`}
                    placement="top"
                  >
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Enter overtime rate"
                      type="number"
                      inputMode="numeric"
                      name="overtime_rate"
                      defaultValue={payment.overtime_rate}
                      onChange={handleChange}
                      inputProps={{
                        onInput: (e) => {
                          e.target.value = e.target.value.slice(0, 4); // Limit to 4 characters.
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton sx={iconStyles}>
                              <AttachMoney />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Tooltip>
                ) : (
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Enter overtime rate"
                    type="number"
                    inputMode="numeric"
                    name="overtime_rate"
                    defaultValue={payment.overtime_rate}
                    onChange={handleChange}
                    inputProps={{
                      onInput: (e) => {
                        e.target.value = e.target.value.slice(0, 4); // Limit to 4 characters.
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton sx={iconStyles}>
                            <AttachMoney />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )
              }

            </div>
          </ArgonBox>

          <ArgonBox sx={{ width: "100%", margin: "3% 0%" }}>
            <FormLabel sx={{ fontSize: "14px" }}>Vacation Pay %</FormLabel>
            <div>

              {
                nextPaymentRule ? (
                  <Tooltip
                    title={`The vacation pay rate was updated to $${nextPaymentRule?.vacation_rate} by the admin. This change will be effective from coming Monday.`}
                    placement="top"
                  >
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Enter vacation rate"
                      type="number"
                      inputMode="numeric"
                      name="vacation_rate"
                      defaultValue={payment?.vacation_rate}
                      onChange={handleChange}
                      inputProps={{
                        onInput: (e) => {
                          e.target.value = e.target.value.slice(0, 3);
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton sx={iconStyles}>
                              <AttachMoney />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Tooltip>
                ) : (
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Enter vacation rate"
                    type="number"
                    inputMode="numeric"
                    name="vacation_rate"
                    defaultValue={payment?.vacation_rate}
                    onChange={handleChange}
                    inputProps={{
                      onInput: (e) => {
                        e.target.value = e.target.value.slice(0, 3);
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton sx={iconStyles}>
                            <AttachMoney />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )
              }

            </div>
          </ArgonBox>

          <ArgonBox sx={{ display: "flex", margin: "4% 0", float: "right" }}>
            <ArgonBox sx={{ width: "100%" }}>
              <Button
                variant="outlined"
                color="secondary"
                size="medium"
                sx={{
                  fontWeight: 500,
                  borderRadius: 1,
                  color: "#373D3F",
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="medium"
                onClick={updateRule}
                className="configure-button"
                sx={{
                  fontWeight: 500,
                  borderRadius: 1,
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  marginLeft: "5px",
                  "&:hover": {
                    backgroundColor: "primary.main !important",
                  },
                }}
              >
                Update Rules
              </Button>
            </ArgonBox>
          </ArgonBox>
        </Box>
      </Modal>
    </div>
  );
}

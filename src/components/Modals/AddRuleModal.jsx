/* eslint-disable react/prop-types */
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close"; // Import the Close icon
import ArgonBox from "components/ArgonBox";
import { TextField, Typography, FormLabel, IconButton, InputAdornment } from "@mui/material";
import { style, iconStyles } from "./index";
import ArgonButton from "components/ArgonButton";
import { ColorizeOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";

export default function AddRuleModal({ open, handleClose, handleSave }) {
  const [rule, setRule] = useState({
    ruleName: null,
    ruleValue: null,
  });

  const handleSubmit = () => {
    if (!rule?.ruleName || !rule.ruleValue) {
      toast.error("Required Mandatory Fields.");
      return;
    }

    handleSave(rule);
    handleClose();
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
              <Typography variant="h4">Add New Maintenance Rule</Typography>
              <Typography variant="h6" fontWeight={"normal"} marginTop={1} className="mt-2">
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
          <ArgonBox>
            <div className="my-3">
              <ArgonBox>
                <FormLabel sx={{ fontSize: "14px" }}>Maintenance Rule Name</FormLabel>
                <span className="required-color ml-2">*</span>
                <div>
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Enter Maintenance Rule Name"
                    type="text"
                    name="name"
                    value={rule?.ruleName}
                    onChange={(data) => {
                      setRule((prev) => ({
                        ...prev,
                        ruleName: data?.target?.value,
                      }));
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton sx={iconStyles}>
                            <ColorizeOutlined />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </ArgonBox>{" "}
            </div>

            <div>
              <ArgonBox>
                <FormLabel sx={{ fontSize: "14px" }}>Maintenance Rule Value</FormLabel>
                <span className="required-color ml-2">*</span>

                <div>
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Enter Value Of Rule"
                    type="number"
                    inputMode="numeric"
                    name="name"
                    value={rule?.ruleValue}
                    onChange={(data) => {
                      setRule((prev) => ({
                        ...prev,
                        ruleValue: data?.target?.value,
                      }));
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton sx={iconStyles}>
                            <ColorizeOutlined />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </ArgonBox>{" "}
            </div>
          </ArgonBox>
          <ArgonBox display="flex" justifyContent="end" alignItems="center" my="3">
            <ArgonButton variant="contained" onClick={handleClose} sx={{ margin: "10% 5%" }}>
              Cancel
            </ArgonButton>
            <ArgonButton variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </ArgonButton>
          </ArgonBox>
        </Box>
      </Modal>
    </div>
  );
}

/* eslint-disable react/prop-types */
import * as React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArgonBox from "components/ArgonBox";
import DatePicker from "components/DatePicker/DatePicker";
import dayjs from "dayjs";
import cloudIcon from "../../assets/icons/Cloud.svg";
import { getBase64 } from "services/utilities";
import { MIN_FILE_SIZE } from "constants";
import { toast, ToastContainer } from "react-toastify";
import ProgressBar from "components/ProgressBar/ProgressBar";
import pdfImage from "../../assets/images/pdf-image.png";
import { TextField, FormLabel } from "@mui/material";
import { addServiceRecords, updateServiceRecord } from "services/vehicleService";
import { getOneServiceRecord } from "services/vehicleService";
import MultiDropdown from "examples/MultiDropdown/MultiDropdown";
import { maintenenceRuleByCategoryOrId } from "services/maintenenceRuleService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

export default function AddServiceRecordModal({
  open,
  handleClose,
  vehicleId,
  serviceId,
  vehicleCategory,
}) {
  const [service, setService] = useState({
    provider_name: "",
    service_type: [],
    service_date: "",
    odometer_reading_at_service: "",
    recommendation: "",
    service_records: {},
  });
  const [rules, setRules] = useState({});
  const [spinner, setSpinner] = useState(false);

  const fetchServiceRecord = () => {
    setSpinner(true);
    getOneServiceRecord(serviceId)
      .then((data) => {
        setSpinner(false);
        setService({
          provider_name: data?.provider_name,
          service_type: [],
          service_date: data?.service_date,
          odometer_reading_at_service: data?.odometer_reading_at_service,
          recommendation: data?.recommendation,
          service_records: data?.service_records,
        });
      })
      .catch((error) => {
        setSpinner(false);
        console.log(error);
      });
  };

  const fetchRuleByCategory = () => {
    maintenenceRuleByCategoryOrId({
      vehicleId: vehicleId ? vehicleId : null,
      categoryId: vehicleCategory?.id !== "" ? vehicleCategory?.id : null,
    })
      .then((data) => {
        setRules(data?.maintenenceRule?.rules);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchRuleByCategory(vehicleCategory?.id);
  }, [vehicleCategory, vehicleId]);

  useLayoutEffect(() => {
    if (serviceId) {
      fetchServiceRecord();
    } else {
      setService({
        provider_name: "",
        service_type: [],
        service_date: "",
        odometer_reading_at_service: "",
        recommendation: "",
        service_records: {},
      });
    }
  }, [serviceId]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile?.size >= MIN_FILE_SIZE) {
      toast.error("File Size should be less than 10MB");
      return;
    }

    let fileImage;
    const file = await getBase64(selectedFile);
    fileImage = file;

    setService((prevService) => ({
      ...prevService,
      service_records: { imageUrl: fileImage, mimeType: selectedFile?.type },
    }));
  };

  const handleImageRemove = (event, indexToRemove) => {
    event.preventDefault();

    setService((prevService) => ({
      ...prevService,
      service_records: {},
    }));
  };

  const handleDrop = async (event) => {};

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    if (serviceId) {
      if (!service?.provider_name) {
        toast.error("Please fill all the mandatory fields.");
        return;
      }
      setSpinner(true);
      updateServiceRecord(serviceId, { service })
        .then((data) => {
          setSpinner(false);
          handleClose();
          setService({
            provider_name: "",
            service_type: [],
            service_date: "",
            odometer_reading_at_service: "",
            recommendation: "",
            service_records: {},
          });
        })
        .catch((error) => {
          setSpinner(false);
          toast.error(
            error?.response?.data?.error ||
              "There is an error occured while updating this service record"
          );
          console.log(error);
        });
    } else {
      if (
        service?.provider_name === "" ||
        service?.service_type.length === 0 ||
        service?.service_date === "" ||
        service?.odometer_reading_at_service === ""
      ) {
        toast.error("Please fill all the mandatory fields.");
        return;
      }
      setSpinner(true);
      addServiceRecords({ vehicleId, service, serviceId, vehicleCategory: vehicleCategory?.id })
        .then((data) => {
          setSpinner(false);
          handleClose();
          setService({
            provider_name: "",
            service_type: [],
            service_date: "",
            odometer_reading_at_service: "",
            recommendation: "",
            service_records: {},
          });
        })
        .catch((error) => {
          setSpinner(false);
          toast.error(
            error?.response?.data?.error ||
              "There is an error occured while adding this service record"
          );
          console.log(error);
        });
    }
  };

  return (
    <div>
      <ToastContainer />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {spinner && <ProgressBar />}
          <ArgonBox display="flex" alignItems="center">
            <Typography variant="h4">Service Record</Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                margin: "3% 2%",
              }}
            >
              <CloseIcon />
            </IconButton>
          </ArgonBox>
          <Typography mb={2} variant="h6" color={"grey"}>
            Please Fill the Following Fields.
          </Typography>
          {/* service provider name and type */}
          <div className="row mt-3">
            <div className="col-6">
              <FormLabel sx={{ fontSize: "14px" }}>
                Service Provider Name
                <span className="required-color">*</span>
              </FormLabel>
              <TextField
                fullWidth
                placeholder="Enter Provider Name"
                name="provider_name"
                value={service?.provider_name}
                onChange={(data) =>
                  setService((prev) => {
                    return { ...prev, provider_name: data.target.value };
                  })
                }
              />
            </div>

            {!serviceId && (
              <div className="col-12">
                <FormLabel sx={{ fontSize: "14px" }}>
                  Service Type
                  <span className="required-color">*</span>
                </FormLabel>
                <MultiDropdown
                  placeholder="Select Type"
                  value={service?.service_type}
                  options={Object.entries(rules).map(([key, value]) => ({
                    value: key,
                    label: key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
                  }))}
                  valueChange={(data) => {
                    setService((prev) => {
                      return { ...prev, service_type: [...data] };
                    });
                  }}
                />
              </div>
            )}
          </div>
          {/* service date and odometer reading at service */}
          <div className="row mt-3">
            {!serviceId && (
              <div className="col-6">
                <FormLabel sx={{ fontSize: "14px" }}>
                  Service Date
                  <span className="required-color">*</span>
                </FormLabel>
                <DatePicker
                  initialValue={service.service_date ? dayjs(service.service_date) : "Select date"}
                  handleChange={(value) =>
                    setService((prev) => {
                      return { ...prev, service_date: value };
                    })
                  }
                />
              </div>
            )}

            {!serviceId && (
              <div className="col-6">
                <FormLabel sx={{ fontSize: "14px" }}>
                  Odometer Reading at Service
                  <span className="required-color">*</span>
                </FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter odometer reading"
                  name="odometer_reading_at_service"
                  value={service?.odometer_reading_at_service}
                  onChange={(data) =>
                    setService((prev) => {
                      return { ...prev, odometer_reading_at_service: data.target.value };
                    })
                  }
                  type="number"
                />
              </div>
            )}
          </div>
          {/* recommendation by Provider */}
          <div className="row mt-3">
            <div className="col-12">
              <FormLabel sx={{ fontSize: "14px" }}>Rocommendation by Provider</FormLabel>
              <TextField
                fullWidth
                multiline
                rows={5}
                placeholder="Enter recommendations"
                name="recommendation"
                value={service?.recommendation}
                onChange={(data) =>
                  setService((prev) => {
                    return { ...prev, recommendation: data.target.value };
                  })
                }
              />
            </div>
          </div>
          {/* Service Record */}
          <ArgonBox my={3}>
            {/* File Picker with Drag-and-Drop */}
            <FormLabel sx={{ fontSize: "14px" }}>
              Service Record
              {/* <span className="required-color">*</span> */}
            </FormLabel>
            <div
              className="file-picker"
              role="button"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              style={{
                border: "2px dashed #ccc",
                borderRadius: "5px",
                padding: "25px",
                textAlign: "center",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
              onClick={() => document.getElementById("file-input").click()}
            >
              {service?.service_records?.imageUrl && (
                <>
                  <div>
                    <img
                      src={
                        service?.service_records?.mimeType === "application/pdf"
                          ? pdfImage
                          : service?.service_records?.imageUrl
                      }
                      alt="image"
                      className="user-profile-icon"
                    />
                    <span
                      className="cross-icon"
                      role="button"
                      onClick={(event) => {
                        handleImageRemove(event, index);
                        event.stopPropagation();
                      }}
                    >
                      x
                    </span>
                  </div>
                </>
              )}

              <div>
                <img src={cloudIcon} alt="" />
                <Typography variant="h6">
                  Drop File to Upload or{" "}
                  <span style={{ textDecoration: "underline", color: "#3b98d1" }}>Browse</span>
                  {/* <span className="required-color-margin">*</span> */}
                </Typography>
                <Typography variant="h6" color={"grey"}>
                  PNG, JPEG,PDF Max Size : 5MB
                </Typography>
                <input
                  type="file"
                  accept="image/*, application/pdf"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="file-input"
                  multiple
                  name="files[]"
                />
              </div>
            </div>
          </ArgonBox>
          <ArgonBox display="flex" alignItems="center" justifyContent="end" gap={1}>
            <Button
              variant="outlined"
              color="secondary"
              size="medium"
              sx={{
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
              onClick={handleSubmit}
              sx={{
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                "&:hover": {
                  backgroundColor: "primary.main",
                },
              }}
            >
              {serviceId ? "Update" : "Add"}
            </Button>
          </ArgonBox>{" "}
        </Box>
      </Modal>
    </div>
  );
}

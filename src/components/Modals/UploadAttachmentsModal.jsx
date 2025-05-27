/* eslint-disable react/prop-types */
import * as React from "react";
import { useState, useEffect } from "react";
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
import { updateUserCertificate } from "services/CertificateService";
import moment from 'moment';
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
export default function UploadAttachmentsModal({ open, handleClose, userCertificate, upload, handleSetRefresh }) {
    const [certificate, setCertificate] = useState();
    const [profileImage, setProfileImage] = useState();
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        setCertificate({
            issue_date: userCertificate?.issue_date,
            valid_till: userCertificate?.valid_till,
            file: userCertificate?.attachement
        });
        setProfileImage(userCertificate?.attachement);
    }, [open]);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files && e.target.files[0];
        if (selectedFile?.size >= MIN_FILE_SIZE) {
            toast.error("File Size should be less than 5MB");
            return;
        }
        const file = await getBase64(selectedFile);
        setProfileImage(file);
        if (file) {
            setCertificate((prev) => {
                return { ...prev, file: selectedFile }
            });
        }
    };

    const handleDrop = async (event) => {
        event.preventDefault();
        const selectedFile = event.dataTransfer.files[0];
        if (selectedFile?.size >= MIN_FILE_SIZE) {
            toast.error("File Size should be less than 5MB");
            return;
        }
        const file = await getBase64(selectedFile);
        setProfileImage(file);
        if (file) {
            setCertificate((prev) => {
                return { ...prev, file: selectedFile }
            });
        }
    };

    const handleSubmit = async () => {
        if (!certificate?.issue_date || !certificate?.file) {
            toast.error("Required fields are missing!");
            return;
        }

        const issueDate = moment(certificate?.issue_date);
        const validTill = certificate?.valid_till ? moment(certificate.valid_till) : null;

        if (validTill && !issueDate.isBefore(validTill)) {
            toast.error("Issue date should be less than valid till date");
            return;
        }

        const formData = new FormData();

        formData.append("image", certificate.file);
        formData.append("issue_date", issueDate);
        if (validTill)
            formData.append("valid_till", validTill);

        setSpinner(true);
        updateUserCertificate(userCertificate?._id, formData)
            .then(() => {
                setSpinner(false);
                handleClose();
                handleSetRefresh();
                setProfileImage(null);
                setCertificate(null);
            })
            .catch((error) => {
                setSpinner(false);
                toast.error("Error occured");
            });
    };

    const handleDragOver = (event) => {
        event.preventDefault();
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
                        <Typography variant="h4">{upload ? "Upload" : "Edit Certificate"}</Typography>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={() => {
                                setProfileImage(null);
                                setCertificate(null);
                                handleClose();
                            }}
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
                        Please fill the following fields.
                    </Typography>
                    <ArgonBox
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    ></ArgonBox>
                    <ArgonBox my={3}>
                        {/* File Picker with Drag-and-Drop */}
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
                            {profileImage && (
                                <div>
                                    <img src={profileImage} alt="" className="user-profile-icon" />
                                    <Typography variant="h6" color={"grey"}>
                                        {certificate?.file?.name}
                                    </Typography>
                                </div>
                            )}
                            <div>
                                <img src={cloudIcon} alt="" />
                                <Typography variant="h6">
                                    Drop File to Upload or{" "}
                                    <span style={{ textDecoration: "underline", color: "#3b98d1" }}>Browse</span> <span className="required-color">*</span>
                                </Typography>
                                <Typography variant="h6" color={"grey"}>
                                    PNG, JPEG, PDF, Max Size : 5MB
                                </Typography>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                    id="file-input"
                                />
                            </div>
                        </div>
                    </ArgonBox>
                    <ArgonBox mt={2} mb={3} display="flex" justifyContent="space-between">
                        <ArgonBox sx={{ width: "48%" }}>
                            <Typography variant="h6">
                                Issue Date <span className="required-color">*</span>
                            </Typography>
                            <DatePicker
                                initialValue={userCertificate?.issue_date ? dayjs(userCertificate?.issue_date) : ""}
                                handleChange={(value) => setCertificate((prev) => {
                                    return { ...prev, issue_date: value }
                                })}
                            />
                        </ArgonBox>
                        <ArgonBox sx={{ width: "48%" }}>
                            <Typography variant="h6">
                                Valid Till Date
                            </Typography>
                            <DatePicker
                                initialValue={userCertificate?.valid_till ? dayjs(userCertificate?.valid_till) : ""}
                                handleChange={(value) => setCertificate((prev) => {
                                    return { ...prev, valid_till: value }
                                })}
                            />
                        </ArgonBox>
                    </ArgonBox>{" "}
                    <ArgonBox display="flex" alignItems="center" justifyContent="end" gap={1}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            size="medium"
                            sx={{
                                borderRadius: 1,
                                color: "#373D3F",
                            }}
                            onClick={() => {
                                setProfileImage(null);
                                setCertificate(null);
                                handleClose();
                            }}
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
                            {upload ? "Add Attachments" : "Update"}
                        </Button>
                    </ArgonBox>{" "}
                </Box>
            </Modal>
        </div>
    );
}
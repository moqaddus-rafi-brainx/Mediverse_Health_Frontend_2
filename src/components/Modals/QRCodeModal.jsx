/* eslint-disable react/prop-types */

import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close"; // Import the Close icon
import ArgonBox from "components/ArgonBox";

import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";
import ProgressBar from "components/ProgressBar/ProgressBar";
import downloadIcon from "../../assets/icons/prime_download.svg";
import copyIcon from "../../assets/icons/lucide_copy.svg";
import { Stack } from "@mui/material";
import ArgonButton from "components/ArgonButton";
import { useScreenshot } from "use-react-screenshot";
import { saveAs } from "file-saver";
import { generateQRUrl } from "services/vehicleService";
import { getBase64 } from "services/utilities";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: 500,
  p: 4,
  borderRadius: "5px",
};

export default function QRCodeModal({ qrData, open, handleClose }) {
  const qrCodeRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [image, takeScreenshot] = useScreenshot();

  const getImage = async () => {
    setLoading(true);
    const image = await takeScreenshot(qrCodeRef.current);
    saveAs(image, "qrcode.png");
    setLoading(false);
    handleClose();
  };

  const copyLink = async () => {
    setLoading(true);
    if (qrData?.qr_code_url?.imageUrl) {
      navigator.clipboard
        .writeText(qrData?.qr_code_url.imageUrl)
        .then(() => {
          toast.success("Link Copied Successfully.");
        })
        .catch((error) => {
          toast.error("Error copying link:");
        });

      setLoading(false);
      handleClose();
      return;
    }

    const image = await takeScreenshot(qrCodeRef.current);
    generateQRUrl(qrData?.vehicle_id, { image: image, mimeType: "image/png" })
      .then((data) => {
        navigator.clipboard
          .writeText(data?.data)
          .then(() => {
            toast.success("Link Copied Successfully.");
            setLoading(false);
            handleClose();
          })
          .catch((error) => {
            toast.error("Error copying link:");
            setLoading(false);
            handleClose();
          });
      })
      .catch((error) => {
        setLoading(false);
        handleClose();
        console.log(error);
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
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: "1% 3%",
            }}
          >
            <CloseIcon />
          </IconButton>
          {/* Modal content */}
          <ArgonBox p={3}>
            {loading ? (
              <ProgressBar />
            ) : qrData?.vehicle_id ? (
              <ArgonBox>
                <div ref={qrCodeRef} style={{ padding: "5% 5%" }}>
                  <QRCode
                    size={200}
                    style={{ height: "auto", maxWidth: "100%", width: "95%" }}
                    value={JSON.stringify(qrData)}
                    viewBox={`0 0 256 256`}
                    id="qr-code"
                  />
                </div>
                <Stack spacing={1} direction="row" margin={2} justifyContent={"center"}>
                  <ArgonButton variant="outlined" color="primary" size="medium" onClick={getImage}>
                    <img src={downloadIcon} alt="" />
                    <span>Download QR</span>
                  </ArgonButton>
                  <ArgonButton variant="outlined" color="primary" size="medium" onClick={copyLink}>
                    <img src={copyIcon} alt="" />
                    <span>Copy Link</span>
                  </ArgonButton>
                </Stack>
              </ArgonBox>
            ) : (
              <ArgonBox>
                <Typography variant="h3" textAlign={"center"}>
                  Generating QR Code
                </Typography>
                <Typography variant="h6" textAlign={"center"}>
                  Please Stay With Us
                </Typography>
              </ArgonBox>
            )}
          </ArgonBox>
        </Box>
      </Modal>
    </div>
  );
}

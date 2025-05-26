/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ProgressBar from "components/ProgressBar/ProgressBar";
import { useScreenshot } from "use-react-screenshot";
import { getSafetyFormDetail } from "services/safetyFormService";
import { toast } from "react-toastify";
import CommonDesign from "./commonDesign";
import jsPDF from "jspdf";
import ArgonButton from "components/ArgonButton";

const style = {
  position: "absolute",
  left: "30%",
  bgcolor: "background.paper",
  width: 750,
  p: 2,
  borderRadius: "5px",
};

const flexStyle = {
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  "& > *": {
    width: "30%",
    marginTop: "10px",
  },
};

export default function OperatorFormModal({ id, open, handleClose }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const pdfRef = useRef(null);
  const [image, takeScreenshot] = useScreenshot();

  const getImage = async () => {
    const image = await takeScreenshot(pdfRef.current);
    // saveAs(image, "report.png");
    const pdf = new jsPDF();

    pdf.addImage(image, "PNG", 10, 10, 180, 180);

    pdf.save("report.pdf");
  };

  useEffect(() => {
    if (open) {
      setLoading(true);
      getSafetyFormDetail(id)
        .then((data) => {
          setData(data?.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);

          toast.error("Error fetching data. Please try again.");
        });
    }
  }, [open, id]);

  return (
    <div>
      {loading ? (
        <ProgressBar />
      ) : (
        <>
          <Modal
            open={open}
            id="modal"
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ overflow: "auto" }}
          >
            <Box sx={style} id="pageToDownload">
              {/* Close button */}
              <IconButton
                id="close"
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
                className="exclude-print"
              >
                <CloseIcon />
              </IconButton>
              {/* Modal content */}
              <Box ref={pdfRef} sx={{ p: 2 }}>
                <h4 style={{ fontWeight: "600" }}>Operator&apos;s Logbook </h4>
                <hr />
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    "& > *": {
                      width: "30%",
                      margin: "10px",
                    },
                    border: "1px solid #D7DEE5",
                    //   padding: "1rem",
                  }}
                >
                  {/* Items */}
                  <div className="">
                    <div className="detail-form-sub-heading">VIN</div>
                    <div className="detail-form-text">{data?.basicInfo?.vin_number || "N/A"}</div>
                  </div>
                  <div>
                    <div className="detail-form-sub-heading">Make</div>
                    <div className="detail-form-text">{data?.basicInfo?.make || "N/A"}</div>
                  </div>
                  <div>
                    <div className="detail-form-sub-heading">Model</div>
                    <div className="detail-form-text">{data?.basicInfo?.model || "N/A"}</div>
                  </div>
                  <div>
                    <div className="detail-form-sub-heading">Type</div>
                    <div className="detail-form-text">{data?.vehicle_category || "N/A"}</div>
                  </div>
                  <div>
                    <div className="detail-form-sub-heading">Licence Plate Number</div>
                    <div className="detail-form-text">
                      {data?.basicInfo?.license_plate_number || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="detail-form-sub-heading">Year</div>
                    <div className="detail-form-text">{data?.basicInfo?.year || "N/A"}</div>
                  </div>
                </Box>
                <CommonDesign data={data} />
                <Box sx={flexStyle}>
                  <div className="detail-form-sub-heading">Trailer Attached?</div>
                  <div className="detail-form-text">
                    {data?.safetyForm?.is_trailer_attached ? "Yes" : "No"}
                  </div>
                </Box>
                {data?.safetyForm?.is_trailer_attached ? (
                  <CommonDesign data={data} isTrailer={true} />
                ) : (
                  ""
                )}
                <Box sx={flexStyle}>
                  <div className="detail-form-sub-heading">Signature</div>
                  <div className="detail-form-text">
                    {data?.safetyForm?.signature?.imageUrl ? (
                      <img
                        src={data?.safetyForm?.signature?.imageUrl}
                        height={"100px"}
                        width={"100px"}
                      />
                    ) : (
                      "N/A"
                    )}
                  </div>
                </Box>
              </Box>
              <ArgonButton
                variant="contained"
                sx={{ position: "absolute", right: "10px", bottom: "10px" }}
                color="primary"
                size="medium"
                onClick={getImage}
              >
                Download Report
              </ArgonButton>
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
}

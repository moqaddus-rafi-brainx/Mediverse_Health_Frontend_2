import React from "react";
import Box from "@mui/material/Box";

const commonDesign = ({ data, isTrailer }) => {
  const flexStyle = {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    "& > *": {
      width: "30%",
      marginTop: "10px",
    },
  };

  return (
    <>
      <div>
        <div className="detail-form-sub-heading mt-10">Vehicle Image</div>
        <div className="mt-10">
          {isTrailer ? (
            data?.trailerBasicInfo?.vehicle_photos[0]?.imageUrl ? (
              <img
                src={data?.trailerBasicInfo?.vehicle_photos[0]?.imageUrl}
                width={"100px"}
                height={"100px"}
              />
            ) : (
              "N/A"
            )
          ) : data?.basicInfo?.vehicle_photos[0]?.imageUrl ? (
            <img
              src={data?.basicInfo?.vehicle_photos[0]?.imageUrl}
              width={"100px"}
              height={"100px"}
            />
          ) : (
            "N/A"
          )}
        </div>
      </div>
      {!isTrailer && (
        <div>
          <div className="detail-form-sub-heading mt-10">Current odometer Reading</div>
          <div className="mt-10 detail-form-text">
            {data?.safetyForm?.odometer_reading + "KM" || "N/A"}
          </div>
        </div>
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > *": {
            width: "30%",
            marginTop: "10px",
          },
        }}
      >
        {/* Items */}
        <div className="">
          <div className="detail-form-sub-heading">Engine Oil Checked?</div>
          <div className="detail-form-text">
            {!isTrailer
              ? data?.safetyForm?.is_engine_oil_been_checked
                ? "Yes"
                : "No"
              : data?.trailer?.is_engine_oil_been_checked
              ? "Yes"
              : "No"}
          </div>
        </div>
        <div>
          <div className="detail-form-sub-heading">Brakes Checked?</div>
          <div className="detail-form-text">
            {!isTrailer
              ? data?.safetyForm?.is_brakes_been_checked
                ? "Yes"
                : "No"
              : data?.trailer?.is_brakes_been_checked
              ? "Yes"
              : "No"}
          </div>
        </div>
        <div>
          <div className="detail-form-sub-heading">Lights Checked?</div>
          <div className="detail-form-text">
            {!isTrailer
              ? data?.safetyForm?.is_lights_been_checked
                ? "Yes"
                : "No"
              : data?.trailer?.is_lights_been_checked
              ? "Yes"
              : "No"}
          </div>
        </div>
        <div>
          <div className="detail-form-sub-heading">Tyres Checked?</div>
          <div className="detail-form-text">
            {!isTrailer
              ? data?.safetyForm?.is_tyres_been_checked
                ? "Yes"
                : "No"
              : data?.trailer?.is_tyres_been_checked
              ? "Yes"
              : "No"}
          </div>
        </div>
        <div>
          <div className="detail-form-sub-heading">Any Visual Defects?</div>
          <div className="detail-form-text">
            {!isTrailer
              ? data?.safetyForm?.any_visual_defects
                ? "Yes"
                : "No"
              : data?.trailer?.any_visual_defects
              ? "Yes"
              : "No"}
          </div>
        </div>
      </Box>
      <Box sx={flexStyle}>
        <div className="detail-form-sub-heading">Comments</div>
        <div className="detail-form-text">
          {(!isTrailer ? data?.safetyForm?.comment : data?.trailer?.comment) || "N/A"}
        </div>
      </Box>
      <Box sx={flexStyle}>
        <div className="detail-form-sub-heading">Attachment</div>
        <div className="detail-form-text">
          {!isTrailer ? (
            data?.safetyForm?.attachment?.imageUrl ? (
              <img src={data?.safetyForm?.attachment?.imageUrl} width={"100px"} height={"100px"} />
            ) : (
              "N/A"
            )
          ) : data?.trailer?.attachment?.imageUrl ? (
            <img src={data?.trailer?.attachment?.imageUrl} width={"100px"} height={"100px"} />
          ) : (
            "N/A"
          )}
        </div>
      </Box>
    </>
  );
};

export default commonDesign;

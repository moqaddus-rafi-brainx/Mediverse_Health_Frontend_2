/* eslint-disable react/prop-types */
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArgonBox from "components/ArgonBox";

export default function VehicleCategoryModal({ open, handleClose, setFilters, categories }) {
    const [filter, setFilter] = useState([]);

    const handleFilters = () => {
        setFilters(filter);
        handleClose();
    };

    const clearFilters = () => {
        setFilter([]);
    };

    const handleChange = (value) => {
        const updated = [...filter];
        if (updated.includes(value)) {
            // Value is already in the array, so remove it
            updated.splice(updated.indexOf(value), 1);
        } else {
            // Value is not in the array, so add it
            updated.push(value);
        }
        setFilter(updated);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='vehicle-categories-modal'>
                    {/* Close button */}
                    <ArgonBox display="flex" alignItems="center">
                        <Typography variant="h3">Filters</Typography>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                            className="close-icon-btn"
                        >
                            <CloseIcon />
                        </IconButton>
                    </ArgonBox>
                    <hr className="separator-line"></hr>
                    {/* Modal content */}
                    <Typography>Categories</Typography>
                    <FormGroup className="check-boxes">
                        {
                            categories?.map((obj) => {
                                return (
                                    <ArgonBox key={obj?._id} display="flex" alignItems="center">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value={obj?._id}
                                                    checked={filter?.includes(obj?._id)}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                            }
                                        />
                                        <Typography fontSize={14}>{obj?.category}</Typography>
                                    </ArgonBox>
                                )
                            })
                        }
                    </FormGroup>
                    <hr className="separator-line"></hr>
                    <ArgonBox display="flex" alignItems="center" justifyContent="space-between">
                        <Button
                            variant="outlined"
                            color="secondary"
                            size="medium"
                            className="cancel-btn"
                            onClick={clearFilters}
                        >
                            Clear Filters
                        </Button>
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={handleFilters}
                            className="ok-btn"
                        >
                            Set Filters
                        </Button>
                    </ArgonBox>{" "}
                </Box>
            </Modal>
        </div>
    );
}

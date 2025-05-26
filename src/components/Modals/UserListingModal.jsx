/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import "./ModalStyles.css";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: '488px',
    height: '646px !important',
    overflowY: 'auto',
    bgcolor: "rgba(255, 255, 255, 1)",
    boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.08)',
    borderRadius: "4px",
};


export default function UserListingModal({
    users,
    open,
    handleClose,
    userIds,
    setUserIds,
    handleSubmitAssign
}) {

    const [searchInput, setSearchInput] = React.useState("");

    // Filter users based on the search input
    const filteredUsers = users?.filter(
        (user) =>
            user?.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <div className="px-3 py-2 d-flex align-items-center justify-content-between w-100">
                        <div className="heading-user-listing">
                            Select Workers to Assign Certificate
                        </div>
                        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </div>

                    <div className="d-flex align-items-center justify-content-between w-100 py-1 px-3">
                        <input
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}
                            className="input-field"
                            placeholder="Search worker..."
                        />
                    </div>

                    <div className="users-listing-sub-heading px-3 py-2 d-flex align-items-center justify-content-between w-100">
                        Workers
                    </div>

                    <div className="px-3 py-2 d-flex align-items-center w-100">
                        <input
                            type="checkbox"
                            checked={userIds?.length === users?.length && userIds.length !== 0}
                            onChange={() => {
                                if (users?.length !== 0 && users?.length === userIds.length) {
                                    setUserIds([]);
                                } else {
                                    setUserIds(() => users?.map((obj) => obj?._id));
                                }
                            }}
                            className="me-2"
                            role="button"
                        />
                        <label className="label-styling">Select All</label>
                    </div>

                    <hr className="my-2" />
                    <div className="main_container">
                        {
                            filteredUsers?.map((user) => (
                                <div key={user?._id} className="px-3 py-2 d-flex align-items-center w-100">
                                    <input
                                        type="checkbox"
                                        checked={userIds?.includes(user?._id)}
                                        onChange={() => {
                                            if (userIds?.includes(user?._id)) {
                                                setUserIds(prev => prev.filter(id => id !== user?._id));
                                            } else {
                                                setUserIds((prev) => [...prev, user?._id]);
                                            }
                                        }}
                                        className="me-2"
                                        role="button"
                                    />
                                    <label className="label-styling">
                                        {user?.name}
                                    </label>
                                </div>
                            ))
                        }
                    </div>


                    <ArgonBox sx={{ display: "flex", margin: "2% 3%", float: "right" }}>
                        <ArgonBox sx={{ width: "100%" }}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                size="medium"
                                sx={{
                                    fontFamily: 'Open Sans',
                                    fontSize: '12px',
                                    lineHeight: '20px',
                                    fontWeight: 600,
                                    borderRadius: 2,
                                    color: "rgba(55, 61, 63, 1)",
                                    border: "1px solid rgba(55, 61, 63, 1)",
                                    padding: '8px 12px',

                                }}
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                size="medium"
                                onClick={handleSubmitAssign}
                                sx={{
                                    fontFamily: 'Open Sans',
                                    fontSize: '12px',
                                    lineHeight: '20px',
                                    fontWeight: 600,
                                    padding: '8px 12px',
                                    borderRadius: 2,
                                    backgroundColor: "primary.main",
                                    color: "rgba(255, 255, 255, 1)",
                                    marginLeft: "5px",
                                    "&:hover": {
                                        backgroundColor: "primary.main",
                                    },
                                }}
                            >
                                Confirm
                            </Button>
                        </ArgonBox>
                    </ArgonBox>

                </Box>
            </Modal>
        </div>
    );
}

import { Box, Typography, Modal, Grid } from "@mui/material";
import { Button, Col, Container, Row, Input } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

function DeleteCustomer(props) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '0px solid #000',
        borderRadius: '5px',
        backgroundColor: "white",
        padding: "3%",
        width: "40%"
    };

    const dispatch = useDispatch();

    const { openDeleteUserModal } = useSelector((reduxData) => reduxData.reducers);

    const onConfirmDeleteUser = () => {
        if (props.user.orders.length > 0) {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Cannot delete user because of orders"
                }
            })
        }
        else {
            let content = {
                method: "DELETE", 
                headers: {
                    'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
                },
            }
            fetch("https://shop24-backend.herokuapp.com/customers/" + props.user._id, content)
                .then((response) => response.json())
                .then((data) => { 
                    console.log(data); 

                    console.log(data);

                    if (data.status == "Success 204") {
                        dispatch({
                            type: "OPEN_SNACKBAR",
                            payload: {
                                openSnackbar: true,
                                alertString: "Delete user succesfully"
                            }
                        })
                        dispatch({
                            type: "ALERT_SEVERITY",
                            payload: {
                                alertSeverity: "success"
                            }
                        });
                    }
                    else {
                        dispatch({
                            type: "OPEN_SNACKBAR",
                            payload: {
                                openSnackbar: true,
                                alertString: "Error! Please try again"
                            }
                        })
                    }
                })

            handleModalClose();
        }
    }

    const handleModalClose = () => {
        dispatch({
            type: "DELETE_USER_MODAL",
            payload: {
                openDeleteUserModal: false
            }
        })
    }

    return (
        <>
            <Modal open={openDeleteUserModal} onClose={handleModalClose}>
                <Box style={style}>
                    <Container>
                        <Row className="mt-2 text-center">
                            <Typography><b>Delete User</b></Typography>
                        </Row>
                        <Row className="mt-2 text-center">
                            {
                                props.user !== null
                                    ?
                                    <Typography>Delete username = {props.user.userName} ?</Typography>
                                    :
                                    null
                            }

                        </Row>
                        <Row className="mt-4 text-center bg-danger">
                            <Col className="bg-primary">
                                <btn className="btn bg-primary w-100 m-0" onClick={onConfirmDeleteUser}>Confirm</btn>
                            </Col>
                            <Col className="bg-secondary">
                                <btn className="btn bg-secondary w-100 m-0 text-white" onClick={handleModalClose}>Cancel</btn>
                            </Col>
                        </Row>
                    </Container>
                </Box>
            </Modal>
        </>
    )
}

export default DeleteCustomer
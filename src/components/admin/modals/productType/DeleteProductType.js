import { Box, Typography, Modal, Grid } from "@mui/material";
import { Button, Col, Container, Row, Input } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

function DeleteProductType(props) {
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

    const { openDeleteProductTypeModal } = useSelector((reduxData) => reduxData.reducers);

    const onConfirmDeleteProductType = () => {
        
            let content = {
                method: "DELETE", 
                headers: {
                    'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
                },
            }
            fetch("https://shop24-backend.herokuapp.com/productTypes/" + props.productType._id, content)
                .then((response) => response.json())
                .then((data) => { 
                    console.log(data); 

                    console.log(data);

                    if (data.status == "Success 204") {
                        dispatch({
                            type: "OPEN_SNACKBAR",
                            payload: {
                                openSnackbar: true,
                                alertString: "Delete productType succesfully"
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

    const handleModalClose = () => {
        dispatch({
            type: "DELETE_PRODUCTTYPE_MODAL",
            payload: {
                openDeleteProductTypeModal: false
            }
        })
    }

    return (
        <>
            <Modal open={openDeleteProductTypeModal} onClose={handleModalClose}>
                <Box style={style}>
                    <Container>
                        <Row className="mt-2 text-center">
                            <Typography><b>Delete ProductType</b></Typography>
                        </Row>
                        <Row className="mt-2 text-center">
                            {
                                props.productType !== null
                                    ?
                                    <Typography>Delete productType = {props.productType.name} ?</Typography>
                                    :
                                    null
                            }

                        </Row>
                        <Row className="mt-4 text-center bg-danger">
                            <Col className="bg-primary">
                                <btn className="btn bg-primary w-100 m-0" onClick={onConfirmDeleteProductType}>Confirm</btn>
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

export default DeleteProductType
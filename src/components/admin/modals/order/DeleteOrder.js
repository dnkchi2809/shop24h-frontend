import { Box, Typography, Modal, Grid } from "@mui/material";
import { Button, Col, Container, Row, Input } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

function DeleteOrder(props) {
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

    const { openDeleteOrderModal } = useSelector((reduxData) => reduxData.reducers);

    const [userId, setUserId] = useState("");
    const [orderArrayOfUser, setOrderArrayOfUser] = useState([]);
    const onConfirmDeleteOrder = () => {
        fetch("https://shop24-backend.herokuapp.com/customers")
            .then((response) => response.json())
            .then((result) => {
                result.data.map((element) => {
                    element.orders.map((order) => {
                        if (order == props.order._id) {
                            setUserId(element._id)
                            setOrderArrayOfUser(element.orders)

                            orderArrayOfUser.map((element, index) => {
                                if (element == props.order._id) {
                                    orderArrayOfUser.splice(index, 1);
                                }
                            })

                            let updateOrderUser = {
                                orders: orderArrayOfUser
                            }

                            let content1 = {
                                method: "PUT",
                                headers: {
                                    'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
                                },
                                body: JSON.stringify(updateOrderUser)
                            }
                            fetch("https://shop24-backend.herokuapp.com/customers/" + userId, content1)
                                .then((response) => response.json())
                                .then((result) => {
                                    if (result.status == "Success 200") {
                                        let content2 = {
                                            method: "DELETE",
                                            headers: {
                                                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
                                            },
                                        }
                                        fetch("https://shop24-backend.herokuapp.com/orders/" + props.order._id, content2)
                                            .then((response) => response.json())
                                            .then((data) => {
                                                if (data.status == "Success 204") {
                                                    dispatch({
                                                        type: "OPEN_SNACKBAR",
                                                        payload: {
                                                            openSnackbar: true,
                                                            alertString: "Delete order succesfully"
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
                                    else {
                                        dispatch({
                                            type: "OPEN_SNACKBAR",
                                            payload: {
                                                openSnackbar: true,
                                                alertString: "Error! Please try again"
                                            }
                                        })
                                        handleModalClose();
                                    }
                                })
                        }
                    })
                })
            })
    }

    const handleModalClose = () => {
        dispatch({
            type: "DELETE_ORDER_MODAL",
            payload: {
                openDeleteOrderModal: false
            }
        })
    }

    return (
        <>
            <Modal open={openDeleteOrderModal} onClose={handleModalClose}>
                <Box style={style}>
                    <Container>
                        <Row className="mt-2 text-center">
                            <Typography><b>Delete Order</b></Typography>
                        </Row>
                        <Row className="mt-2 text-center">
                            {
                                props.order !== null
                                    ?
                                    <Typography>Delete order = {props.order._id} ?</Typography>
                                    :
                                    null
                            }

                        </Row>
                        <Row className="mt-4 text-center bg-danger">
                            <Col className="bg-primary">
                                <btn className="btn bg-primary w-100 m-0" onClick={onConfirmDeleteOrder}>Confirm</btn>
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

export default DeleteOrder
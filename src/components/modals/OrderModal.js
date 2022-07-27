import { Box, Typography, Modal, Grid } from "@mui/material";
import { Button, Col, Container, Row, Input } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

function OrderModal(props) {
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

    const { openOrderModal } = useSelector((reduxData) => reduxData.reducers);

    let newOrder = {
        note: "",
        orderDetail: props.itemList,
        cost: props.total
    }

    const onNoteInput = (event) => {
        newOrder.note = event.target.value
    }

    const onConfirmCreateOrderClick = () => {
        let content = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newOrder)
        }

        fetch("https://shop24-backend.herokuapp.com/orders", content)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                alert("Tạo đơn hàng thành công")
            })

        handleModalClose();
    }

    const handleModalClose = () => {
        dispatch({
            type: "ORDER_MODAL",
            payload: {
                openOrderModal: false
            }
        })
    }

    return (
        <>
            <Modal open={openOrderModal} onClose={handleModalClose}>
                <Box style={style}>
                    <Container>
                        <Row className="mt-3">
                            <Col className="col-3">Fullname:</Col>
                            <Col>{props.user.displayName}</Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="col-3">Phone:</Col>
                            <Col>{props.user.phone}</Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="col-3">Email:</Col>
                            <Col>{props.user.email}</Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="col-3">Total:</Col>
                            <Col><b>{props.total} USD</b></Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="col-3">Note:</Col>
                            <Col>
                                <Input placeholder="..." onInput={onNoteInput} />
                            </Col>
                        </Row>
                        <Row className="mt-4 text-center">
                            <Col>
                                <Button className="btn btn-info w-50" style={{ borderRadius: "25px" }} onClick={onConfirmCreateOrderClick}>Confirm</Button>
                            </Col>
                            <Col>
                                <Button className="btn btn-secondary w-50" style={{ borderRadius: "25px" }} onClick={handleModalClose}>Cancel</Button>
                            </Col>
                        </Row>
                    </Container>
                </Box>
            </Modal>
        </>
    )
}

export default OrderModal
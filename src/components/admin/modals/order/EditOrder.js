import { Box, Typography, Modal, Grid } from "@mui/material";
import { Button, Col, Container, Row, Input } from "reactstrap";
import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

function EditOrder(props) {
    console.log(props.order)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '0px solid #000',
        borderRadius: '5px',
        backgroundColor: "white",
        padding: "3%",
        width: "60%"
    };

    const dispatch = useDispatch();

    const { openEditOrderModal } = useSelector((reduxData) => reduxData.reducers);

    const [newOrderDetail, setNewOrderDetail] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        country: "",
        orderItems: []
    })

    const onInputNameChange = (event) => {
        newOrderDetail.name = event.target.value
    }

    const onInputPhoneChange = (event) => {
        newOrderDetail.phone = event.target.value;
        fetch("https://shop24-backend.herokuapp.com/customers?phone=" + editUser.phone)
            .then((response) => response.json())
            .then((data) => {
                if (data.data.length >= 1) {
                    dispatch({
                        type: "OPEN_SNACKBAR",
                        payload: {
                            openSnackbar: true,
                            alertString: "Phone already exists"
                        }
                    })
                }
            })
    }

    const onInputEmailChange = (event) => {
        newOrderDetail.email = event.target.value;
        fetch("https://shop24-backend.herokuapp.com/customers?email=" + editUser.email)
            .then((response) => response.json())
            .then((data) => {
                if (data.data.length >= 1) {
                    dispatch({
                        type: "OPEN_SNACKBAR",
                        payload: {
                            openSnackbar: true,
                            alertString: "Email already exists"
                        }
                    })
                }
            })
    }

    const onInputAddressChange = (event) => {
        newOrderDetail.address = event.target.value
    }

    const onInputCityChange = (event) => {
        newOrderDetail.city = event.target.value
    }

    const onInputCountryChange = (event) => {
        newOrderDetail.country = event.target.value
    }


    const onConfirmCreateOrderClick = () => {
        let validOrder = validateOrder(newOrderDetail);
        let arrayTemp = []
        if (validOrder) {
            arrayTemp.push(newOrderDetail)
            let editBody = {
                orderDetail: arrayTemp
            }
            let content = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editBody)
            }

            fetch("https://shop24-backend.herokuapp.com/orders/" + props.order._id, content)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);

                    if (data.status == "Success 200") {
                        dispatch({
                            type: "OPEN_SNACKBAR",
                            payload: {
                                openSnackbar: true,
                                alertString: "Edit order succesfully"
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

            handleModalClose()
        }

    }

    const validateOrder = (paramOrder) => {
        console.log(paramOrder);
        if (paramOrder.name == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Fullname is invalid"
                }
            })
            return false
        }
        if (paramOrder.phone == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Phone is invalid"
                }
            })
            return false
        }
        if (paramOrder.email == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Email is invalid"
                }
            })
            return false
        }
        if (paramOrder.address == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Address is invalid"
                }
            })
            return false
        }
        if (paramOrder.city == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "City is invalid"
                }
            })
            return false
        }
        if (paramOrder.country == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Country is invalid"
                }
            })
            return false
        }
        if (paramOrder.userName == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Ordername is invalid"
                }
            })
            return false
        }
        if (paramOrder.orderItems.length <= 0) {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Orders is invalid"
                }
            })
            return false
        }
        return true
    }

    const handleModalClose = () => {
        dispatch({
            type: "EDIT_ORDER_MODAL",
            payload: {
                openEditOrderModal: false
            }
        })
    }

    useEffect(() => {
        if (props.order !== null) {
            newOrderDetail.name = props.order.orderDetail[0].name;
            newOrderDetail.phone = props.order.orderDetail[0].phone;
            newOrderDetail.email = props.order.orderDetail[0].email;
            newOrderDetail.address = props.order.orderDetail[0].address;
            newOrderDetail.city = props.order.orderDetail[0].city;
            newOrderDetail.country = props.order.orderDetail[0].country;
            newOrderDetail.orderItems = props.order.orderDetail[0].orderItems;
        }
    }, [props.order])

    return (
        <>
            <Modal open={openEditOrderModal} onClose={handleModalClose}>
                <Box style={style}>
                    <Container>
                        <Row className="mt-2 text-center">
                            <Typography><b>Update Order</b></Typography>
                        </Row>
                        {
                            props.order !== null
                                ?
                                <>
                                    <Row className="mt-3">
                                        <Col>
                                            <Row>
                                                <Col className="col-4">Fullname:</Col>
                                                <Col>
                                                    <Input defaultValue={props.order.orderDetail[0].name} onInput={onInputNameChange} />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Col className="col-4">Address:</Col>
                                                <Col>
                                                    <Input defaultValue={props.order.orderDetail[0].phone} onInput={onInputAddressChange} />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col>
                                            <Row>
                                                <Col className="col-4">Phone:</Col>
                                                <Col>
                                                    <Input defaultValue={props.order.orderDetail[0].phone} onInput={onInputPhoneChange} />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Col className="col-4">City:</Col>
                                                <Col>
                                                    <Input defaultValue={props.order.orderDetail[0].city} onInput={onInputCityChange} />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col>
                                            <Row>
                                                <Col className="col-4">Email:</Col>
                                                <Col>
                                                    <Input type="email" defaultValue={props.order.orderDetail[0].email} onInput={onInputEmailChange} />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Col className="col-4">Country:</Col>
                                                <Col>
                                                    <Input defaultValue={props.order.orderDetail[0].country} onInput={onInputCountryChange} />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col className="col-2">Orders:</Col>
                                        <Col>
                                            {
                                                <TableContainer className="w-100" >
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className="text-center" style={{width : "50%"}}><b>Product</b></TableCell>
                                                            <TableCell className="text-center" style={{width : "20%"}}><b>Price</b></TableCell>
                                                            <TableCell className="text-center" style={{width : "10%"}}><b>Quantity</b></TableCell>
                                                            <TableCell className="text-center" style={{width : "20%"}}><b>Amount</b></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            props.order.orderDetail[0].orderItems.map((element) => {
                                                                return (
                                                                    <>
                                                                        <TableRow>
                                                                            <TableCell className="text-center p-0" >{element.info.name}</TableCell>
                                                                            <TableCell className="text-center">{element.info.promotionPrice}</TableCell>
                                                                            <TableCell className="text-center" >{element.amount}</TableCell>
                                                                            <TableCell className="text-center" >{element.info.promotionPrice * element.amount}</TableCell>
                                                                        </TableRow>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </TableBody>
                                                </TableContainer>
                                            }
                                        </Col>
                                    </Row>
                                    <Row className="mt-2 text-right">
                                        <Typography><b>Total : {props.order.cost} USD</b></Typography>
                                    </Row>
                                </>
                                :
                                null
                        }

                        <Row className="mt-4 text-center bg-danger">
                            <Col className="bg-primary">
                                <btn className="btn bg-primary w-100 m-0" onClick={onConfirmCreateOrderClick}>Confirm</btn>
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

export default EditOrder
import { Box, Typography, Modal, Grid } from "@mui/material";
import { Button, Col, Container, Row, Input } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

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

    const [customerInfo, setCustomerInfo] = useState({
        name: props.user.displayName,
        phone: props.user.phone,
        email: props.user.email,
        address: props.user.address,
        city: props.user.city,
        country: props.user.country,
        orderItems: props.itemList
    })

    const [newOrder, setNewOrder] = useState({
        note: "",
        orderDetail: customerInfo,
        cost: props.total
    })

    const onInputNameChange = (event) => {
        customerInfo.name = event.target.value
    }

    const onInputPhoneChange = (event) => {
        customerInfo.phone = event.target.value
    }

    const onInputEmailChange = (event) => {
        customerInfo.email = event.target.value
    }

    const onInputAddressChange = (event) => {
        customerInfo.address = event.target.value
    }

    const onInputCityChange = (event) => {
        customerInfo.city = event.target.value
    }

    const onInputCountryChange = (event) => {
        customerInfo.country = event.target.value
    }

    const onNoteInput = (event) => {
        newOrder.note = event.target.value
    }

    const onConfirmCreateOrderClick = () => {
        let validOrder = validateOrder(newOrder);

        if (validOrder) {
            //kiem tra so dien thoai
            fetch("https://shop24-backend.herokuapp.com/customers?phone=" + newOrder.orderDetail.phone)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);

                    //nếu có customer trùng sdt ==> update orderid vào customer
                    if (data.data.length >= 1) {
                        console.log("số điện thoại đã có");
                        //lấy userId
                        let userId = data.data[0]._id;
                        let userOrder = data.data[0].orders;

                        //tao don hang
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

                                //lấy id đơn hàng
                                let orderId = data.data._id
                                userOrder.push(orderId)
                                let body = {
                                    orders: userOrder
                                }
                                //tạo content update customer
                                let content1 = {
                                    method: "PUT",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(body)
                                }

                                fetch("https://shop24-backend.herokuapp.com/customers/" + userId, content1)
                                    .then((response) => response.json())
                                    .then((data) => {
                                        console.log(data);
                                    });

                                dispatch({
                                    type: "OPEN_SNACKBAR",
                                    payload: {
                                        openSnackbar: true,
                                        alertString: "Payment success"
                                    }
                                })
                                dispatch({
                                    type: "ALERT_SEVERITY",
                                    payload: {
                                        alertSeverity: "success"
                                    }
                                });
                            })
                        
                        handleModalClose();
                    }
                    //nếu chưa có customer có sdt này ==> tạo mới customer và update orderId
                    else {
                        //tao don hang
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

                                //lấy id đơn hàng
                                let orderId = data.data._id
                                let newUserOrder = []
                                newUserOrder.push(orderId)
                                let body = {
                                    userName: newOrder.orderDetail.email,
                                    password: "12345678",
                                    fullName: newOrder.orderDetail.name,
                                    phone: newOrder.orderDetail.phone,
                                    email: newOrder.orderDetail.email,
                                    address: newOrder.orderDetail.address,
                                    city: newOrder.orderDetail.city,
                                    country: newOrder.orderDetail.country,
                                    orders: newUserOrder
                                }
                                //tạo content update customer
                                let content1 = {
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(body)
                                }

                                fetch("https://shop24-backend.herokuapp.com/customers", content1)
                                    .then((response) => response.json())
                                    .then((data) => {
                                        console.log(data);
                                    });

                                dispatch({
                                    type: "OPEN_SNACKBAR",
                                    payload: {
                                        openSnackbar: true,
                                        alertString: "Payment success"
                                    }
                                })
                                dispatch({
                                    type: "ALERT_SEVERITY",
                                    payload: {
                                        alertSeverity: "success"
                                    }
                                });
                            })

                        handleModalClose();
                    }

                    let localItem = JSON.parse(localStorage.getItem("orderList")) || [] ;
                    localItem.map((element2, index2) => {
                        props.itemList.map((element, index) => {
                            if(element.product == element2.product){
                                localItem.splice(index2, 1)
                            }
                        })
                    })
                    
                    localStorage.setItem("orderList", JSON.stringify(localItem));
                })
        }
    }

    const validateOrder = (paramUser) => {
        if (paramUser.orderDetail.name == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Fullname is invalid"
                }
            })
            return false
        }
        if (paramUser.orderDetail.phone == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Phone is invalid"
                }
            })
            return false
        }
        if (paramUser.orderDetail.email == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Email is invalid"
                }
            })
            return false
        }
        if (paramUser.orderDetail.address == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Address is invalid"
                }
            })
            return false
        }
        if (paramUser.orderDetail.city == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "City is invalid"
                }
            })
            return false
        }
        if (paramUser.orderDetail.country == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Country is invalid"
                }
            })
            return false
        }
        return true
    }

    const handleModalClose = () => {
        dispatch({
            type: "ORDER_MODAL",
            payload: {
                openOrderModal: false
            }
        })
    }

    useEffect(() => {

    }, [])

    return (
        <>
            <Modal open={openOrderModal} onClose={handleModalClose}>
                <Box style={style}>
                    <Container>
                        <Row className="mt-2 text-center">
                            <Typography><b>Payment Infomation</b></Typography>
                        </Row>
                        <Row className="mt-3">
                            <Col className="col-3">Fullname:</Col>
                            <Col>
                                <Input defaultValue={customerInfo.name} onInput={onInputNameChange} />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="col-3">Phone:</Col>
                            <Col>
                                <Input defaultValue={customerInfo.phone} onInput={onInputPhoneChange} />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="col-3">Email:</Col>
                            <Col>
                                <Input defaultValue={customerInfo.email} onInput={onInputEmailChange} />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="col-3">Address:</Col>
                            <Col>
                                <Input defaultValue={customerInfo.address} onInput={onInputAddressChange} />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="col-3">City:</Col>
                            <Col>
                                <Input defaultValue={customerInfo.city} onInput={onInputCityChange} />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="col-3">Country:</Col>
                            <Col>
                                <Input defaultValue={customerInfo.country} onInput={onInputCountryChange} />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="col-3">Total:</Col>
                            <Col><b>{props.total} USD</b></Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="col-3">Note:</Col>
                            <Col>
                                <Input onInput={onNoteInput} />
                            </Col>
                        </Row>
                        <Row className="mt-4 text-center bg-danger">
                            <Col className="bg-info">
                                <btn className="btn bg-info w-100 m-0" onClick={onConfirmCreateOrderClick}>Confirm</btn>
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

export default OrderModal
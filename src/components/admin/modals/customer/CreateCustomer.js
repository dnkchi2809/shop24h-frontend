import { Box, Typography, Modal, Grid } from "@mui/material";
import { Button, Col, Container, Row, Input } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

function CreateCustomer() {
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

    const { openCreateUserModal } = useSelector((reduxData) => reduxData.reducers);

    const [newUser, setNewUser] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        country: "",
        userName: "",
        password: 12345678
    })

    const onInputNameChange = (event) => {
        newUser.fullName = event.target.value
    }

    const onInputPhoneChange = (event) => {
        newUser.phone = event.target.value
        fetch("https://shop24-backend.herokuapp.com/customers?phone=" + newUser.phone)
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
        newUser.email = event.target.value
        fetch("https://shop24-backend.herokuapp.com/customers?email=" + newUser.email)
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
        newUser.address = event.target.value
    }

    const onInputCityChange = (event) => {
        newUser.city = event.target.value
    }

    const onInputCountryChange = (event) => {
        newUser.country = event.target.value
    }

    const onInputUserNameChange = (event) => {
        newUser.userName = event.target.value;
        fetch("https://shop24-backend.herokuapp.com/customers?userName=" + newUser.userName)
            .then((response) => response.json())
            .then((data) => {
                if (data.data.length >= 1) {
                    dispatch({
                        type: "OPEN_SNACKBAR",
                        payload: {
                            openSnackbar: true,
                            alertString: "Username already exists"
                        }
                    })
                }
            })

    }

    const onConfirmCreateUserClick = () => {
        let validOrder = validateUser(newUser);

        if (validOrder) {
            let content = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            }

            fetch("https://shop24-backend.herokuapp.com/customers", content)
                .then((response) => response.json())
                .then((data) => {

                    if (data.status == "Success 201") {
                        dispatch({
                            type: "OPEN_SNACKBAR",
                            payload: {
                                openSnackbar: true,
                                alertString: "Create user succesfully"
                            }
                        })
                        dispatch({
                            type: "ALERT_SEVERITY",
                            payload: {
                                alertSeverity: "success"
                            }
                        });
                    }
                    else{
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

    const validateUser = (paramUser) => {
        if (paramUser.fullName == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Fullname is invalid"
                }
            })
            return false
        }
        if (paramUser.phone == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Phone is invalid"
                }
            })
            return false
        }
        if (paramUser.email == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Email is invalid"
                }
            })
            return false
        }
        if (paramUser.address == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Address is invalid"
                }
            })
            return false
        }
        if (paramUser.city == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "City is invalid"
                }
            })
            return false
        }
        if (paramUser.country == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Country is invalid"
                }
            })
            return false
        }
        if (paramUser.userName == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Username is invalid"
                }
            })
            return false
        }
        return true
    }

    const handleModalClose = () => {
        dispatch({
            type: "CREATE_USER_MODAL",
            payload: {
                openCreateUserModal: false
            }
        })
    }

    useEffect(() => {

    })

    return (
        <>
            <Modal open={openCreateUserModal} onClose={handleModalClose}>
                <Box style={style}>
                    <Container>
                        <Row className="mt-2 text-center">
                            <Typography><b>Create User</b></Typography>
                        </Row>
                        <Row>
                            <Col>
                                <Row className="mt-3">
                                    <Col className="col-3">Fullname:</Col>
                                    <Col>
                                        <Input onInput={onInputNameChange} />
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col className="col-3">Phone:</Col>
                                    <Col>
                                        <Input onInput={onInputPhoneChange} />
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col className="col-3">Email:</Col>
                                    <Col>
                                        <Input type="email" onInput={onInputEmailChange} />
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col className="col-3">Username:</Col>
                                    <Col>
                                        <Input onInput={onInputUserNameChange} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row className="mt-3">
                                    <Col className="col-3">Address:</Col>
                                    <Col>
                                        <Input onInput={onInputAddressChange} />
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col className="col-3">City:</Col>
                                    <Col>
                                        <Input onInput={onInputCityChange} />
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col className="col-3">Country:</Col>
                                    <Col>
                                        <Input onInput={onInputCountryChange} />
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col className="col-3">Password default:</Col>
                                    <Col>
                                        <Input value="12345678" readOnly />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-4 text-center bg-danger">
                            <Col className="bg-primary">
                                <btn className="btn bg-primary w-100 m-0" onClick={onConfirmCreateUserClick}>Confirm</btn>
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

export default CreateCustomer
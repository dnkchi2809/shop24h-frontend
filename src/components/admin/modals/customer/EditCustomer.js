import { Box, Typography, Modal, Grid } from "@mui/material";
import { Button, Col, Container, Row, Input } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

function EditCustomer(props) {
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

    const { openEditUserModal } = useSelector((reduxData) => reduxData.reducers);

    const [editUser, setNewUser] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        country: "",
        userName: "",
        password: ""
    })

    const onInputNameChange = (event) => {
        editUser.fullName = event.target.value
    }

    const onInputPhoneChange = (event) => {
        editUser.phone = event.target.value
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
        editUser.email = event.target.value
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
        editUser.address = event.target.value
    }

    const onInputCityChange = (event) => {
        editUser.city = event.target.value
    }

    const onInputCountryChange = (event) => {
        editUser.country = event.target.value
    }

    const onInputPasswordChange = (event) => {
        editUser.password = event.target.value
    }

    const onInputUserNameChange = (event) => {
        editUser.userName = event.target.value;
        fetch("https://shop24-backend.herokuapp.com/customers?userName=" + editUser.userName)
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
        let validOrder = validateUser(editUser);
        console.log(editUser);

        if (validOrder) {
            let content = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editUser)
            }

            fetch("https://shop24-backend.herokuapp.com/customers/" + props.user._id, content)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);

                    if (data.status == "Success 200") {
                        dispatch({
                            type: "OPEN_SNACKBAR",
                            payload: {
                                openSnackbar: true,
                                alertString: "Edit user succesfully"
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
        if (paramUser.password == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Password is invalid"
                }
            })
            return false
        }
        return true
    }

    const handleModalClose = () => {
        dispatch({
            type: "EDIT_USER_MODAL",
            payload: {
                openEditUserModal: false
            }
        })
    }

    useEffect(() => {
        if(props.user !== null){
            editUser.fullName = props.user.fullName,
            editUser.phone = props.user.phone,
            editUser.email= props.user.email,
            editUser.address = props.user.address,
            editUser.city = props.user.city,
            editUser.country = props.user.country,
            editUser.userName = props.user.userName,
            editUser.password = props.user.password
        }
    },[])

    return (
        <>
            <Modal open={openEditUserModal} onClose={handleModalClose}>
                <Box style={style}>
                    <Container>
                        <Row className="mt-2 text-center">
                            <Typography><b>Edit User</b></Typography>
                        </Row>
                        {
                            props.user !== null
                                ?
                                <Row>
                                    <Col>
                                        <Row className="mt-3">
                                            <Col className="col-3">Fullname:</Col>
                                            <Col>
                                                <Input defaultValue={props.user.fullName} onInput={onInputNameChange} />
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col className="col-3">Phone:</Col>
                                            <Col>
                                                <Input defaultValue={props.user.phone} onInput={onInputPhoneChange} />
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col className="col-3">Email:</Col>
                                            <Col>
                                                <Input defaultValue={props.user.email} type="email" onInput={onInputEmailChange} />
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col className="col-3">Username:</Col>
                                            <Col>
                                                <Input defaultValue={props.user.userName} onInput={onInputUserNameChange} />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row className="mt-3">
                                            <Col className="col-3">Address:</Col>
                                            <Col>
                                                <Input defaultValue={props.user.address} onInput={onInputAddressChange} />
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col className="col-3">City:</Col>
                                            <Col>
                                                <Input defaultValue={props.user.city} onInput={onInputCityChange} />
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col className="col-3">Country:</Col>
                                            <Col>
                                                <Input defaultValue={props.user.country} onInput={onInputCountryChange} />
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col className="col-3">Password default:</Col>
                                            <Col>
                                                <Input defaultValue={props.user.password} onInput={onInputPasswordChange} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                :
                                null
                        }
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

export default EditCustomer
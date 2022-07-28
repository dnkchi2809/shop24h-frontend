import { Box, Typography, Modal, Grid } from "@mui/material";
import { Button, Col, Container, Row, Input } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

import { auth, googleProvider } from "../../firebase"

function SigninModal(props) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '0px solid #000',
        borderRadius: '5px',
        backgroundColor: "white",
        padding: "3%"
    };

    const dispatch = useDispatch();

    const { openSignInModal } = useSelector((reduxData) => reduxData.reducers);

    const newUser = {
        fullName: "",
        phone: "",
        email: "",
        userName: "",
        password: "",
        repeatPassword: ""
    }

    const onBtnSigninGoogleClick = () => {
        auth.signInWithPopup(googleProvider)
            .then((result) => {
                console.log(result);

                dispatch({
                    type: "OPEN_SNACKBAR",
                    payload: {
                        openSnackbar: true,
                        alertString: "Sign in with Google Account"
                    }
                })
                dispatch({
                    type: "ALERT_SEVERITY",
                    payload: {
                        alertSeverity: "success"
                    }
                });

                handleModalClose();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const onFullnameInput = (event) => {
        newUser.fullName = event.target.value
    }

    const onPhoneInput = (event) => {
        newUser.phone = event.target.value
    }

    const onEmailInput = (event) => {
        newUser.email = event.target.value
    }

    const onUsernameInput = (event) => {
        newUser.userName = event.target.value
    }

    const onPasswordInput = (event) => {
        newUser.password = event.target.value
    }

    const onRepeatPasswordInput = (event) => {
        newUser.repeatPassword = event.target.value
    }

    const onBtnSignInClick = () => {
        console.log(newUser);
        let validUser = validateUser(newUser);
        if (validUser) {
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
                    console.log(data);
                    dispatch({
                        type: "OPEN_SNACKBAR",
                        payload: {
                            openSnackbar: true,
                            alertString: "Sign in successfully"
                        }
                    })
                    dispatch({
                        type: "ALERT_SEVERITY",
                        payload: {
                            alertSeverity: "success"
                        }
                    });
                    localStorage.setItem("user", JSON.stringify(data.data))
                })

            handleModalClose()
        }
    }

    const handleModalClose = () => {
        dispatch({
            type: "SIGNIN_MODAL",
            payload: {
                openSigninModal: false
            }
        })
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
        if (paramUser.repeatPassword !== paramUser.password) {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Repeat Password is invalid"
                }
            })
            return false
        }
        return true
    }

    return (
        <>
            <Modal open={openSignInModal} onClose={handleModalClose}>
                <Box style={style} className="modal-style">
                    <Container>
                        <Row>
                            <Button color="danger" style={{ borderRadius: "25px" }} onClick={onBtnSigninGoogleClick}><i className="fab fa-google"></i> &nbsp; Sign in with <b>Google</b></Button>
                        </Row>
                        <Row className="text-center mt-4 mb-4">
                            <b>or</b>
                        </Row>
                        <Row className="mt-3">
                            <Input style={{ borderRadius: "25px" }} placeholder="Fullname" onInput={onFullnameInput}></Input>
                        </Row>
                        <Row className="mt-3">
                            <Input style={{ borderRadius: "25px" }} placeholder="Phone" onInput={onPhoneInput}></Input>
                        </Row>
                        <Row className="mt-3">
                            <Input style={{ borderRadius: "25px" }} placeholder="Email" onInput={onEmailInput}></Input>
                        </Row>
                        <Row className="mt-3">
                            <Input style={{ borderRadius: "25px" }} placeholder="Username" onInput={onUsernameInput}></Input>
                        </Row>
                        <Row className="mt-3">
                            <Input type="password" style={{ borderRadius: "25px" }} placeholder="Password" onInput={onPasswordInput}></Input>
                        </Row>
                        <Row className="mt-3">
                            <Input type="password" style={{ borderRadius: "25px" }} placeholder="Repeat Password" onInput={onRepeatPasswordInput}></Input>
                        </Row>
                        <Row className="mt-3">
                            <Button color="dark" style={{ borderRadius: "25px" }} onClick={onBtnSignInClick}>Sign in</Button>
                        </Row>
                    </Container>
                </Box>
            </Modal>
        </>
    )
}

export default SigninModal
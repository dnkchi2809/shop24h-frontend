import { Box, Typography, Modal, Grid } from "@mui/material";
import { Button, Col, Container, Row, Input } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

import { auth, googleProvider } from "../../firebase"

function LoginModal(props) {
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

    const { openLoginModal } = useSelector((reduxData) => reduxData.reducers);

    const onBtnLoginGoogleClick = () => {
        auth.signInWithPopup(googleProvider)
            .then((result) => {
                console.log(result);

                dispatch({
                    type: "SET_USER",
                    payload: {
                        user: result
                    }
                });

                handleModalClose();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const userLogin = {
        username : "",
        password : ""
    }

    const onUsernameInput = (event) => {
        userLogin.username = event.target.value;
    }

    const onPasswordInput = (event) => {
        userLogin.password = event.target.value;
    }

    const onBtnLoginClick = () => {
        let validUser = validateUser(userLogin);

        if(validUser){
            fetch("https://shop24-backend.herokuapp.com/customers?userName=" + userLogin.username)
            .then((response) => response.json())
            .then((data) => {
                if(data.data.length >= 1){
                    if(data.data[0].password == userLogin.password){
                        dispatch({
                            type: "SET_USER",
                            payload: {
                                user: data.data[0]
                            }
                        });
                    }
                    else{
                        alert("Wrong password");
                    }
                }
                else{
                    alert("Username is not exit");
                }
                
            })
            handleModalClose();
        }
    }

    const validateUser = (paramUser) => {
        if(paramUser.username == "") {
            alert("username is invalid");
            return false
        }

        if(paramUser.password == "") {
            alert("password is invalid");
            return false
        }

        return true
    }

    const onBtnHaventAcountClick = () => {
        dispatch({
            type: "SIGNIN_MODAL",
            payload: {
                openSignInModal: true
            }
        });
        handleModalClose();
    }

    const handleModalClose = () => {
        dispatch({
            type: "LOGIN_MODAL",
            payload: {
                openLoginModal: false
            }
        })
    }

    return (
        <>
            <Modal open={openLoginModal} onClose={handleModalClose}>
                <Box style={style} className="modal-style">
                    <Container>
                        <Row>
                            <Button color="primary" style={{ borderRadius: "25px" }} onClick={onBtnLoginGoogleClick}><i className="fab fa-google"></i> &nbsp; Log in with <b>Google</b></Button>
                        </Row>
                        <Row className="text-center mt-4 mb-4">
                            <b>or</b>
                        </Row>
                        <Row className="mt-3">
                            <Input style={{ borderRadius: "25px" }} placeholder="Username" onInput={onUsernameInput}></Input>
                        </Row>
                        <Row className="mt-3">
                            <Input type="password" style={{ borderRadius: "25px" }} placeholder="Password" onInput={onPasswordInput}></Input>
                        </Row>
                        <Row className="mt-3">
                            <Button color="dark" style={{ borderRadius: "25px" }} onClick={onBtnLoginClick}>Log in</Button>
                        </Row>
                        <Row className="mt-3">
                            <Button color="btn border-danger bg-white text-danger" style={{ borderRadius: "25px" }} onClick={onBtnHaventAcountClick}>Haven't an account?</Button>
                        </Row>
                    </Container>
                </Box>
            </Modal>
        </>
    )
}

export default LoginModal
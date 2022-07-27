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
                            <Button color="primary" style={{ borderRadius: "25px" }} onClick={onBtnLoginGoogleClick}><i class="fab fa-google"></i> &nbsp; Sign in with <b>Google</b></Button>
                        </Row>
                        <Row className="text-center mt-4 mb-4">
                            <b>or</b>
                        </Row>
                        <Row className="mt-3">
                            <Input style={{ borderRadius: "25px" }} placeholder="Username"></Input>
                        </Row>
                        <Row className="mt-3">
                            <Input style={{ borderRadius: "25px" }} placeholder="Password"></Input>
                        </Row>

                        <Row className="mt-3">
                            <Button color="dark" style={{ borderRadius: "25px" }}>Sign in</Button>
                        </Row>
                    </Container>
                </Box>
            </Modal>
        </>
    )
}

export default LoginModal
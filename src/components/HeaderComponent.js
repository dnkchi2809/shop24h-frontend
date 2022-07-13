import React from 'react';
import { Grid } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Row, Col, List, ListInlineItem } from "reactstrap";
import logoImg from "../app/image/logo.PNG";
import LoginModal from "./modals/LoginModal";
import { auth } from "../firebase"

function HeaderComponent() {
    const dispatch = useDispatch();
    const { user, openLoginModal, openSignInModal } = useSelector((reduxData) => reduxData.reducers);

    const onBtnLogInClick = () => {
        dispatch({
            type: "LOGIN_MODAL",
            payload: {
                openLoginModal: true
            }
        })
    }

    const onBtnLogoutClick = () => {
        auth.signOut()
            .then(() => {
                dispatch({
                    type: "SET_USER",
                    payload: {
                        user: null
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });

        handleClose();
    }

    const onBtnSignInClick = () => {
        dispatch({
            type: "SIGNIN_MODAL",
            payload: {
                openSignInModal: true
            }
        })
    }
    const [anchorEl, setAnchorEl] = React.useState(null);

    const onAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        auth.onAuthStateChanged((result) => {
            console.log(result);
            dispatch({
                type: "SET_USER",
                payload: {
                    user: result
                }
            });
        })
    }, [])


    return (
        <>
            <Grid style={{ backgroundColor: "black", color: "white" }} className="fixed-top">
                <Grid className="container mb-2 mt-1">
                    <Row style={{ height: "35px" }}>
                        <Col className="m-0 p-0">
                            <List type="inline">
                                <ListInlineItem>
                                    <Button variant="text" sx={{ color: "white", padding: "0%" }} onClick={() => console.log("Home")}>
                                        <i class="fa-solid fa-house"></i>&nbsp;
                                        Home
                                    </Button>
                                </ListInlineItem>
                                <ListInlineItem>
                                    <Button variant="text" sx={{ color: "white" }} onClick={() => console.log("Contact Us")}>
                                        <i class="fa-solid fa-phone"></i>&nbsp;
                                        Contact Us
                                    </Button>
                                </ListInlineItem>
                            </List>
                        </Col>
                        <Col className="d-flex justify-content-end p-0 m-0">
                            <Row>
                                {
                                    user
                                        ?
                                        <>
                                            <Col className="p-0 m-0">
                                                <Row>
                                                    <Col className='col-10 d-flex justify-content-end align-items-center'>
                                                        <p className='mt-1'>Hello, {user.displayName}</p>
                                                    </Col>
                                                    <Col>
                                                        <img src={user.photoURL} style={{ width: "100%", borderRadius : "50%" }} onClick={onAvatarClick} />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Menu
                                                id="fade-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                TransitionComponent={Fade}
                                            >
                                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                                <MenuItem onClick={onBtnLogoutClick}>Logout</MenuItem>
                                            </Menu>
                                        </>
                                        :
                                        <>
                                            <Col>
                                                <Button className='mt-2 p-0' variant="text" sx={{ color: "white" }} onClick={onBtnSignInClick}>Sign In</Button>
                                            </Col>
                                            <Col>
                                                <Button className='mt-2 p-0' variant="text " sx={{ color: "white"}} onClick={onBtnLogInClick}>Log In</Button>
                                            </Col>
                                        </>
                                }

                            </Row>
                        </Col>
                    </Row>
                    <Row className="p-0">
                        <Col className="col-2 d-flex justify-content-center p-0">
                            <img src={logoImg} style={{ width: "50%", objectFit: "contain" }} />
                        </Col>
                        <Col className="col-8">
                            <Row style={{ backgroundColor: "white" }} className="mt-3">
                                <Col className="col-11">
                                    <Input placeholder="Nhập thông tin" style={{ border: "none" }} />
                                </Col>
                                <Col className="col-1 mt-1 text-center">
                                    <i class="fa-solid fa-magnifying-glass text-primary"></i>
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <List type="inline" style={{ color: "#d6e0f5", fontSize: "85%", paddingLeft: "0" }}>
                                    <ListInlineItem>
                                        Áo thun
                                    </ListInlineItem>
                                    <ListInlineItem style={{ marginLeft: "2%" }}>
                                        Áo kiểu
                                    </ListInlineItem>
                                    <ListInlineItem style={{ marginLeft: "2%" }}>
                                        Quần jean
                                    </ListInlineItem>
                                    <ListInlineItem style={{ marginLeft: "2%" }}>
                                        Đầm
                                    </ListInlineItem>
                                    <ListInlineItem style={{ marginLeft: "2%" }}>
                                        Short
                                    </ListInlineItem>
                                </List>
                            </Row>
                        </Col>
                        <Col className="col-1" style={{ marginLeft: "3%" }}>
                            <Row className="mt-3 ">
                                <i class="fa-solid fa-cart-shopping fa-2x"></i>
                            </Row>
                            <Row>

                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </Grid>

            {/* Modals */}
            <LoginModal />
        </>
    )
}

export default HeaderComponent
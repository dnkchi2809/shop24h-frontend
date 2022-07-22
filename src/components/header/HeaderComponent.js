import React, { useState } from 'react';
import { Grid } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button'
import { Container } from "reactstrap"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Row, Col, List, ListInlineItem } from "reactstrap";
import logoImg from "../../app/image/logo.PNG";
import LoginModal from "../modals/LoginModal";
import { auth } from "../../firebase";
import { useParams, useNavigate } from "react-router-dom"

function HeaderComponent() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { user, keyword } = useSelector((reduxData) => reduxData.reducers);

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

    const [productType, setProductType] = React.useState(null);

    const [input, setInput] = useState("");

    const onInputSearchChange = (event) => {
        //console.log(event.target.value);
        setInput(event.target.value)
    }

    const onInputSearchEnter = (event) => {
        if (event.key == "Enter") {
            navigate("/products?name=" + input)
        }
    }

    const onSearchButtonClick = () => {
        dispatch({
            type: "FIND_KEYWORD",
            payload: {
                keyword: input
            }
        });
        navigate("/products?name=" + input)
    }

    useEffect(() => {
        auth.onAuthStateChanged((result) => {
            dispatch({
                type: "SET_USER",
                payload: {
                    user: result
                }
            });
        });

        fetch("https://shop24-backend.herokuapp.com/productTypes" || "http://localhost:8000/productTypes")
            .then(response => response.json())
            .then(result => {
                setProductType(result.data);
            })
            .catch(error => console.log('error', error));
    }, [])


    return (
        <>
            <Grid style={{ backgroundColor: "black", color: "white" }} className="fixed-top">
                <Container className="mb-2 mt-1">
                    <Row style={{ height: "35px" }}>
                        <Col className="m-0 p-0">
                            <List type="inline">
                                <ListInlineItem>
                                    <Button variant="text" sx={{ padding: "0%" }}>
                                        <a style={{ color: "white", textDecoration: "none" }} href='/'>
                                            <i class="fa-solid fa-house"></i>&nbsp;
                                            Home
                                        </a>
                                    </Button>
                                </ListInlineItem>
                                <ListInlineItem>
                                    <Button variant="text">
                                        <a style={{ color: "white", textDecoration: "none" }} href='/products'>
                                            <i class="fas fa-list"></i>&nbsp;
                                            Products
                                        </a>
                                    </Button>
                                </ListInlineItem>
                                <ListInlineItem>
                                    <Button variant="text" sx={{ color: "white" }} onClick={() => console.log("Contact Us")}>
                                        <i class="fa-solid fa-phone"></i>&nbsp;
                                        Contact Us
                                    </Button>
                                </ListInlineItem>
                                <ListInlineItem>
                                    <i className="fa-brands fa-facebook m-2 fa-lg"></i>&nbsp;
                                    <i className="fa-brands fa-instagram m-2 fa-lg"></i>&nbsp;
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
                                                <Row className=' d-flex justify-content-center align-items-center'>
                                                    <Col className='col-10 d-flex justify-content-end'>
                                                        <p className='pt-2'>Hello, {user.displayName}</p>
                                                    </Col>
                                                    <Col className='col-2 p-1'>
                                                        <img src={user.photoURL} style={{ width: "100%", borderRadius: "50%" }} onClick={onAvatarClick} />
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
                                                <Button className='mt-2 p-0' variant="text " sx={{ color: "white" }} onClick={onBtnLogInClick}>Log In</Button>
                                            </Col>
                                        </>
                                }

                            </Row>
                        </Col>
                    </Row>
                    <Row className="p-0">
                        <Col className="col-2 d-flex justify-content-center align-items-center">
                            <a href="/" className="text-center">
                                <img src={logoImg} style={{ width: "60%", objectFit: "contain" }} />
                            </a>
                        </Col>
                        <Col className="col-8">
                            <Row style={{ backgroundColor: "white" }} className="mt-3">
                                <Col className="col-11">
                                    <Input placeholder="What are you looking for?" style={{ border: "none" }} onInput={onInputSearchChange} onKeyPress={onInputSearchEnter} />
                                </Col>
                                <Col className="col-1 mt-1 text-center">
                                    <i class="fa-solid fa-magnifying-glass text-primary" onClick={onSearchButtonClick}></i>
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <List type="inline" style={{ fontSize: "85%", paddingLeft: "0" }}>
                                    {
                                        productType !== null
                                            ?
                                            productType.map((element, index) => {
                                                while (index < 10) {
                                                    return (
                                                        <>
                                                            <ListInlineItem style={{ marginRight: "3%" }} id={element._id}>
                                                                <a style={{ color: "#d6e0f5", textDecoration: "none" }} href='/products'>
                                                                    {element.name}
                                                                </a>
                                                            </ListInlineItem>
                                                        </>
                                                    )
                                                }
                                            })
                                            :
                                            null
                                    }
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
                </Container>
            </Grid>

            {/* Modals */}
            <LoginModal />
        </>
    )
}

export default HeaderComponent
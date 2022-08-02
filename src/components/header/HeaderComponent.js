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
import { useNavigate } from "react-router-dom"
import SigninModal from '../modals/SigninModal';

function HeaderComponent() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    //const { user } = useSelector((reduxData) => reduxData.reducers);
    const [user, setUser] = useState([])

    //const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem("user") || []))

    const [itemList, setItemList] = useState(0);

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
        let userArrayTemp = [];
        localStorage.setItem("userInfo", JSON.stringify(userArrayTemp));

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
        setUser(JSON.parse(localStorage.getItem("userInfo")) || []);

        let orderList = JSON.parse(localStorage.getItem("orderList")) || [];
        setItemList(orderList.length)
    });

    useEffect(() => {
        /*auth.onAuthStateChanged((result) => {
            dispatch({
                type: "SET_USER",
                payload: {
                    user: result
                }
            });
        });*/

        fetch("https://shop24-backend.herokuapp.com/productTypes" || "http://localhost:8000/productTypes")
            .then(response => response.json())
            .then(result => {
                setProductType(result.data);
            })
            .catch(error => console.log('error', error));
    }, [])


    return (
        <>
            <Grid style={{ backgroundColor: "black", color: "white" }} >
                <Container>
                    <Row>
                        <Col>
                            <List type="inline" className='m-0'>
                                <ListInlineItem>
                                    <Button variant="text" sx={{ padding: "0%" }}>
                                        <a style={{ color: "white", textDecoration: "none" }} href='/'>
                                            <i className="fa-solid fa-house"></i>&nbsp;
                                            Home
                                        </a>
                                    </Button>
                                </ListInlineItem>
                                <ListInlineItem>
                                    <Button variant="text">
                                        <a style={{ color: "white", textDecoration: "none" }} href='/products'>
                                            <i className="fas fa-list"></i>&nbsp;
                                            Products
                                        </a>
                                    </Button>
                                </ListInlineItem>
                                {
                                    user.length >= 1 && user[0].displayName == "admin"
                                        ?
                                        <ListInlineItem>
                                            <Button variant="text">
                                                <a style={{ color: "white", textDecoration: "none" }} href='/admin'>
                                                    <i class="fas fa-users-cog"></i>&nbsp;
                                                    Admin
                                                </a>
                                            </Button>
                                        </ListInlineItem>
                                        :
                                        null
                                }
                            </List>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Row className="m-0">
                                {
                                    user.length >= 1
                                        ?
                                        <>
                                            <Col>
                                                <List type="inline" className='m-0'>
                                                    <ListInlineItem>
                                                        <p className='mt-2 mb-0'>Hello, {user[0].displayName}</p>
                                                    </ListInlineItem>
                                                    <ListInlineItem>
                                                        <i className="fas fa-user-circle fa-lg" style={{ width: "100%" }} onClick={onAvatarClick}></i>
                                                    </ListInlineItem>
                                                </List>
                                            </Col>
                                            <Menu
                                                id="fade-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                TransitionComponent={Fade}
                                            >
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
                    <Row className="m-0 pb-1">
                        <Col className="col-2 d-flex justify-content-center align-items-center">
                            <a href="/" className="text-center">
                                <img src={logoImg} style={{ width: "60%" }} />
                            </a>
                        </Col>
                        <Col className="col-8">
                            <Row style={{ backgroundColor: "white" }} className="mt-3">
                                <Col className="col-11 p-0">
                                    <Input placeholder="What are you looking for?" style={{ border: "none" }} onInput={onInputSearchChange} onKeyPress={onInputSearchEnter} />
                                </Col>
                                <Col className="col-1 mt-1 text-center p-0 ">
                                    <i className="fa-solid fa-magnifying-glass text-primary" onClick={onSearchButtonClick}></i>
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
                                <a href="/orders" class="cart position-relative d-inline-flex" aria-label="View your shopping cart">
                                    <i className="fa-solid fa-cart-shopping fa-2x"></i>
                                    <span class="cart-basket d-flex align-items-center justify-content-center">
                                        {itemList}
                                    </span>
                                </a>
                            </Row>
                            <Row>

                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Grid>

            {/* Modals */}
            <LoginModal />
            <SigninModal />

        </>
    )
}

export default HeaderComponent
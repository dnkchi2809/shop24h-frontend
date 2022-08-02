import { Box, Typography, Modal, Grid } from "@mui/material";
import { Button, Col, Container, Row, Input } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

function CreateOrder() {
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

    const { openCreateOrderModal } = useSelector((reduxData) => reduxData.reducers);

    const [newOrder, setNewOrder] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        country: "",
        orders: []
    })

    const [productList, setProductList] = useState(null);

    const [rowProductAdd, setRowProductAdd] = useState(["item"]);

    const [total, setTotal] = useState(0);

    const [arrayItem, setArrayItem] = useState([]);

    const onAddProductClick = () => {
        rowProductAdd.push("item")
    }

    const onSelectItem = (event) => {
        const selectedItem = {
            price: 0,
            amount: 1
        }
        let idProduct = event.target.id;
        let maxAmount = 0;
        productList.map((element) => {
            if (element.name == event.target.value) {
                console.log(element);
                maxAmount = element.amount;
                selectedItem.price = element.promotionPrice
            }
        })
        //setTotal(tempTotal)

        let index = idProduct.slice(7);
        let idQuantity = "quantity" + index;
        let selectBox = document.getElementById(idQuantity);
        for (let i = 1; i <= maxAmount; i++) {
            let newOption = document.createElement('option');
            const optionText = document.createTextNode(i);
            // set option text
            newOption.appendChild(optionText);
            selectBox.appendChild(newOption);
        }

        selectBox.setAttribute("onchange", function () {
            selectedItem.amount = this.value;
        })

        arrayItem.push(selectedItem);
    }

    const onInputNameChange = (event) => {
        newOrder.fullName = event.target.value
    }

    const onInputPhoneChange = (event) => {
        newOrder.phone = event.target.value
        fetch("https://shop24-backend.herokuapp.com/customers?phone=" + newOrder.phone)
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
        newOrder.email = event.target.value
        fetch("https://shop24-backend.herokuapp.com/customers?email=" + newOrder.email)
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
        newOrder.address = event.target.value
    }

    const onInputCityChange = (event) => {
        newOrder.city = event.target.value
    }

    const onInputCountryChange = (event) => {
        newOrder.country = event.target.value
    }

    const onInputUserNameChange = (event) => {
        newOrder.userName = event.target.value;
        fetch("https://shop24-backend.herokuapp.com/customers?userName=" + newOrder.userName)
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
        let validOrder = validateUser(newOrder);

        if (validOrder) {
            let content = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newOrder)
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
        return true
    }

    const handleModalClose = () => {
        setTotal(0);
        setRowProductAdd(["item"]);
        dispatch({
            type: "CREATE_ORDER_MODAL",
            payload: {
                openCreateOrderModal: false
            }
        })   
    }

    useEffect(() => {
        fetch("https://shop24-backend.herokuapp.com/products")
            .then((response) => response.json())
            .then((result) => {
                setProductList(result.data)
            })

        let tempTotal = 0
        if (arrayItem.length >= 1) {
            arrayItem.map((element) => {
                tempTotal += element.price * element.amount
            })
        }
        setTotal(tempTotal);
    })

    return (
        <>
            <Modal open={openCreateOrderModal} onClose={handleModalClose}>
                <Box style={style}>
                    <Container>
                        <Row className="mt-2 text-center">
                            <Typography><b>Create Order</b></Typography>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Row className="mt-3">
                                    <Col className="col-4">Fullname:</Col>
                                    <Col>
                                        <Input onInput={onInputNameChange} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row className="mt-3">
                                    <Col className="col-4">Phone:</Col>
                                    <Col>
                                        <Input onInput={onInputPhoneChange} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Row>
                                    <Col className="col-4">Email:</Col>
                                    <Col>
                                        <Input type="email" onInput={onInputEmailChange} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col className="col-4">Address:</Col>
                                    <Col>
                                        <Input onInput={onInputAddressChange} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Row>
                                    <Col className="col-4">City:</Col>
                                    <Col>
                                        <Input onInput={onInputCityChange} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col className="col-4">Country:</Col>
                                    <Col>
                                        <Input onInput={onInputCountryChange} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                        </Row>
                        <Row className="mt-3">
                            <Col className="col-3">Orders:</Col>
                        </Row>
                        {
                            rowProductAdd.length >= 1
                                ?
                                rowProductAdd.map((element, index) => {
                                    return (
                                        <>
                                            <Row className="mt-3">
                                                <Col className="col-2"><i class="fa-solid fa-circle-plus fa-2x" onClick={onAddProductClick}></i></Col>
                                                <Col>
                                                    <select className="form-control" onChange={onSelectItem} id={"product" + index}>
                                                        <option>Select item</option>
                                                        {
                                                            productList !== null
                                                                ?
                                                                productList.map((element) => {
                                                                    return (
                                                                        <option key={element._id} >{element.name}</option>
                                                                    )
                                                                })
                                                                :
                                                                null
                                                        }
                                                    </select>
                                                </Col>
                                                <Col className="col-2">Quantity:</Col>
                                                <Col>
                                                    <select className="form-control" id={"quantity" + index}>

                                                    </select>
                                                </Col>
                                            </Row>
                                        </>
                                    )
                                })
                                :
                                null
                        }

                        <Row className="mt-2 text-right">
                            <Typography><b>Total : {total} USD</b></Typography>
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

export default CreateOrder
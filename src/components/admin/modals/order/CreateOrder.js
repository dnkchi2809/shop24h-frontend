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

    const [productList, setProductList] = useState(null);

    const [rowProductAdd, setRowProductAdd] = useState(["item"]);

    const [total, setTotal] = useState(0);

    const [arrayItem, setArrayItem] = useState([]);

    const [newOrderDetail, setNewOrderDetail] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        country: "",
        orderItems: arrayItem
    })

    const [newOrder, setNewOrder] = useState({
        cost: total,
        note: "",
        orderDetail: [newOrderDetail]
    })

    const onAddProductClick = () => {
        rowProductAdd.push("item")
    }

    const onSelectItem = (event) => {
        const selectedItem = {
            index: "",
            product: "",
            price: 0,
            info: "",
            amount: 1
        }

        let idProduct = event.target.id;
        let index = idProduct.slice(7);
        selectedItem.index = index;
        let arrayTemp = arrayItem;

        let maxAmount = 0;
        productList.map((element) => {
            if (element.name == event.target.value) {
                maxAmount = element.amount;
                selectedItem.product = element._id
                selectedItem.price = element.promotionPrice;
                selectedItem.info = element;
            }
        })

        //trong mảng arayItem, nếu có index giống thì add vào thêm
        if (arrayTemp.length >= 1) {
            if (Boolean(arrayTemp.find(element => element.index == selectedItem.index))) {
                arrayTemp.map((element) => {
                    if (element.index == selectedItem.index) {
                        element.product = selectedItem.product;
                        element.price = selectedItem.price;
                        element.info = selectedItem.info;
                    }
                })
            }
            else {
                arrayTemp.push(selectedItem);
            }
        }
        else {
            arrayTemp.push(selectedItem);
        }

        setArrayItem(arrayTemp);

        let idQuantity = "quantity" + index;
        let selectBox = document.getElementById(idQuantity);
        for (let i = 1; i <= maxAmount; i++) {
            let newOption = document.createElement('option');
            const optionText = document.createTextNode(i);
            newOption.appendChild(optionText);
            selectBox.appendChild(newOption);
        }
    }

    const onSelectQuantity = (event) => {
        let idQuantity = event.target.id;
        let index = idQuantity.slice(8);

        arrayItem.map((element) => {
            if (element.index == index) {
                element.amount = event.target.value
            }
        })
    }

    const onInputNameChange = (event) => {
        newOrderDetail.name = event.target.value
    }

    const onInputPhoneChange = (event) => {
        newOrderDetail.phone = event.target.value
    }

    const onInputEmailChange = (event) => {
        newOrderDetail.email = event.target.value
    }

    const onInputAddressChange = (event) => {
        newOrderDetail.address = event.target.value
    }

    const onInputCityChange = (event) => {
        newOrderDetail.city = event.target.value
    }

    const onInputCountryChange = (event) => {
        newOrderDetail.country = event.target.value
    }


    const onConfirmCreateOrderClick = () => {
        let validOrder = validateOrder(newOrderDetail);

        if (validOrder) {
            console.log(newOrder);

            fetch("https://shop24-backend.herokuapp.com/customers?phone=" + newOrderDetail.phone)
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
                                        alertString: "Create order success"
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
                    }
                    //nếu chưa có customer có sdt này ==> tạo mới customer và update orderId
                    else {
                        console.log("số điện thoại chưa có");
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
                                    userName: newOrderDetail.email,
                                    password: "12345678",
                                    fullName: newOrderDetail.name,
                                    phone: newOrderDetail.phone,
                                    email: newOrderDetail.email,
                                    address: newOrderDetail.address,
                                    city: newOrderDetail.city,
                                    country: newOrderDetail.country,
                                    orders: newUserOrder
                                }
                                console.log(body);
                                //tạo new customer
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
                                        alertString: "Create order success"
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
                    }
                })
        }
    
    }

    const validateOrder = (paramOrder) => {
        console.log(paramOrder);
        if (paramOrder.name == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Fullname is invalid"
                }
            })
            return false
        }
        if (paramOrder.phone == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Phone is invalid"
                }
            })
            return false
        }
        if (paramOrder.email == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Email is invalid"
                }
            })
            return false
        }
        if (paramOrder.address == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Address is invalid"
                }
            })
            return false
        }
        if (paramOrder.city == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "City is invalid"
                }
            })
            return false
        }
        if (paramOrder.country == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Country is invalid"
                }
            })
            return false
        }
        if (paramOrder.userName == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Ordername is invalid"
                }
            })
            return false
        }
        if (paramOrder.orderItems.length <= 0) {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Orders is invalid"
                }
            })
            return false
        }
        return true
    }

    const handleModalClose = () => {
        setRowProductAdd(["item"]);
        setArrayItem([]);
        setTotal(0);

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
        newOrder.cost = total;
        newOrderDetail.orderItems = arrayItem;
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
                                                    <select className="form-control" id={"quantity" + index} onChange={onSelectQuantity}>

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
                                <btn className="btn bg-primary w-100 m-0" onClick={onConfirmCreateOrderClick}>Confirm</btn>
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
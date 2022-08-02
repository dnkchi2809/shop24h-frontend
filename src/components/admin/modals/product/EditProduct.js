import { Box, Typography, Modal, Grid } from "@mui/material";
import { Button, Col, Container, Row, Input } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

function EditProduct(props) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '0px solid #000',
        borderRadius: '5px',
        backgroundColor: "white",
        padding: "3%",
        width: "40%"
    };

    const dispatch = useDispatch();

    const { openEditProductModal } = useSelector((reduxData) => reduxData.reducers);

    const [editProduct, setNewProduct] = useState({
        amount: 0,
        buyPrice: 0,
        imageUrl: "",
        name: "",
        promotionPrice: 0,
        type: ""
    })

    const [productType, setProductType] = useState(null);

    const onSelectProductType = (event) => {
        productType.map((element) => {
            if (element.name == event.target.value) {
                editProduct.type = element._id
            }
        })
    }

    const onNameInputChange = (event) => {
        editProduct.name = event.target.value
    }

    const onImageURLInputChange = (event) => {
        editProduct.imageUrl = event.target.value
    }

    const onAmountInputChange = (event) => {
        editProduct.amount = event.target.value
    }

    const onBuyPriceInputChange = (event) => {
        editProduct.buyPrice = event.target.value
    }

    const onPromotionPriceInputChange = (event) => {
        editProduct.promotionPrice = event.target.value
    }

    const onConfirmCreateProductClick = () => {
        let validProduct = validateProduct(editProduct);

        if (validProduct) {
            let content = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editProduct)
            }
            fetch("https://shop24-backend.herokuapp.com/products/" + props.product._id, content)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.status);
                    if (data.status == "Success 200") {
                        dispatch({
                            type: "OPEN_SNACKBAR",
                            payload: {
                                openSnackbar: true,
                                alertString: "Edit product succesfully"
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

            handleModalClose();
        }
    }

    const validateProduct = (paramProduct) => {
        console.log(paramProduct);
        if (paramProduct.type == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Type is invalid"
                }
            })
            return false
        }
        if (paramProduct.name == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Name is invalid"
                }
            })
            return false
        }
        if (paramProduct.imageUrl == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Image URL is invalid"
                }
            })
            return false
        }
        if (paramProduct.amount == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Amount is invalid"
                }
            })
            return false
        }
        if (paramProduct.buyPrice == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Buy Price is invalid"
                }
            })
            return false
        }
        if (paramProduct.promotionPrice == "") {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Promotion Price is invalid"
                }
            })
            return false
        }
        if (paramProduct.promotionPrice > paramProduct.buyPrice) {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Promotion Price cannot more expensive than Buy Price"
                }
            })
            return false
        }
        return true
    }

    const handleModalClose = () => {
        dispatch({
            type: "EDIT_PRODUCT_MODAL",
            payload: {
                openEditProductModal: false
            }
        })
    }

    useEffect(() => {
        fetch("https://shop24-backend.herokuapp.com/productTypes")
            .then((response) => response.json())
            .then((result) => {
                setProductType(result.data)
            })

        if (props.product !== null) {
            editProduct.amount = props.product.amount;
            editProduct.buyPrice = props.product.buyPrice;
            editProduct.imageUrl = props.product.imageUrl;
            editProduct.name = props.product.name;
            editProduct.promotionPrice = props.product.promotionPrice;
            editProduct.type = props.product.type
        }
    }, [props.product])

    return (
        <>
            <Modal open={openEditProductModal} onClose={handleModalClose}>
                <Box style={style}>
                    <Container>
                        <Row className="mt-2 text-center">
                            <Typography><b>Edit Product</b></Typography>
                        </Row>

                        <Row className="mt-3">
                            <Col className="col-3">Type:</Col>
                            <Col>
                                <select className="form-control" onChange={onSelectProductType}>
                                    <option key="0">Select Product Type</option>
                                    {
                                        productType !== null
                                            ?
                                            productType.map((element) => {
                                                return (
                                                    <>
                                                        {
                                                            props.product !== null && element._id == props.product.type
                                                                ?
                                                                <option key={element._id} selected>{element.name}</option>
                                                                :
                                                                <option key={element._id}>{element.name}</option>
                                                        }

                                                    </>
                                                )
                                            })
                                            :
                                            null
                                    }
                                </select>
                            </Col>
                        </Row>
                        {
                            props.product !== null
                                ?
                                <>
                                    <Row className="mt-3">
                                        <Col className="col-3">Name:</Col>
                                        <Col>
                                            <Input defaultValue={props.product.name} onInput={onNameInputChange} />
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col className="col-3">Image URL:</Col>
                                        <Col>
                                            <Input defaultValue={props.product.imageUrl} onInput={onImageURLInputChange} />
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col className="col-3">Amount:</Col>
                                        <Col>
                                            <Input type="number" defaultValue={props.product.amount} onInput={onAmountInputChange} />
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col className="col-3" >Buy price:</Col>
                                        <Col>
                                            <Input type="number" defaultValue={props.product.buyPrice} onInput={onBuyPriceInputChange} />
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col className="col-3" >Promotion Price:</Col>
                                        <Col>
                                            <Input type="number" defaultValue={props.product.promotionPrice} onInput={onPromotionPriceInputChange} />
                                        </Col>
                                    </Row>
                                </>
                                :
                                null
                        }
                        <Row className="mt-4 text-center bg-danger">
                            <Col className="bg-primary">
                                <btn className="btn bg-primary w-100 m-0" onClick={onConfirmCreateProductClick}>Confirm</btn>
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

export default EditProduct
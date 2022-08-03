import { Box, Typography, Modal, Grid } from "@mui/material";
import { Button, Col, Container, Row, Input } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

function EditProductType(props) {
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

    const { openEditProductTypeModal } = useSelector((reduxData) => reduxData.reducers);

    const [newProductType, setNewProductType] = useState({
        name: "",
        description : ""
    })

    const onNameInputChange = (event) => {
        fetch("https://shop24-backend.herokuapp.com/productTypes")
            .then((response) => response.json())
            .then((result) => {
                result.data.map((element) => {
                    if (element.name == event.target.value) {
                        dispatch({
                            type: "OPEN_SNACKBAR",
                            payload: {
                                openSnackbar: true,
                                alertString: "Product Type already exits"
                            }
                        })
                    }
                })
            })
        newProductType.name = event.target.value
    }

    const onDescriptionInputChange = (event) => {
        newProductType.description = event.target.value
    }

    const onConfirmEditProductTypeClick = () => {
        let validProductType = validateProductType(newProductType);

        if (validProductType) {
            let content = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProductType)
            }
            fetch("https://shop24-backend.herokuapp.com/productTypes/" + props.productType._id, content)
                .then((response) => response.json())
                .then((data) => {

                    if (data.status == "Success 200") {
                        dispatch({
                            type: "OPEN_SNACKBAR",
                            payload: {
                                openSnackbar: true,
                                alertString: "Edit Product Type succesfully"
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

    const validateProductType = (paramProduct) => {
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
        return true
    }

    const handleModalClose = () => {
        dispatch({
            type: "EDIT_PRODUCTTYPE_MODAL",
            payload: {
                openEditProductTypeModal: false
            }
        })
    }

    useEffect(() => {
        if (props.productType !== null) {
            newProductType.name = props.productType.name
        }
    }, [props.productType])

    return (
        <>
            <Modal open={openEditProductTypeModal} onClose={handleModalClose}>
                <Box style={style}>
                    <Container>
                        <Row className="mt-2 text-center">
                            <Typography><b>Create Product</b></Typography>
                        </Row>
                        <Row className="mt-3">
                            <Col className="col-3">Product Type:</Col>
                            <Col>
                                {
                                    props.productType !== null
                                        ?
                                        <Input defaultValue={props.productType.name} onInput={onNameInputChange} />
                                        :
                                        null
                                }
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="col-3">Product Type:</Col>
                            <Col>
                                {
                                    props.productType !== null
                                        ?
                                        <Input defaultValue={props.productType.description} onInput={onDescriptionInputChange} />
                                        :
                                        null
                                }
                            </Col>
                        </Row>
                        <Row className="mt-4 text-center bg-danger">
                            <Col className="bg-primary">
                                <btn className="btn bg-primary w-100 m-0" onClick={onConfirmEditProductTypeClick}>Confirm</btn>
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

export default EditProductType
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Input, Row } from "reactstrap";
import { Grid, } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function ProductDetail() {
    const param = useParams();

    const dispatch = useDispatch();

    const productId = param.productId;

    const [productInfo, setProductInfo] = useState(null);

    const [amount, setAmount] = useState(0);

    const [noti, setNoti] = useState(false)

    const onBtnMinusProductClick = () => {
        let amountSelect = amount - 1;
        if (amountSelect < 0) {
            setAmount(0);
            setNoti(false);
        }
        else {
            setAmount(amountSelect)
            setNoti(false);
        }
    }

    const onBtnAddProductClick = () => {
        let maxAmount = productInfo.amount;
        let amountSelect = amount + 1;
        if (amountSelect <= maxAmount) {
            setAmount(amountSelect)
            setNoti(false);
        }
        else {
            setAmount(maxAmount);
            setNoti(true);
        }
    }

    const onInputAmountChange = (event) => {
        let maxAmount = productInfo.amount;
        if (event.target.value < 0 || event.target.value === "") {
            setAmount(0);
            setNoti(false);
        }
        else if (event.target.value > maxAmount) {
            setAmount(maxAmount);
            setNoti(true);
        }
        else {
            setAmount(event.target.value);
            setNoti(false);
        }
    }

    const onBtnAddToCartClick = () => {
        let newSelect = {
            product: productId,
            amount: amount,
            info: productInfo
        }

        let orderList = JSON.parse(localStorage.getItem("orderList")) || [];

        let validNewSelect = validateNewSelect(newSelect);
        if (validNewSelect) {
            if (orderList.length >= 1) {
                const productExit = orderList.find(element => element.product == newSelect.product);

                if (Boolean(productExit)) {
                    productExit.amount += newSelect.amount
                }
                else {
                    orderList.push(newSelect);
                }
            }
            else {
                console.log("false")
                orderList.push(newSelect);
            }
        }

        console.log(orderList);

        localStorage.setItem("orderList", JSON.stringify(orderList))
    }

    const validateNewSelect = (paramNewSelect) => {
        if(paramNewSelect.amount <= 0){
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Select number of product!"
                }
            })
            return false
        } 
        return true
    }

    useEffect(() => {
        console.log(productId);
        fetch("https://shop24-backend.herokuapp.com/products/" + productId || "http://localhost:8000/products/" + productId)
            .then(response => response.json())
            .then(result => {

                setProductInfo(result.data);

                dispatch({
                    type: "SET_PRODUCT_TYPE",
                    payload: {
                        productType: result.data.type
                    }
                })

                fetch("https://shop24-backend.herokuapp.com/productTypes/" + result.data.type || "http://localhost:8000/productTypes/" + result.data.type)
                    .then(response => response.json())
                    .then(result => {
                        dispatch({
                            type: "SET_BREADCRUMB",
                            payload: {
                                breadcrumb1: "products",
                                breadcrumb2: result.data.name,
                                breadcrumb3: productInfo.name
                            }
                        })
                    })

            })
            .catch(error => console.log('error', error));
    }, [productId])
    return (
        <>
            <Row>
                {
                    productInfo
                        ?
                        <>
                            <Grid className="col-product-image">
                                <Grid className="square" style={{ backgroundImage: "url(" + productInfo.imageUrl + ")" }}>
                                </Grid>
                            </Grid>
                            <Grid className="col-product-detail">
                                <Row className="mt-3">
                                    <Col>
                                        <a className="old-price" style={{ fontSize: "250%", marginRight: "2%" }}>${productInfo.buyPrice}</a>&nbsp;
                                        <a className="new-price" style={{ fontSize: "250%" }}>${productInfo.promotionPrice}</a>
                                    </Col>
                                </Row>
                                <Row className="mt-1 display-5"><b>{productInfo.name}</b></Row>
                                <Grid className="mt-4">
                                    <Col className="d-flex">
                                        <i className="fas fa-minus-circle fa-2x" style={{ marginRight: "2%" }} onClick={onBtnMinusProductClick}></i>
                                        <Input type="number" value={amount} onInput={onInputAmountChange} style={{ width: "100px" }} />
                                        <i className="fas fa-plus-circle fa-2x" style={{ marginLeft: "2%" }} onClick={onBtnAddProductClick}></i>
                                        {
                                            noti
                                                ?
                                                <p style={{ marginLeft: "2%", color: "blue" }}>The number of products in stock is {productInfo.amount}</p>
                                                :
                                                null
                                        }
                                    </Col>
                                </Grid>
                                <Grid className="mt-4">
                                    <Button className="btn btn-info btn-lg p-3 btn-addcart" onClick={onBtnAddToCartClick}><i className="fas fa-cart-plus"></i>&nbsp;Add to cart</Button>
                                </Grid>
                            </Grid>
                        </>
                        :
                        null
                }
            </Row>
        </>
    )
}

export default ProductDetail;
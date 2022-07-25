import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Input, Row } from "reactstrap";
import { Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

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
        if(event.target.value < 0 || event.target.value === ""){
            setAmount(0);
            setNoti(false);
        }
        else if(event.target.value > maxAmount){
            setAmount(maxAmount);
            setNoti(true);
        }
        else {
            setAmount(event.target.value);
            setNoti(false);
        }
    }

    useEffect(() => {
        fetch("https://shop24-backend.herokuapp.com/products/" + productId ||"http://localhost:8000/products/" + productId)
            .then(response => response.json())
            .then(result => {
                setProductInfo(result.data);

                dispatch({
                    type: "SET_PRODUCT_TYPE",
                    payload: {
                        productType: productId.type
                    }
                })

            })
            .catch(error => console.log('error', error));
    })
    return (
        <>
            <Row>
                {
                    productInfo
                        ?
                        <>
                            <Col className="col-5" style={{ marginRight: "5%" }}>
                                <Grid className="square" style={{ backgroundImage: "url(" + productInfo.imageUrl + ")" }}>
                                </Grid>
                            </Col>
                            <Col>
                                <Row className="mt-1 display-6"><b>{productInfo.name}</b></Row>
                                <Row className="mt-3">
                                    <Col>
                                        <a className="old-price" style={{ fontSize: "250%", marginRight: "2%" }}>${productInfo.buyPrice}</a>&nbsp;
                                        <a className="new-price" style={{ fontSize: "250%" }}>${productInfo.promotionPrice}</a>
                                    </Col>
                                </Row>
                                <Row className="mt-5">
                                    <Col className="d-flex">
                                        <i class="fas fa-minus-circle fa-2x" style={{ marginRight: "2%" }} onClick={onBtnMinusProductClick}></i>
                                        <Input type="number" value={amount} onInput={onInputAmountChange} style={{ width: "100px" }} />
                                        <i class="fas fa-plus-circle fa-2x" style={{ marginLeft: "2%" }} onClick={onBtnAddProductClick}></i>
                                        {
                                            noti
                                            ?
                                            <p style={{ marginLeft: "2%", color: "blue" }}>The number of products in stock is {productInfo.amount}</p>
                                            :
                                            null
                                        }
                                    </Col>
                                </Row>
                                <Row className="mt-5">
                                    <Button className="btn btn-dark btn-lg p-3" style={{ width: "30%" }}><i class="fas fa-cart-plus"></i>&nbsp;Add to cart</Button>
                                </Row>
                            </Col>
                        </>
                        :
                        null
                }
            </Row>
        </>
    )
}

export default ProductDetail;
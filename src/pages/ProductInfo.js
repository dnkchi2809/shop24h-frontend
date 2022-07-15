import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Input, Row } from "reactstrap";
import { Grid, Typography } from "@mui/material";
import BreadcrumbComponent from "../components/breadcrumb/BreadcrumbComponent";

function ProductInfo() {
    const param = useParams();

    const productId = param.productId;

    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/products/" + productId)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setProductInfo(result.data);
            })
            .catch(error => console.log('error', error));
    })
    return (
        <>
            <Container style={{ marginTop: "11%" }}>
                <BreadcrumbComponent className="mb-5" />
                <Row>
                    {
                        productInfo
                            ?
                            <>
                                <Col className="col-5" style={{marginRight : "5%"}}>
                                    <Grid className="square" style={{ backgroundImage: "url(" + productInfo.imageUrl + ")" }}>
                                    </Grid>
                                </Col>
                                <Col>
                                    <Row className="mt-1 display-6"><b>{productInfo.name}</b></Row>
                                    <Row className="mt-5">
                                        <Col>
                                            <a className="old-price" style={{ fontSize: "250%", marginRight: "2%" }}>${productInfo.buyPrice}</a>&nbsp;
                                            <a className="new-price" style={{ fontSize: "250%" }}>${productInfo.promotionPrice}</a>
                                        </Col>
                                    </Row>
                                    <Row className="mt-5">
                                        <Col className="d-flex">
                                            <i class="fas fa-minus-circle fa-2x" style={{marginRight : "2%"}}></i>
                                            <Input value={0} style={{width: "100px"}}/>
                                            <i class="fas fa-plus-circle fa-2x" style={{marginLeft : "2%"}}></i>
                                        </Col>
                                    </Row>
                                    <Row className="mt-5">
                                        <Button className="btn btn-dark btn-lg p-3" style={{width : "30%"}}><i class="fas fa-cart-plus"></i>&nbsp;Add to cart</Button>
                                    </Row>
                                </Col>
                            </>
                            :
                            null
                    }

                </Row>
            </Container>
        </>
    )
}

export default ProductInfo;
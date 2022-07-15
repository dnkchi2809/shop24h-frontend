import { Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import { Container } from "reactstrap"
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";

function SimilarProductComponent() {
    const { productType } = useSelector((reduxData) => reduxData.reducers);

    const [similarProduct, setSimilarProduct] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/products")
            .then(response => response.json())
            .then(result => {
                setSimilarProduct(result.data.filter((element, index) => {
                    return element.type === productType
                }));
            })
            .catch(error => console.log('error', error));
    }, [])

    return (
        <>
            <Container style={{ marginTop: "4%" }}>
                <Row className="text-center">
                    <Typography>
                        <h1>SIMILAR PRODUCT</h1>
                    </Typography>
                </Row>
                <Row>
                    {
                        similarProduct !== null
                            ?
                            similarProduct.map((element, index) => {
                                while (index < 8) {
                                    return (
                                        <Col className="col-3 mt-5">
                                            <ProductCard product={element} />
                                        </Col>
                                    )
                                }
                            })
                            :
                            null
                    }
                </Row>
                <Row className="justify-content-center mt-4 mb-5">
                    <Col className="col-2">
                        <btn className="btn btn-dark w-100">
                            <a style={{ color: "white", textDecoration: "none" }} href='/products'>
                                VIEW ALL
                            </a>
                        </btn>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SimilarProductComponent
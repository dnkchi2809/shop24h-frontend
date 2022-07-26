import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { Row } from "react-bootstrap"
import { Container } from "reactstrap"
import ProductCard from "./ProductCard";

function LastestProductComponent() {

    const [lastestProduct, setLastestProduct] = useState(null);
    useEffect(() => {
        fetch("https://shop24-backend.herokuapp.com/products" || "http://localhost:8000/products")
            .then(response => response.json())
            .then(result => {
                setLastestProduct(result.data);
            })
            .catch(error => console.log('error', error));
    }, [])

    return (
        <>
            <Container style={{ marginTop: "4%" }}>
                <Row className="text-center">
                    <Grid className="menu-tittle">
                        LASTED PRODUCT
                    </Grid>
                </Row>
                <Row>
                    {
                        lastestProduct !== null
                            ?
                            lastestProduct.map((element, index) => {
                                while (index < 8) {
                                    return (
                                        <Grid className="col-lastest-product">
                                            <ProductCard product={element} />
                                        </Grid>
                                    )
                                }
                            })
                            :
                            null
                    }
                </Row>
                <Row className="d-flex justify-content-center mt-4 mb-5">
                    <btn className="btn btn-dark btn-viewall">
                        <a style={{ color: "white", textDecoration: "none" }} href='/products'>
                            VIEW ALL
                        </a>
                    </btn>
                </Row>
            </Container>
        </>
    )
}

export default LastestProductComponent
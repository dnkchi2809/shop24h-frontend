import { Container, Row, Col } from "reactstrap";
import BreadcrumbComponent from "../components/breadcrumb/BreadcrumbComponent";
import ProductsComponent from "../components/product/ProductsComponent";
import MenuProductComponent from "../components/product/MenuProductComponent";
import ProductFilterComponent from "../components/product/ProductFilterComponent";
import HeaderMobileComponent from "../components/header/HeaderMobileComponent";
import FooterComponent from "../components/footer/FooterComponent"
import { useEffect } from "react";
import { Grid } from "@mui/material"
import { useSelector, useDispatch } from "react-redux";

function ProductList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "SET_BREADCRUMB",
            payload: {
                breadcrumb1: "products",
                breadcrumb2: null,
                breadcrumb3: null
            }
        })
    }, [])
    return (
        <>
            <HeaderMobileComponent />
            <Container className="mt-1">
                <BreadcrumbComponent className="mb-5" />
                <Row>
                    <Grid className="col-menu-product">
                        <MenuProductComponent />
                        <ProductFilterComponent />
                    </Grid>
                    <Grid className="col-product-component">
                        <ProductsComponent />
                    </Grid>
                </Row>
            </Container>

            <FooterComponent />
        </>
    )

}

export default ProductList;
import { Container, Row, Col } from "reactstrap";
import BreadcrumbComponent from "../components/breadcrumb/BreadcrumbComponent";
import ProductsComponent from "../components/product/ProductsComponent";
import MenuProductComponent from "../components/product/MenuProductComponent";
import ProductFilterComponent from "../components/product/ProductFilterComponent";
import HeaderComponent from "../components/header/HeaderComponent";
import FooterComponent from "../components/footer/FooterComponent"

function ProductList() {
    return (
        <>
            <HeaderComponent/>
            <Container>
                <BreadcrumbComponent className="mb-5" />
                <Row>
                    <Col className="col-3">
                        <MenuProductComponent />
                        <ProductFilterComponent />
                    </Col>
                    <Col className="col-9">
                        <ProductsComponent />
                    </Col>
                </Row>
            </Container>

            <FooterComponent />
        </>
    )

}

export default ProductList;
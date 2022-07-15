import { Container, Row,Col } from "reactstrap";
import BreadcrumbComponent from "../components/breadcrumb/BreadcrumbComponent";
import ProductsComponent from "../components/product/ProductsComponent";
import MenuProductComponent from "../components/product/MenuProductComponent";
import ProductFilterComponent from "../components/product/ProductFilterComponent";

function ProductList() {
    return (
        <>
            <Container style={{ marginTop: "11%"}}>
                <BreadcrumbComponent className="mb-5"/>
                <Row>
                    <Col className="col-3">
                        <MenuProductComponent/>
                        <ProductFilterComponent/>
                    </Col>
                    <Col className="col-9">
                        <ProductsComponent/>
                    </Col>
                </Row>
            </Container>

        </>
    )

}

export default ProductList;
import { Container, Row,Col } from "reactstrap";
import BreadcrumbComponent from "../components/BreadcrumbComponent";
import ContentComponent from "../components/ContentComponent";
import MenuProductComponent from "../components/MenuProductComponent";
import ProductFilterComponent from "../components/ProductFilterComponent";

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
                        <ContentComponent/>
                    </Col>
                </Row>
            </Container>

        </>
    )

}

export default ProductList;
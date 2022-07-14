import { Container, Row,Col } from "reactstrap";
import BreadcrumbComponent from "../components/BreadcrumbComponent";
import ContentComponent from "../components/ContentComponent";
import MenuProductComponent from "../components/MenuProductComponent";

function ProductList() {
    return (
        <>
            <Container style={{ marginTop: "11%" }}>
                <BreadcrumbComponent />
                <Row>
                    <Col className="col-2">
                        <MenuProductComponent/>
                    </Col>
                    <Col className="col-10">
                        <ContentComponent/>
                    </Col>
                </Row>
            </Container>

        </>
    )

}

export default ProductList;
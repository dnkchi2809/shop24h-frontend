import { Container } from "reactstrap";
import BreadcrumbComponent from "../components/breadcrumb/BreadcrumbComponent";

function ProductInfo() {
    return (
        <>
            <Container style={{ marginTop: "11%"}}>
                <BreadcrumbComponent className="mb-5"/>
            </Container>
        </>
    )
}

export default ProductInfo;
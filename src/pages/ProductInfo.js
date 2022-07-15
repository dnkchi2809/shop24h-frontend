import { Container } from "reactstrap"
import BreadcrumbComponent from "../components/breadcrumb/BreadcrumbComponent";
import ProductDetail from "../components/product/ProductDetail";
import SimilarProductComponent from "../components/product/SimilarProductComponent";

function ProductInfo() {
    return (
        <>
            <Container style={{ marginTop: "11%" }}>
                <BreadcrumbComponent className="mb-5" />
                <ProductDetail />
                <SimilarProductComponent />
            </Container>
        </>
    )
}

export default ProductInfo;
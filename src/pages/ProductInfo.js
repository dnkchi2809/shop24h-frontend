import { Container } from "reactstrap"
import BreadcrumbComponent from "../components/breadcrumb/BreadcrumbComponent";
import FooterComponent from "../components/footer/FooterComponent";
import HeaderComponent from "../components/header/HeaderComponent";
import ProductDetail from "../components/product/ProductDetail";
import SimilarProductComponent from "../components/product/SimilarProductComponent";

function ProductInfo() {
    return (
        <>
            <HeaderComponent />
            <Container className="mt-1">
                <BreadcrumbComponent className="mb-5" />
                <ProductDetail />
                <SimilarProductComponent />
            </Container>
            <FooterComponent />
        </>
    )
}

export default ProductInfo;
import { Container } from "reactstrap"
import BreadcrumbComponent from "../components/breadcrumb/BreadcrumbComponent";
import FooterComponent from "../components/footer/FooterComponent";
import HeaderComponent from "../components/header/HeaderComponent";
import OrderListComponents from "../components/orders/OrderListComponent";

function OrderList() {
    return (
        <>
            <HeaderComponent />
            <Container style={{ marginTop: "11%" }}>
                <BreadcrumbComponent/>
                <OrderListComponents />
            </Container>
            <FooterComponent />
        </>
    )
}

export default OrderList;
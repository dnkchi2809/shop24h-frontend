import { Container } from "reactstrap"
import BreadcrumbComponent from "../components/breadcrumb/BreadcrumbComponent";
import FooterComponent from "../components/footer/FooterComponent";
import HeaderComponent from "../components/header/HeaderComponent";
import OrderListComponents from "../components/orders/OrderListComponent";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function OrderList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "SET_BREADCRUMB",
            payload: {
                breadcrumb1: "orders",
                breadcrumb2: null,
                breadcrumb3: null
            }
        })
    }, [])
    return (
        <>
            <HeaderComponent />
            <Container className="mt-2">
                <BreadcrumbComponent/>
                <OrderListComponents />
            </Container>
            <FooterComponent />
        </>
    )
}

export default OrderList;
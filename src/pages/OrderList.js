import { Container } from "reactstrap"
import BreadcrumbComponent from "../components/breadcrumb/BreadcrumbComponent";
import FooterComponent from "../components/footer/FooterComponent";
import HeaderMobileComponent from "../components/header/HeaderMobileComponent";
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
            <HeaderMobileComponent />
            <Container className="mt-2">
                <BreadcrumbComponent/>
                <OrderListComponents />
            </Container>
            <FooterComponent />
        </>
    )
}

export default OrderList;
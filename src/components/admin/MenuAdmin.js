import { Grid } from "@mui/material"
import { Row, Col } from "reactstrap"
import logoImg from "../../app/image/logo.PNG";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function MenuAdmin() {
    const dispatch = useDispatch();

    const [selectedHomePage, setSelectedHomePage] = useState("nav-link");
    const [selectedManagement, setSelectedManagement] = useState("nav-link");
    const [openMenu, setOpenMenu] = useState("nav-item");
    const [selectedCustomer, setSelectedCustomer] = useState("nav-icon fas fa-circle");
    const [selectedOrder, setSelectedOrder] = useState("nav-icon fas fa-circle");
    const [selectedProduct, setSelectedProduct] = useState("nav-icon fas fa-circle");
    const [selectedProductType, setSelectedProductType] = useState("nav-icon fas fa-circle");

    const onHomePageClick = () => {
        setSelectedHomePage("nav-link active");
        setSelectedManagement("nav-link");
        setOpenMenu("nav-item");
        setSelectedCustomer("nav-icon fas fa-circle");
        setSelectedOrder("nav-icon fas fa-circle");
        setSelectedProduct("nav-icon fas fa-circle");
        setSelectedProductType("nav-icon fas fa-circle");
        setHeader("Home");
        setBreadCrumb(null, null)
    }

    const onManagementClick = () => {
        setSelectedHomePage("nav-link");
        setSelectedManagement("nav-link active");
        setOpenMenu("nav-item menu-open");
    }

    const onCustomerClick = () => {
        setSelectedCustomer("nav-icon fas fa-dot-circle");
        setSelectedOrder("nav-icon fas fa-circle");
        setSelectedProduct("nav-icon fas fa-circle");
        setSelectedProductType("nav-icon fas fa-circle");
        setHeader("Customer");
        setBreadCrumb("Management", "Customer")
    }

    const onOrderClick = () => {
        setSelectedCustomer("nav-icon fas fa-circle");
        setSelectedOrder("nav-icon fas fa-dot-circle");
        setSelectedProduct("nav-icon fas fa-circle");
        setSelectedProductType("nav-icon fas fa-circle");
        setHeader("Order");
        setBreadCrumb("Management", "Order")
    }

    const onProductClick = () => {
        setSelectedCustomer("nav-icon fas fa-circle");
        setSelectedOrder("nav-icon fas fa-circle");
        setSelectedProduct("nav-icon fas fa-dot-circle");
        setSelectedProductType("nav-icon fas fa-circle");
        setHeader("Product");
        setBreadCrumb("Management", "Product")
    }

    const onProductTypeClick = () => {
        setSelectedCustomer("nav-icon fas fa-circle");
        setSelectedOrder("nav-icon fas fa-circle");
        setSelectedProduct("nav-icon fas fa-circle");
        setSelectedProductType("nav-icon fas fa-dot-circle");
        setHeader("Product Type");
        setBreadCrumb("Management", "Product Type")
    }

    const setHeader = (param) => {
        dispatch({
            type: "SET_HEADER_ADMIN",
            payload: {
                headerAdmin: param
            }
        })
    }
    const setBreadCrumb = (param1, param2) => {
        dispatch({
            type: "SET_BREADCRUMB_ADMIN",
            payload: {
                breadcrumbAdmin1: param1,
                breadcrumbAdmin2: param2
            }
        })
    }
    return (
        <>
            <Grid>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    <a href="/" className="brand-link text-center">
                        <span className="brand-text font-weight-light text-center">
                            <img src={logoImg} className="w-50" alt="logoImg"></img>
                        </span>
                    </a>
                    <div className="sidebar">
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                                data-accordion="false">

                                <li className="nav-item" onClick={onHomePageClick}>
                                    <a className={selectedHomePage}>
                                        <i className="nav-icon fas fa-home"></i>
                                        <p>Homepage</p>
                                    </a>
                                </li>
                                <li className={openMenu} onClick={onManagementClick}>
                                    <a className={selectedManagement}>
                                        <i className="nav-icon fas fa-list"></i>
                                        <p>
                                            Management <i class="right fas fa-angle-left"></i>
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item" onClick={onCustomerClick}>
                                            <a className="nav-link">
                                                &emsp;&ensp;<i className={selectedCustomer}></i>
                                                <p>Customer</p>
                                            </a>
                                        </li>
                                        <li className="nav-item" onClick={onOrderClick}>
                                            <a className="nav-link">
                                                &emsp;&ensp;<i className={selectedOrder}></i>
                                                <p>Order</p>
                                            </a>
                                        </li>
                                        <li className="nav-item" onClick={onProductClick}>
                                            <a className="nav-link">
                                                &emsp;&ensp;<i className={selectedProduct}></i>
                                                <p>Product</p>
                                            </a>
                                        </li>
                                        <li className="nav-item" onClick={onProductTypeClick}>
                                            <a className="nav-link">
                                                &emsp;&ensp;<i className={selectedProductType}></i>
                                                <p>Product Type</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>

                    </div>

                </aside>
            </Grid>
        </>
    )
}

export default MenuAdmin
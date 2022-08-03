import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Grid } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateOrder from "../modals/order/CreateOrder";
import DeleteOrder from "../modals/order/DeleteOrder";
import EditOrder from "../modals/order/EditOrder";

function OrderTable() {
    const dispatch = useDispatch();

    const [orderData, setOrderData] = useState([]);

    const limit = 10;

    const [pageIndex, setPageIndex] = useState(1);

    const [pageAmount, setPageAmount] = useState(0);

    const [rows, setRows] = useState(null);

    const [rowSelected, setRowSelected] = useState(null);

    const onPageIndexChange = (event, value) => {
        setPageIndex(value);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const openCreateOrderModal = () => {
        dispatch({
            type: "CREATE_ORDER_MODAL",
            payload: {
                openCreateOrderModal: true,
            }
        })
    }

    const onOrderEditClick = (param) => {
        setRowSelected(param);
        dispatch({
            type: "EDIT_ORDER_MODAL",
            payload: {
                openEditOrderModal: true,
            }
        })
    }

    const openDeleteOrderModal = (param) => {
        setRowSelected(param);
        dispatch({
            type: "DELETE_ORDER_MODAL",
            payload: {
                openDeleteOrderModal: true,
            }
        })
    }

    const onSelectRow = (param) => {
        setRowSelected(param);
        console.log(rowSelected);
    }

    const onSelectStatus = (event) => {
        if (event.target.value == "Canceled") {
            let editBody = {
                shippedDate: 0
            }
            let content = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editBody)
            }

            fetch("https://shop24-backend.herokuapp.com/orders/" + rowSelected._id, content)
                .then((response) => response.json())
                .then((data) => {

                    if (data.status == "Success 200") {
                        dispatch({
                            type: "OPEN_SNACKBAR",
                            payload: {
                                openSnackbar: true,
                                alertString: "Edit order succesfully"
                            }
                        })
                        dispatch({
                            type: "ALERT_SEVERITY",
                            payload: {
                                alertSeverity: "success"
                            }
                        });
                    }
                    else {
                        dispatch({
                            type: "OPEN_SNACKBAR",
                            payload: {
                                openSnackbar: true,
                                alertString: "Error! Please try again"
                            }
                        })
                    }
                })
        }
        if (event.target.value == "Shipped") {
            let editBody = {
                shippedDate: Date()
            }
            let content = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editBody)
            }

            fetch("https://shop24-backend.herokuapp.com/orders/" + rowSelected._id, content)
                .then((response) => response.json())
                .then((data) => {

                    if (data.status == "Success 200") {
                        rowSelected.orderDetail[0].orderItems.map((element) => {
                            let editAmount = {
                                amount: element.info.amount - element.amount
                            }
                            console.log(editAmount)
                            let content1 = {
                                method: "PUT",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(editAmount)
                            }
                            fetch("https://shop24-backend.herokuapp.com/products/" + element.product, content1)
                            .then((response) => response.json())
                            .then((result) => {
                                if (data.status == "Success 200"){
                                    dispatch({
                                        type: "OPEN_SNACKBAR",
                                        payload: {
                                            openSnackbar: true,
                                            alertString: "Update product amount succesfully"
                                        }
                                    })
                                    dispatch({
                                        type: "ALERT_SEVERITY",
                                        payload: {
                                            alertSeverity: "success"
                                        }
                                    });
                                }
                                else{
                                    dispatch({
                                        type: "OPEN_SNACKBAR",
                                        payload: {
                                            openSnackbar: true,
                                            alertString: "Error! Please try again"
                                        }
                                    })
                                }
                            })
                        })

                        dispatch({
                            type: "OPEN_SNACKBAR",
                            payload: {
                                openSnackbar: true,
                                alertString: "Edit order succesfully"
                            }
                        })
                        dispatch({
                            type: "ALERT_SEVERITY",
                            payload: {
                                alertSeverity: "success"
                            }
                        });
                    }
                    else {
                        dispatch({
                            type: "OPEN_SNACKBAR",
                            payload: {
                                openSnackbar: true,
                                alertString: "Error! Please try again"
                            }
                        })
                    }
                })
        }
        if (event.target.value == "Ordering") {
            let editBody = {
                shippedDate: ""
            }
            let content = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editBody)
            }

            fetch("https://shop24-backend.herokuapp.com/orders/" + rowSelected._id, content)
                .then((response) => response.json())
                .then((data) => {

                    if (data.status == "Success 200") {
                        dispatch({
                            type: "OPEN_SNACKBAR",
                            payload: {
                                openSnackbar: true,
                                alertString: "Edit order succesfully"
                            }
                        })
                        dispatch({
                            type: "ALERT_SEVERITY",
                            payload: {
                                alertSeverity: "success"
                            }
                        });
                    }
                    else {
                        dispatch({
                            type: "OPEN_SNACKBAR",
                            payload: {
                                openSnackbar: true,
                                alertString: "Error! Please try again"
                            }
                        })
                    }
                })
        }
    }

    useEffect(() => {
        fetch("https://shop24-backend.herokuapp.com/orders")
            .then((response) => response.json())
            .then((result) => {
                setOrderData(result.data);
                setPageAmount(Math.ceil(orderData.length / limit));
                setRows(orderData.slice((pageIndex - 1) * limit, pageIndex * limit));
            })
            .catch(error => console.log('error', error));
    })

    return (
        <>
            <TableContainer className="w-100 bg-white">
                <TableHead>
                    <TableRow>
                        <TableCell className="text-center p-0" style={{ width: "5%" }}><i className="fas fa-plus-square fa-2x text-primary" data-toggle="tooltip" title="Add Order" onClick={openCreateOrderModal}></i></TableCell>
                        <TableCell className="text-center" style={{ width: "20%" }}><b>Order ID</b></TableCell>
                        <TableCell className="text-center" style={{ width: "15%" }}><b>Customer</b></TableCell>
                        <TableCell className="text-center" style={{ width: "15%" }}><b>Phone</b></TableCell>
                        <TableCell className="text-center" style={{ width: "15%" }}><b>Email</b></TableCell>
                        <TableCell className="text-center" style={{ width: "10%" }}><b>Order Day</b></TableCell>
                        <TableCell className="text-center" style={{ width: "20%" }}><b>Status</b></TableCell>
                        <TableCell className="text-center" style={{ width: "20%" }}><b>Action</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows !== null
                            ?
                            rows.map((element, index) => {
                                return (
                                    <>
                                        <TableRow>
                                            <TableCell className="text-center">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {element._id}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {element.orderDetail[0].name}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {element.orderDetail[0].phone}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {element.orderDetail[0].email}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {element.orderDate}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <select className="form-control" onClick={() => onSelectRow(element)} onChange={onSelectStatus}>
                                                    {
                                                        element.shippedDate !== null
                                                            ?
                                                            element.shippedDate !== "1970-01-01T00:00:00.000Z"
                                                                ?
                                                                <>
                                                                    <option key="2" selected>Shipped</option>
                                                                </>
                                                                :
                                                                <>
                                                                    <option key="3" selected>Canceled</option>
                                                                </>
                                                            :
                                                            <>
                                                                <option key="1" selected>Ordering</option>
                                                                <option key="2">Shipped</option>
                                                                <option key="3">Canceled</option>
                                                            </>

                                                    }

                                                </select>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <i className="fas fa-edit" data-toggle="tooltip" title="Edit Order" onClick={() => { onOrderEditClick(element) }}></i>&nbsp;&nbsp;
                                                <i className="fa-solid fa-trash-can" data-toggle="tooltip" title="Delete Order" onClick={() => { openDeleteOrderModal(element) }}></i>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )
                            })
                            :
                            null
                    }
                </TableBody>
            </TableContainer>
            {/* Pagination */}
            <Grid className="d-flex justify-content-end">
                <Pagination count={pageAmount} defaultPage={pageIndex} onChange={onPageIndexChange} />
            </Grid>

            <CreateOrder />
            <EditOrder order={rowSelected} />
            <DeleteOrder order={rowSelected} />
        </>
    )
}

export default OrderTable
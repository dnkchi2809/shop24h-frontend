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
                                                <select className="form-control">
                                                    <option key="1">Ordering</option>
                                                    <option key="2">Shipped</option>
                                                    <option key="3">Canceled</option>
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
            <EditOrder order={rowSelected}/>
            <DeleteOrder order={rowSelected}/>
        </>
    )
}

export default OrderTable
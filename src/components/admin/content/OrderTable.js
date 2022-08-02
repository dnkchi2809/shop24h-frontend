import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Button, Col, Container, Row, Input } from "reactstrap";
import { useEffect, useState } from "react"

function OrderTable() {

    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        fetch("https://shop24-backend.herokuapp.com/orders")
            .then((response) => response.json())
            .then((result) => {
                setOrderData(result.data)
            })
            .catch(error => console.log('error', error));
    })

    return (
        <>
            <TableContainer className="w-100 bg-white">
                <TableHead>
                    <TableRow>
                        <TableCell className="text-center p-0" style={{ width: "5%" }}><i className="fas fa-plus-square fa-2x text-primary" data-toggle="tooltip" title="Add Order"></i></TableCell>
                        <TableCell className="text-center" style={{ width: "20%" }}><b>Customer</b></TableCell>
                        <TableCell className="text-center" style={{ width: "20%" }}><b>Phone</b></TableCell>
                        <TableCell className="text-center" style={{ width: "20%" }}><b>Email</b></TableCell>
                        <TableCell className="text-center" style={{ width: "20%" }}><b>Order Detail</b></TableCell>
                        <TableCell className="text-center" style={{ width: "20%" }}><b>Cost</b></TableCell>
                        <TableCell className="text-center" style={{ width: "10%" }}><b>Order Day</b></TableCell>
                        <TableCell className="text-center" style={{ width: "10%" }}><b>Status</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orderData.length >= 1
                            ?
                            orderData.map((element, index) => {
                                return (
                                    <>
                                        <TableRow>
                                            <TableCell className="text-center">
                                                {index + 1}
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
                                                <i className="fas fa-list-ul" data-toggle="tooltip" title="Order Item"></i>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {element.cost}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {element.orderDate}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <select>
                                                    <option key="1">Ordering</option>
                                                    <option key="2">Shipped</option>
                                                    <option key="3">Canceled</option>
                                                </select>
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
        </>
    )
}

export default OrderTable
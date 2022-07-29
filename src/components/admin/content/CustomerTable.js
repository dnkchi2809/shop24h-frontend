import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Button, Col, Container, Row, Input } from "reactstrap";
import { useEffect, useState } from "react"

function CustomerTable() {

    const [customerData, setCustomerData] = useState([]);

    useEffect(() => {
        fetch("https://shop24-backend.herokuapp.com/customers")
            .then((response) => response.json())
            .then((result) => {
                setCustomerData(result.data)
            })
            .catch(error => console.log('error', error));
    })

    return (
        <>
            <TableContainer className="w-100 bg-white">
                <TableHead>
                    <TableRow>
                        <TableCell className="text-center p-0" style={{width : "5%"}}><i className="fas fa-plus-square fa-2x text-primary" data-toggle="tooltip" title="Add User"></i></TableCell>
                        <TableCell className="text-center" style={{width : "20%"}}><b>Username</b></TableCell>
                        <TableCell className="text-center" style={{width : "20%"}}><b>Full name</b></TableCell>
                        <TableCell className="text-center" style={{width : "20%"}}><b>Phone</b></TableCell>
                        <TableCell className="text-center" style={{width : "20%"}}><b>Email</b></TableCell>
                        <TableCell className="text-center" style={{width : "10%"}}><b>Orders</b></TableCell>
                        <TableCell className="text-center" style={{width : "5%"}}><b>Action</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        customerData.length >= 1
                            ?
                            customerData.map((element, index) => {
                                return (
                                    <>
                                        <TableRow>
                                            <TableCell className="text-center">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {element.userName}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {element.fullName}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {element.phone}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {element.email}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {element.orders.length}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <i class="fas fa-edit" data-toggle="tooltip" title="Edit User"></i>
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

export default CustomerTable
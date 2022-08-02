import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Grid } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import CreateCustomer from "../modals/customer/CreateCustomer";
import EditCustomer from "../modals/customer/EditCustomer";
import DeleteCustomer from "../modals/customer/DeleteCustomer";

function CustomerTable() {
    const dispatch = useDispatch();

    const [customerData, setCustomerData] = useState([]);

    const limit = 5;

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

    const openCreateUserModal = () => {
        dispatch({
            type: "CREATE_USER_MODAL",
            payload: {
                openCreateUserModal: true,
            }
        })
    }

    const openEditUserModal = (param) => {
        setRowSelected(param);
        dispatch({
            type: "EDIT_USER_MODAL",
            payload: {
                openEditUserModal: true,
            }
        })
    }

    const openDeleteUserModal = (param) => {
        setRowSelected(param);
        console.log(param)
        dispatch({
            type: "DELETE_USER_MODAL",
            payload: {
                openDeleteUserModal: true,
            }
        })
    }

    useEffect(() => {
        const content = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'no-cors'
        };
        fetch("https://shop24-backend.herokuapp.com/customers")
            .then((response) => response.json())
            .then((result) => {
                setCustomerData(result.data)
                setPageAmount(Math.ceil(customerData.length / limit));
                setRows(customerData.slice((pageIndex - 1) * limit, pageIndex * limit));
            })
            .catch(error => { throw new Error(error); });


    })

    return (
        <>
            <TableContainer className="w-100 bg-white">
                <TableHead>
                    <TableRow>
                        <TableCell className="text-center p-0" style={{ width: "5%" }}><i className="fas fa-plus-square fa-2x text-primary" data-toggle="tooltip" title="Add User" onClick={openCreateUserModal}></i></TableCell>
                        <TableCell className="text-center" style={{ width: "20%" }}><b>Username</b></TableCell>
                        <TableCell className="text-center" style={{ width: "20%" }}><b>Full name</b></TableCell>
                        <TableCell className="text-center" style={{ width: "20%" }}><b>Phone</b></TableCell>
                        <TableCell className="text-center" style={{ width: "20%" }}><b>Email</b></TableCell>
                        <TableCell className="text-center" style={{ width: "10%" }}><b>Orders</b></TableCell>
                        <TableCell className="text-center" style={{ width: "5%" }}><b>Action</b></TableCell>
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
                                                <i className="fas fa-edit" data-toggle="tooltip" title="Edit User" onClick={() => { openEditUserModal(element) }}></i>&nbsp;&nbsp;
                                                <i className="fa-solid fa-trash-can" data-toggle="tooltip" title="Delete User" onClick={() => { openDeleteUserModal(element) }}></i>
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
            <Grid className="mb-5 d-flex justify-content-end">
                <Pagination count={pageAmount} defaultPage={pageIndex} onChange={onPageIndexChange} />
            </Grid>

            {/* Modal */}
            <CreateCustomer />
            <EditCustomer user={rowSelected} />
            <DeleteCustomer user={rowSelected} />
        </>
    )
}

export default CustomerTable
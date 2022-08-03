import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Button, Col, Container, Row, Input } from "reactstrap";
import { Grid } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import CreateProductType from "../modals/productType/CreateProductType";
import EditProductType from "../modals/productType/EditProductType";
import DeleteProductType from "../modals/productType/DeleteProductType";

function ProductTypeTable() {
    const dispatch = useDispatch();

    const [productTypeData, setProductTypeData] = useState([]);

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

    const onAddProductType = () => {
        dispatch({
            type: "CREATE_PRODUCTTYPE_MODAL",
            payload: {
                openCreateProductTypeModal: true,
            }
        })
    }

    const openEditProductTypeModal = (param) => {
        setRowSelected(param)
        dispatch({
            type: "EDIT_PRODUCTTYPE_MODAL",
            payload: {
                openEditProductTypeModal: true,
            }
        })
    }

    const onDeleteProductTypeClick = (param) => {
        setRowSelected(param)
        dispatch({
            type: "DELETE_PRODUCTTYPE_MODAL",
            payload: {
                openDeleteProductTypeModal: true,
            }
        })
    }

    useEffect(() => {
        fetch("https://shop24-backend.herokuapp.com/productTypes")
            .then((response) => response.json())
            .then((result) => {
                setProductTypeData(result.data);
                setPageAmount(Math.ceil(productTypeData.length / limit));
                setRows(productTypeData.slice((pageIndex - 1) * limit, pageIndex * limit));
            })
            .catch(error => console.log('error', error));
    })

    return (
        <>
            <TableContainer className="w-100">
                <TableHead>
                    <TableRow>
                        <TableCell className="text-center p-0" style={{ width: "5%" }}><i className="fas fa-plus-square fa-2x text-primary" data-toggle="tooltip" title="Add Product Type" onClick={onAddProductType}></i></TableCell>
                        <TableCell className="text-center" style={{ width: "30%" }}><b>Product Type ID</b></TableCell>
                        <TableCell className="text-center" style={{ width: "25%" }}><b>Name</b></TableCell>
                        <TableCell className="text-center" style={{ width: "35%" }}><b>Description</b></TableCell>
                        <TableCell className="text-center" style={{ width: "10%" }}><b>Action</b></TableCell>
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
                                                {element.name}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {element.description}
                                            </TableCell>
                                            <TableCell className="text-center">
                                            <i className="fas fa-edit" data-toggle="tooltip" title="Edit Product" onClick={() => { openEditProductTypeModal(element) }}></i>&nbsp;&nbsp;
                                                <i className="fa-solid fa-trash-can" data-toggle="tooltip" title="Delete Product" onClick={() => { onDeleteProductTypeClick(element) }}></i>
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

            <CreateProductType />
            <EditProductType productType={rowSelected} />
            <DeleteProductType productType={rowSelected}/>
        </>
    )
}

export default ProductTypeTable
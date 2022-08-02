import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Button, Col, Container, Row, Input } from "reactstrap";
import { Grid } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import CreateProduct from "../modals/product/CreateProduct";
import DeleteProduct from "../modals/product/DeleteProduct";
import EditProduct from "../modals/product/EditProduct";

function ProductTable() {

    const dispatch = useDispatch();

    const [productData, setProductData] = useState([]);

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

    const onAddProductClick = () => {
        dispatch({
            type: "CREATE_PRODUCT_MODAL",
            payload: {
                openCreateProductModal: true,
            }
        })
    }

    const openEditProductModal = (param) => {
        setRowSelected(param)
        dispatch({
            type: "EDIT_PRODUCT_MODAL",
            payload: {
                openEditProductModal: true,
            }
        })
    }

    const onDeleteProductClick = (param) => {
        setRowSelected(param)
        dispatch({
            type: "DELETE_PRODUCT_MODAL",
            payload: {
                openDeleteProductModal: true,
            }
        })
    }

    useEffect(() => {
        fetch("https://shop24-backend.herokuapp.com/products")
            .then((response) => response.json())
            .then((result) => {
                setProductData(result.data);
                setPageAmount(Math.ceil(productData.length / limit));
                setRows(productData.slice((pageIndex - 1) * limit, pageIndex * limit));
            })
            .catch(error => console.log('error', error));
    })

    return (
        <>
            <TableContainer className="w-100 bg-white">
                <TableHead>
                    <TableRow>
                        <TableCell className="text-center p-0" style={{ width: "5%" }}><i className="fas fa-plus-square fa-2x text-primary" data-toggle="tooltip" title="Add Product" onClick={onAddProductClick}></i></TableCell>
                        <TableCell className="text-center" style={{ width: "40%" }}><b>Name</b></TableCell>
                        <TableCell className="text-center" style={{ width: "15%" }}><b>Image</b></TableCell>
                        <TableCell className="text-center"><b>Buy Price</b></TableCell>
                        <TableCell className="text-center"><b>Promotion Price</b></TableCell>
                        <TableCell className="text-center"><b>Amount</b></TableCell>
                        <TableCell className="text-center"><b>Action</b></TableCell>
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
                                                <Input className="border-0 p-0" defaultValue={element.name}></Input>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <img src={element.imageUrl} style={{width:"40%"}}/>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className="border-0 p-0" style={{textAlign:"center"}} defaultValue={element.buyPrice}></Input>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className="border-0 p-0" style={{textAlign:"center"}} defaultValue={element.promotionPrice}></Input>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className="border-0 p-0" style={{textAlign:"center"}} defaultValue={element.amount}></Input>
                                            </TableCell>
                                            <TableCell className="text-center">
                                            <i className="fas fa-edit" data-toggle="tooltip" title="Edit Product" onClick={() => { openEditProductModal(element) }}></i>&nbsp;&nbsp;
                                                <i className="fa-solid fa-trash-can" data-toggle="tooltip" title="Delete Product" onClick={() => onDeleteProductClick(element)}></i>
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

            <CreateProduct />
            <EditProduct product={rowSelected}/>
            <DeleteProduct product={rowSelected}/>
        </>
    )
}

export default ProductTable
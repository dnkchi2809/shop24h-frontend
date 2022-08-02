import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Button, Col, Container, Row, Input } from "reactstrap";
import { Grid } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from "react"

function ProductTypeTable() {

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
            <TableContainer className="w-100 bg-white">
                <TableHead>
                    <TableRow>
                        <TableCell className="text-center p-0" style={{ width: "5%" }}><i className="fas fa-plus-square fa-2x text-primary" data-toggle="tooltip" title="Add Product"></i></TableCell>
                        <TableCell className="text-center" style={{ width: "40%" }}><b>Product Type ID</b></TableCell>
                        <TableCell className="text-center" style={{ width: "15%" }}><b>Name</b></TableCell>
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
                                                {element._id}>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className="border-0 p-0" style={{textAlign:"center"}} defaultValue={element.name}></Input>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <i className="fa-solid fa-trash-can" data-toggle="tooltip" title="Delete Product"></i>
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
        </>
    )
}

export default ProductTypeTable
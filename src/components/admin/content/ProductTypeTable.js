import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Button, Col, Container, Row, Input } from "reactstrap";
import { useEffect, useState } from "react"

function ProductTypeTable() {

    const [productTypeData, setProductTypeData] = useState([]);

    useEffect(() => {
        fetch("https://shop24-backend.herokuapp.com/productTypes")
            .then((response) => response.json())
            .then((result) => {
                setProductTypeData(result.data)
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
                        productTypeData.length >= 1
                            ?
                            productTypeData.map((element, index) => {
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
        </>
    )
}

export default ProductTypeTable
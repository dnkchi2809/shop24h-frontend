import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function OrderListComponents() {
    //const { selectedProduct } = useSelector((reduxData) => reduxData.reducers);
    const [orderList, setOrderList] = useState(JSON.parse(localStorage.getItem("orderList")) || []);

    const onBtnMinusProductClick = (event) => {
        //let id = document.getElementById(element.info.)
        console.log(event.target.parentNode.innerText)
    }

    const onBtnAddProductClick = () => {

    }
    useEffect(() => {
        console.log(orderList);

    }, [])

    return (
        <>
            <TableContainer>
                <TableHead>
                    <TableRow>
                        <TableCell className="text-center">Image</TableCell>
                        <TableCell className="text-center">Name</TableCell>
                        <TableCell className="text-center">Amount</TableCell>
                        <TableCell className="text-center">Price</TableCell>
                        <TableCell className="text-center">Select</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orderList.length >= 1
                            ?
                            orderList.map((element, index) => {
                                return (
                                    <TableRow>
                                        <TableCell sx={{ width: "20%" }}><img src={element.info.imageUrl} style={{ width: "100%" }} /></TableCell>
                                        <TableCell>{element.info.name}</TableCell>
                                        <TableCell className="text-center" id="element.info._id">
                                            <i class="fas fa-minus-circle fa-1x" style={{ marginRight: "2%" }} onClick={onBtnMinusProductClick}></i>
                                            &nbsp;{element.amount}&nbsp;
                                            <i class="fas fa-plus-circle fa-1x" style={{ marginLeft: "2%" }} onClick={onBtnAddProductClick}></i>
                                        </TableCell>
                                        <TableCell className="text-center">{element.info.promotionPrice}</TableCell>
                                        <TableCell className="text-center"><input type="checkbox" /></TableCell>
                                    </TableRow>
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

export default OrderListComponents;
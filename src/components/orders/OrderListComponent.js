import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function OrderListComponents() {
    //const { selectedProduct } = useSelector((reduxData) => reduxData.reducers);
    const [orderList, setOrderList] = useState([]);

    const [itemTotal, setItemTotal] = useState(0);

    const onBtnMinusProductClick = (param) => {
        orderList.map((element, index) => {
            if (element.product == param.product) {
                element.amount = param.amount - 1;
                if(itemTotal > 0 && element.amount >= 0){
                    let newTotal = itemTotal - param.info.promotionPrice;
                    setItemTotal(newTotal);
                }
                if (element.amount <= 0) {
                    orderList.splice(index, 1);
                }
            }
        })
        localStorage.setItem("orderList", JSON.stringify(orderList));
    }

    const onBtnAddProductClick = (param) => {
        orderList.map((element, index) => {
            if (element.product == param.product) {
                element.amount = param.amount + 1;
                if(itemTotal > 0 && element.amount <= param.info.amount){
                    let newTotal = itemTotal + param.info.promotionPrice;
                    setItemTotal(newTotal);
                }
                if (element.amount >= param.info.amount) {
                    element.amount = param.info.amount
                }
            }
        })
        localStorage.setItem("orderList", JSON.stringify(orderList));
    }

    const onSelectItem = (event) => {
        let total = itemTotal;
        orderList.map((element) => {
            if (element.product == event.target.value) {
                if (event.target.checked) {
                    total += element.info.promotionPrice * element.amount
                }
                if (!event.target.checked) {
                    total -= element.info.promotionPrice * element.amount
                }
            }
        })
        setItemTotal(total)
    }


    useEffect(() => {
        setOrderList(JSON.parse(localStorage.getItem("orderList")) || [])
    })

    return (
        <>
            <TableContainer className="mb-5">
                <TableHead>
                    <TableRow>
                        <TableCell className="text-center" sx={{ width: "5%" }}>Select</TableCell>
                        <TableCell className="text-center" sx={{ width: "8%" }}>Image</TableCell>
                        <TableCell className="text-center" sx={{ width: "35%" }}>Name</TableCell>
                        <TableCell className="text-center" sx={{ width: "10%" }}>Quantity</TableCell>
                        <TableCell className="text-center" sx={{ width: "17%" }}>Unit Price</TableCell>
                        <TableCell className="text-center" sx={{ width: "15%" }}>Amount</TableCell>
                        <TableCell className="text-center" sx={{ width: "10%" }}>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orderList.length >= 1
                            ?
                            orderList.map((element, index) => {
                                return (
                                    <TableRow>
                                        <TableCell sx={{ width: "5%" }} className="text-center"><input type="checkbox" onChange={onSelectItem} value={element.product} /></TableCell>
                                        <TableCell sx={{ width: "8%" }}><img src={element.info.imageUrl} style={{ width: "100%" }} /></TableCell>
                                        <TableCell sx={{ width: "35%" }}>{element.info.name}</TableCell>
                                        <TableCell sx={{ width: "10%" }} className="text-center">
                                            <i class="fas fa-minus-circle fa-1x" style={{ marginRight: "2%" }} onClick={() => onBtnMinusProductClick(element)}></i>
                                            &nbsp;{element.amount}&nbsp;
                                            <i class="fas fa-plus-circle fa-1x" style={{ marginLeft: "2%" }} onClick={() => onBtnAddProductClick(element)}></i>
                                        </TableCell>
                                        <TableCell sx={{ width: "17%" }} className="text-center">{element.info.promotionPrice}</TableCell>
                                        <TableCell sx={{ width: "15%" }} className="text-center">{element.info.promotionPrice * element.amount}</TableCell>
                                        <TableCell sx={{ width: "10%" }} className="text-center"><i class="fas fa-trash-alt"></i></TableCell>
                                    </TableRow>
                                )
                            })
                            :
                            null
                    }
                    <TableRow>
                        <TableCell className="text-center">Total</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-center" sx={{ fontWeight: "bold" }}>{itemTotal}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </TableContainer>
        </>
    )
}

export default OrderListComponents;
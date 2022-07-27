import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import OrderModal from "../modals/OrderModal";


function OrderListComponents() {
    const dispatch = useDispatch();

    const { user } = useSelector((reduxData) => reduxData.reducers);

    const [orderList, setOrderList] = useState([]);

    const [itemTotal, setItemTotal] = useState(0);

    const [selectItem, setSelectItem] = useState([])

    const onBtnMinusProductClick = (param) => {
        orderList.map((element, index) => {
            if (element.product == param.product) {
                element.amount = param.amount - 1;
                if (itemTotal > 0 && element.amount >= 0 && Boolean(selectItem.find(item => item.product == element.product)) == true) {
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
                if (itemTotal > 0 && element.amount <= param.info.amount && Boolean(selectItem.find(item => item.product == element.product)) == true) {
                    let newTotal = itemTotal + param.info.promotionPrice;
                    setItemTotal(newTotal);
                }
                if (element.amount >= param.info.amount) {
                    element.amount = param.info.amount
                }
                else {
                    element.amount = param.amount + 1;
                }
            }
        })
        localStorage.setItem("orderList", JSON.stringify(orderList));
    }

    const onDeleteItemClick = (param) => {
        orderList.map((element, index) => {
            if (element.product == param.product) {
                orderList.splice(index, 1);
            }
        })
        localStorage.setItem("orderList", JSON.stringify(orderList));
    }

    const onSelectAllItem = (event) => {
        let total = 0;
        let arraySelectedItem = [];
        if (event.target.checked) {
            orderList.map((element, index) => {
                total += element.info.promotionPrice * element.amount
                arraySelectedItem.push(element)
                document.getElementById(element.product).checked = true
            })
        }
        else {
            orderList.map((element, index) => {
                document.getElementById(element.product).checked = false
            })
            total = 0;
            arraySelectedItem = []
        }
        setItemTotal(total);
        setSelectItem(arraySelectedItem);
    }

    const onSelectItem = (event) => {
        let total = itemTotal;
        let arraySelectedItem = selectItem;
        orderList.map((element, index) => {
            if (element.product == event.target.value) {
                if (event.target.checked) {
                    total += element.info.promotionPrice * element.amount
                    arraySelectedItem.push(element)
                }
                if (!event.target.checked) {
                    total -= element.info.promotionPrice * element.amount;
                    arraySelectedItem.splice(index, 1);
                    document.getElementById("select-all-item").checked = false
                }
            }
        })
        setItemTotal(total);
        setSelectItem(arraySelectedItem);
    }


    const onBtnPaymentClick = () => {
        if (itemTotal > 0) {
            if (user) {
                dispatch({
                    type: "ORDER_MODAL",
                    payload: {
                        openOrderModal: true
                    }
                })
            }
            else {
                dispatch({
                    type: "LOGIN_MODAL",
                    payload: {
                        openLoginModal: true
                    }
                })
            }
        }
        else {
            //alert chưa chọn item
            alert("Chưa chọn item")
        }
    }


    useEffect(() => {
        setOrderList(JSON.parse(localStorage.getItem("orderList")) || [])
    })

    return (
        <>
            <TableContainer className="mb-5">
                <TableHead>
                    <TableRow>
                        <TableCell className="text-center" sx={{ width: "5%" }}>
                            <input type="checkbox" onChange={onSelectAllItem} id="select-all-item" />
                        </TableCell>
                        <TableCell className="text-center" sx={{ width: "8%" }}>Image</TableCell>
                        <TableCell className="text-center" sx={{ width: "35%" }}>Name</TableCell>
                        <TableCell className="text-center" sx={{ width: "10%" }}>Quantity</TableCell>
                        <TableCell className="text-center" sx={{ width: "17%" }}>Unit Price</TableCell>
                        <TableCell className="text-center" sx={{ width: "15%" }}>Amount (USD)</TableCell>
                        <TableCell className="text-center" sx={{ width: "10%" }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orderList.length >= 1
                            ?
                            orderList.map((element, index) => {
                                return (
                                    <TableRow>
                                        <TableCell sx={{ width: "5%" }} className="text-center"><input type="checkbox" onChange={onSelectItem} value={element.product} id={element.product}/></TableCell>
                                        <TableCell sx={{ width: "8%" }}><img src={element.info.imageUrl} style={{ width: "100%" }} /></TableCell>
                                        <TableCell sx={{ width: "35%" }}>{element.info.name}</TableCell>
                                        <TableCell sx={{ width: "10%" }} className="text-center">
                                            <i className="fas fa-minus-circle fa-1x" style={{ marginRight: "2%" }} onClick={() => onBtnMinusProductClick(element)}></i>
                                            &nbsp;{element.amount}&nbsp;
                                            <i className="fas fa-plus-circle fa-1x" style={{ marginLeft: "2%" }} onClick={() => onBtnAddProductClick(element)}></i>
                                        </TableCell>
                                        <TableCell sx={{ width: "17%" }} className="text-center">{element.info.promotionPrice}</TableCell>
                                        <TableCell sx={{ width: "15%" }} className="text-center">{element.info.promotionPrice * element.amount}</TableCell>
                                        <TableCell sx={{ width: "10%" }} className="text-center"><i className="fas fa-trash-alt" onClick={() => onDeleteItemClick(element)}></i></TableCell>
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
                        <TableCell className="text-center text-primary"><b>{itemTotal}</b></TableCell>
                        <TableCell className="text-center bg-info">
                            <btn className="btn border-info text-white btn-sm bg-info btn-payment" onClick={onBtnPaymentClick}>Payment</btn>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </TableContainer>

            {/* Modals */}
            <OrderModal user={user} itemList={selectItem} total={itemTotal} />
        </>
    )
}

export default OrderListComponents;
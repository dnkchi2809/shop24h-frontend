import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderModal from "../modals/OrderModal";

function OrderListComponents() {
    const dispatch = useDispatch();

    const [user, setUser] = useState([])

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
            if (user.length >= 1) {
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
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    openSnackbar: true,
                    alertString: "Select the item"
                }
            })
        }
    }


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("userInfo")) || []);
        setOrderList(JSON.parse(localStorage.getItem("orderList")) || [])
    })

    useEffect(() => {
        setItemTotal(0);
        setSelectItem([]);
    }, []);

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

                        orderList.map((element, index) => {
                            return (
                                <TableRow>
                                    <TableCell sx={{ width: "5%" }} className="text-center"><input type="checkbox" onChange={onSelectItem} value={element.product} id={element.product} /></TableCell>
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

                    }
                    <TableRow>
                        <TableCell className="text-center">Total</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-center text-primary"><b>{itemTotal}</b></TableCell>
                        <TableCell className="text-center bg-primary">
                            <btn className="btn border-primary text-white btn-sm bg-primary w-100 btn-payment" onClick={onBtnPaymentClick}>Payment</btn>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </TableContainer>

            {/* Modals */}
            {
                user.length >= 1
                    ?
                    <OrderModal user={user[0]} itemList={selectItem} total={itemTotal} />
                    :
                    null
            }

        </>
    )
}

export default OrderListComponents;
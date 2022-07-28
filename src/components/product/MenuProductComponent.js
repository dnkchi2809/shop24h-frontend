import * as React from 'react';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"

function MenuProductComponent() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const onAllProductClick = () => {
        fetch("https://shop24-backend.herokuapp.com/products" || "http://localhost:8000/products")
            .then(response => response.json())
            .then(result => {
                dispatch({
                    type: "GET_PRODUCT_LIST",
                    payload: {
                        productList: result.data
                    }
                });
                dispatch({
                    type: "SET_PRODUCT_TYPE",
                    payload: {
                        productType: ""
                    }
                })
            })
            .catch(error => console.log('error', error));

        navigate("/products")
    }

    const onProductCLick = (event) => {
        console.log(event)
        dispatch({
            type: "SET_PRODUCT_TYPE",
            payload: {
                productType: event.target.id
            }
        });

        dispatch({
            type: "SET_BREADCRUMB",
            payload: {
                breadcrumb1: "products",
                breadcrumb2: event.target.outerText,
                breadcrumb3: null
            }
        })

        navigate("/products");
    }

    const [productType, setProductType] = React.useState(null);

    React.useEffect(() => {
        fetch("https://shop24-backend.herokuapp.com/products" || "http://localhost:8000/products")
            .then(response => response.json())
            .then(result => {
                dispatch({
                    type: "GET_PRODUCT_LIST",
                    payload: {
                        productList: result.data
                    }
                });
                dispatch({
                    type: "SET_PRODUCT_TYPE",
                    payload: {
                        productType: ""
                    }
                })
            })
            .catch(error => console.log('error', error));

        fetch("https://shop24-backend.herokuapp.com/productTypes" || "http://localhost:8000/productTypes")
            .then(response => response.json())
            .then(result => {
                setProductType(result.data);
            })
            .catch(error => console.log('error', error));
    }, [])
    return (
        <>
            <MenuList className='mb-3'>
                <MenuItem onClick={onAllProductClick}>
                    <b>All Products</b>
                </MenuItem>
                {
                    productType !== null
                        ?
                        productType.map((element, index) => {
                            return (
                                <>
                                    <MenuItem onClick={onProductCLick} id={element._id}>
                                        {element.name}
                                        {/*<ListItemText inset>Single</ListItemText>*/}
                                    </MenuItem>
                                </>
                            )
                        })
                        :
                        null
                }
            </MenuList>
        </>
    )
}

export default MenuProductComponent;
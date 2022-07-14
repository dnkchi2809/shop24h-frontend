import * as React from 'react';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch } from "react-redux";

function MenuProductComponent() {
    const dispatch = useDispatch();

    const onAllProductClick = () => {
        fetch("http://localhost:8000/products")
            .then(response => response.json())
            .then(result => {
                dispatch({
                    type: "GET_PRODUCT_LIST",
                    payload: {
                        productList: result.data
                    }
                })
            })
            .catch(error => console.log('error', error));
    }

    const [productType, setProductType] = React.useState(null);

    React.useEffect(() => {

        onAllProductClick();

        fetch("http://localhost:8000/productTypes")
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
                                    <MenuItem>
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
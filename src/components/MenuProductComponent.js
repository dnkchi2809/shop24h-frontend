import * as React from 'react';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

function MenuProductComponent() {
    const [productType, setProductType] = React.useState(null);
    
    React.useEffect(() => {
        fetch("http://localhost:8000/productTypes")
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setProductType(result.data);
            })
            .catch(error => console.log('error', error));
    }, [])
    return (
        <>
            <MenuList>
                <MenuItem>
                    <b>All Products</b>
                </MenuItem>
                {
                    productType !== null
                        ?
                        productType.map((element, index) => {
                            return (
                                <>
                                    <Divider />
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
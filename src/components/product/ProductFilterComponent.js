import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from "@mui/material"
import { useDispatch } from 'react-redux';

function ProductFilterComponent() {
    const dispatch = useDispatch();

    const onPriceLowestInput = (event) => {
        dispatch({
            type: "SET_PRICE_LOW",
            payload: {
                lowPrice: event.target.value
            }
        })
    }

    const onPriceHighestInput = (event) => {
        if (event.target.value !== "") {
            dispatch({
                type: "SET_PRICE_HIGH",
                payload: {
                    highPrice: event.target.value
                }
            })
        }
        else {
            dispatch({
                type: "SET_PRICE_HIGH",
                payload: {
                    highPrice: 999999999999
                }
            })
        }

    }

    return (
        <>

            <Grid className="col-min-max-price">
                <MenuItem>
                    Min Price
                </MenuItem>
                <MenuItem>
                    <input className='w-100 form-control' onInput={onPriceLowestInput} />
                </MenuItem>
            </Grid>
            <Grid className="col-min-max-price">
                <MenuItem>
                    Max Price
                </MenuItem>
                <MenuItem>
                    <input className='w-100 form-control' onInput={onPriceHighestInput} />
                </MenuItem>
            </Grid>

        </>
    )
}

export default ProductFilterComponent;
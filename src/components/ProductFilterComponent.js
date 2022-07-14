import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { Col, Row } from 'react-bootstrap';
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
        else{
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
            <MenuList>
                <MenuItem>
                    <b>Price</b>
                </MenuItem>
                <MenuItem>
                    <Row>
                        <Col className='col-5'>
                            <input className='w-100' onInput={onPriceLowestInput} />
                        </Col>
                        <Col className='col-2 text-center'>
                            -
                        </Col>
                        <Col className='col-5'>
                            <input className='w-100' onInput={onPriceHighestInput} />
                        </Col>
                    </Row>
                </MenuItem>
            </MenuList>
        </>
    )
}

export default ProductFilterComponent;
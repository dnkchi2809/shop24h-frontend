import { Grid } from "@mui/material";
import {Row} from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function ProductCard(props) {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    let productId = document.getElementById(props.product._id);

    const onMouseEnterProduct = (e) => {
        productId.style.border = "15px solid #F2F3F4";
        productId.style.backgroundColor = "#F2F3F4";
    }

    const onMouseLeaveProduct = (e) => {
        productId.style.border = "none";
        productId.style.backgroundColor = "white";
    }

    const onProductClick = () => {
        console.log(props.product);

        dispatch({
            type: "SET_PRODUCT_TYPE",
            payload: {
                productType: props.product.type
            }
        })

        navigate("/products/" +  props.product._id);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        

    }

    return (
        <>
            <Row className="text-center m-0" id={props.product._id} onClick={onProductClick} onMouseEnter={onMouseEnterProduct} onMouseLeave={onMouseLeaveProduct}>
                <Grid className="square" style={{backgroundImage: "url(" + props.product.imageUrl + ")"}}>
                </Grid>
                <p className="mt-1 mb-0 p-0 product-name">{props.product.name}</p>
                <p>
                    <a className="old-price">${props.product.buyPrice}</a>&nbsp;
                    <a className="new-price">${props.product.promotionPrice}</a>
                </p>
            </Row>
        </>
    )
}

export default ProductCard
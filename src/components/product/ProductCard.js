import { Grid } from "@mui/material";
import {Row} from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function ProductCard(props) {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    let productId = document.getElementById(props.product._id);

    const onMouseEnterProduct = (e) => {
        productId.style.border = "1px solid black";
        productId.style.color = "white";
        productId.style.backgroundColor = "black";
    }

    const onMouseLeaveProduct = (e) => {
        productId.style.border = "none";
        productId.style.color = "black";
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
                <p className="h5 mt-1">{props.product.name}</p>
                <p>
                    <a className="old-price">${props.product.buyPrice}</a>&nbsp;
                    <a className="new-price">${props.product.promotionPrice}</a>
                </p>
            </Row>
        </>
    )
}

export default ProductCard
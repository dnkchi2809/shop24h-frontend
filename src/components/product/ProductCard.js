import { Grid } from "@mui/material";
import {Row} from "reactstrap";
import { useParams, useNavigate } from "react-router-dom"

function ProductCard(props) {
    const navigate = useNavigate();

    const onProductClick = () => {
        console.log(props.product)
        navigate("/products/" +  props.product._id)
    }

    return (
        <>
            <Row className="text-center m-0" onClick={onProductClick}>
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
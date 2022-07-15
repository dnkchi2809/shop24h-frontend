import { Grid } from "@mui/material"
import {Row} from "reactstrap"

function ProductCard(props) {
    console.log(props.props)
    return (
        <>
            <Row className="text-center m-0">
                <Grid className="square" style={{backgroundImage: "url(" + props.props.imageUrl + ")"}}>
                </Grid>
                <p className="h5 mt-1">{props.props.name}</p>
                <p>
                    <a className="old-price">{props.props.buyPrice}</a>&nbsp;
                    <a className="new-price">${props.props.promotionPrice}</a>
                </p>
            </Row>
        </>
    )
}

export default ProductCard
import { Grid, Typography } from "@mui/material"
import { Row, Col } from "react-bootstrap"

function ContentComponent() {
    return (
        <>
            <Grid style={{ marginTop: "4%", marginLeft: "5%", marginRight: "5%" }}>
                <Row className="text-center">
                    <Typography>
                        <h3>LASTED PRODUCT</h3>
                    </Typography>
                </Row>
                <Row>

                </Row>
                <Row className="justify-content-center">
                    <Col className="col-2">
                        <btn className="btn btn-dark w-100">VIEW ALL</btn>
                    </Col>
                </Row>
            </Grid>
        </>
    )
}

export default ContentComponent
import { Grid } from "@mui/material";
import { Col, Row } from "reactstrap";
import logoImg from "../app/image/logo-white.PNG";

function FooterComponent() {
    return (
        <>
            <Grid style={{ color: "#0093FB", height: "180px" }}>
                <Grid className="container">
                    <Row className="pt-2">
                        <Col className="col-2">
                            <h5>PRODUCTS</h5>
                            <a className="text-secondary" href="#" style={{ textDecoration: "none" }}>Help Center</a><br />
                            <a className="text-secondary" href="#" style={{ textDecoration: "none" }}>Contact Us</a><br />
                            <a className="text-secondary" href="#" style={{ textDecoration: "none" }}>Product Help</a><br />
                            <a className="text-secondary" href="#" style={{ textDecoration: "none" }}>Warranty</a><br />
                            <a className="text-secondary" href="#" style={{ textDecoration: "none" }}>Order Status</a><br />
                        </Col>
                        <Col className="col-2">
                            <h5>SERVICES</h5>
                            <a className="text-secondary" href="#" style={{ textDecoration: "none" }}>Help Center</a><br />
                            <a className="text-secondary" href="#" style={{ textDecoration: "none" }}>Contact Us</a><br />
                            <a className="text-secondary" href="#" style={{ textDecoration: "none" }}>Product Help</a><br />
                            <a className="text-secondary" href="#" style={{ textDecoration: "none" }}>Warranty</a><br />
                            <a className="text-secondary" href="#" style={{ textDecoration: "none" }}>Order Status</a><br />
                        </Col>
                        <Col className="col-2">
                            <h5>SUPPORT</h5>
                            <a className="text-secondary" href="#" style={{ textDecoration: "none" }}>Help Center</a><br />
                            <a className="text-secondary" href="#" style={{ textDecoration: "none" }}>Contact Us</a><br />
                            <a className="text-secondary" href="#" style={{ textDecoration: "none" }}>Product Help</a><br />
                            <a className="text-secondary" href="#" style={{ textDecoration: "none" }}>Warranty</a><br />
                            <a className="text-secondary" href="#" style={{ textDecoration: "none" }}>Order Status</a><br />
                        </Col>
                        <Col className="col-6 justify-content-center">
                            <Row className="justify-content-center">
                                <img src={logoImg} style={{ width: "25%" }} />
                            </Row>
                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <i className="fa-brands fa-facebook m-2 fa-lg"></i>&nbsp;
                                    <i className="fa-brands fa-instagram m-2 fa-lg"></i>&nbsp;
                                    <i className="fa-brands fa-youtube m-2 fa-lg"></i>&nbsp;
                                    <i className="fa-brands fa-twitter m-2 fa-lg"></i>&nbsp;
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </Grid>
            </Grid>
        </>
    )
}

export default FooterComponent
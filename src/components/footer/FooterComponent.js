import { Grid } from "@mui/material";
import { Col, Row } from "reactstrap";
import logoImg from "../../app/image/logo-white.PNG";

function FooterComponent() {
    return (
        <>
            <Grid className="mb-2">
                <Grid className="container">
                    <Row className="pt-2">
                        <Col className="col-3">
                            <a className="footer-title">PRODUCTS</a><br />
                            <a href="#" className="footer-content">Help Center</a><br />
                            <a href="#" className="footer-content">Contact Us</a><br />
                            <a href="#" className="footer-content">Product Help</a><br />
                            <a href="#" className="footer-content">Warranty</a><br />
                            <a href="#" className="footer-content">Order Status</a><br />
                        </Col>
                        <Col className="col-3">
                            <a className="footer-title">SERVICES</a><br />
                            <a href="#" className="footer-content">Help Center</a><br />
                            <a href="#" className="footer-content">Contact Us</a><br />
                            <a href="#" className="footer-content">Product Help</a><br />
                            <a href="#" className="footer-content">Warranty</a><br />
                            <a href="#" className="footer-content">Order Status</a><br />
                        </Col>
                        <Col className="col-3">
                            <a className="footer-title">SUPPORT</a><br />
                            <a href="#" className="footer-content">Help Center</a><br />
                            <a href="#" className="footer-content">Contact Us</a><br />
                            <a href="#" className="footer-content">Product Help</a><br />
                            <a href="#" className="footer-content">Warranty</a><br />
                            <a href="#" className="footer-content">Order Status</a><br />
                        </Col>
                        <Col className="col-3 d-flex align-items-end flex-column">
                            <Row className="footer-logo">
                                <Grid className="square" style={{backgroundImage: "url(" + logoImg + ")"}}></Grid>
                            </Row>
                            <Row className="footer-logo">
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
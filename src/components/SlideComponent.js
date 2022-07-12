import { Grid, Typography } from "@mui/material"
import { Row, Col } from "reactstrap";
import Carousel from 'react-bootstrap/Carousel';

function SlideComponent() {
    return (
        <>
            <Grid style={{ marginTop: "10%", marginLeft: "5%", marginRight: "5%"}}>
                <Row className="align-items-center">
                    <Col className="col-7 p-5">
                        <Row>
                            <h1>Jadu Shop</h1>
                        </Row>
                        <Typography className="text-secondary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>
                        <Row className="mt-3">
                            <Col className="col-4">
                                <button className="btn border-primary text-primary btn-lg">SHOP NOW</button>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="col-5">
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="w-100"
                                    src={require("../app/image/slide/slide1.jpg")}
                                    alt="First slide"
                                    style={{width : "400px", height : "400px", objectFit: "contain"}}
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={require("../app/image/slide/slide2.jpg")}
                                    alt="Second slide"
                                    style={{width : "400px", height : "400px", objectFit: "contain"}}
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={require("../app/image/slide/slide3.jpg")}
                                    alt="Third slide"
                                    style={{width : "400px", height : "400px", objectFit: "contain"}}
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={require("../app/image/slide/slide4.jpg")}
                                    alt="Fourth slide"
                                    style={{width : "400px", height : "400px", objectFit: "contain"}}
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>


            </Grid>
        </>
    )
}

export default SlideComponent
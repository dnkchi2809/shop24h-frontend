import { Grid, Typography } from "@mui/material"
import { Container, Row, Col } from "reactstrap";
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from "react-router-dom";

function SlideComponent() {
    const navigate = useNavigate();

    const onBtnShopNowClick = () => {
        navigate("/products");
    }

    return (
        <>
            <Container>
                <Row className="align-items-center">
                    <Col className="col-6 p-5">
                        <Row>
                            <h1>Jadu Shop</h1>
                        </Row>
                        <Typography className="text-secondary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        </Typography>
                        <Row className="mt-3">
                            <Col className="col-4">
                                <button className="btn border-primary text-primary btn-lg" onClick={onBtnShopNowClick}>SHOP NOW</button>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="col-6">
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="w-100"
                                    src={require("../../app/image/slide/slide1.jpg")}
                                    alt="First slide"
                                    style={{width : "500px", height : "500px", objectFit: "contain"}}
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={require("../../app/image/slide/slide2.jpg")}
                                    alt="Second slide"
                                    style={{width : "500px", height : "500px", objectFit: "contain"}}
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={require("../../app/image/slide/slide3.jpg")}
                                    alt="Third slide"
                                    style={{width : "500px", height : "500px", objectFit: "contain"}}
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={require("../../app/image/slide/slide4.jpg")}
                                    alt="Fourth slide"
                                    style={{width : "500px", height : "500px", objectFit: "contain"}}
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SlideComponent
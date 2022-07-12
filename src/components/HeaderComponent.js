import { Grid } from "@mui/material"
import { Input, Row, Col, List, ListInlineItem } from "reactstrap";
import logoImg from "../app/image/logo.PNG";

function HeaderComponent() {
    return (
        <>
            <Grid style={{ backgroundColor: "#0093FB", color: "white", display: "cover", paddingBottom: "1%" }} className="fixed-top">
                <Grid className="container">
                    <Row>
                        <Col className="col-8">
                            <List type="inline">
                                <ListInlineItem>
                                    <i class="fa-solid fa-house"></i>&nbsp;
                                    Home
                                </ListInlineItem>
                                <ListInlineItem style={{ marginLeft: "5%" }}>
                                    <i class="fa-solid fa-phone"></i>&nbsp;
                                    Contact Us
                                </ListInlineItem>
                            </List>
                        </Col>
                        <Col className="col-4 justify-content-end">
                            <List type="inline">
                                <ListInlineItem style={{ marginLeft: "46%" }}>
                                    <i class="fa-solid fa-bell"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <i class="fa-solid fa-circle-user"></i>
                                </ListInlineItem>
                                <ListInlineItem style={{ marginLeft: "5%" }}>
                                    Sign In
                                </ListInlineItem>
                                <ListInlineItem style={{ marginLeft: "5%" }}>
                                    Log In
                                </ListInlineItem>
                            </List>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-2 d-flex justify-content-center">
                            <img src={logoImg} style={{ width: "50%", objectFit: "contain" }} />
                        </Col>
                        <Col className="col-8">
                            <Row style={{ backgroundColor: "white" }} className="mt-3">
                                <Col className="col-11">
                                    <Input placeholder="Nhập thông tin" style={{ border: "none" }} />
                                </Col>
                                <Col className="col-1 mt-1 text-center">
                                    <i class="fa-solid fa-magnifying-glass text-primary"></i>
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <List type="inline" style={{ color: "#d6e0f5", fontSize: "85%", paddingLeft: "0" }}>
                                    <ListInlineItem>
                                        Áo thun
                                    </ListInlineItem>
                                    <ListInlineItem style={{ marginLeft: "2%" }}>
                                        Áo kiểu
                                    </ListInlineItem>
                                    <ListInlineItem style={{ marginLeft: "2%" }}>
                                        Quần jean
                                    </ListInlineItem>
                                    <ListInlineItem style={{ marginLeft: "2%" }}>
                                        Đầm
                                    </ListInlineItem>
                                    <ListInlineItem style={{ marginLeft: "2%" }}>
                                        Short
                                    </ListInlineItem>
                                </List>
                            </Row>
                        </Col>
                        <Col className="col-1" style={{ marginLeft: "3%" }}>
                            <Row className="mt-3 ">
                                <i class="fa-solid fa-cart-shopping fa-2x"></i>
                            </Row>
                            <Row>

                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </Grid>
        </>
    )
}

export default HeaderComponent
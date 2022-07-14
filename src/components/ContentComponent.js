import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap"

function ContentComponent() {
    const { productList } = useSelector((reduxData) => reduxData.reducers);

    useEffect(() => {

    }, [])
    return (
        <>
            <Row>
                {
                    productList !== null
                        ?
                        productList.map((element, index) => {
                            return (
                                <Col className="col-3 mt-3 mb-4">
                                    <Row className="text-center p-0 m-0">
                                        <img
                                            src={element.imageUrl}
                                            className="p-0"
                                            style={{ width: "300px", height: "300px", objectFit: "cover" }}
                                        />
                                        <p className="h5 mt-1">{element.name}</p>
                                        <p>
                                            <a className="old-price">{element.buyPrice}</a>&nbsp;
                                            <a className="new-price">${element.promotionPrice}</a>
                                        </p>
                                    </Row>
                                </Col>
                            )
                        })
                        :
                        null
                }
            </Row>
        </>
    )
}

export default ContentComponent
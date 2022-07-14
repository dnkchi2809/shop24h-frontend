import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Grid } from "@mui/material";
import Pagination from '@mui/material/Pagination';

function ContentComponent() {
    const { productList, lowPrice, highPrice } = useSelector((reduxData) => reduxData.reducers);

    const limit = 12;

    const [pageIndex, setPageIndex] = useState(1);

    const [pageAmount, setPageAmount] = useState(0);

    const [data, setData] = useState([])

    const [rows, setRows] = useState(null);

    const onPageIndexChange = (event, value) => {
        setPageIndex(value);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        setData(productList.filter((element, index) => {
            return element.promotionPrice >= lowPrice && element.promotionPrice <= highPrice
        }))

        setPageAmount(Math.ceil(data.length / limit));
        setRows(data.slice((pageIndex - 1) * limit, pageIndex * limit));

    })
    return (
        <>
            <Row>
                {
                    rows !== null
                        ?
                        rows.map((element, index) => {
                            if (element.promotionPrice >= lowPrice && element.promotionPrice <= highPrice) {
                                return (
                                    <Col className="col-4 mt-3 mb-4">
                                        <Row className="text-center p-0 m-0">
                                            <img
                                                src={element.imageUrl}
                                                className="p-1"
                                                style={{ width: "100%", height: "300px", objectFit: "cover" }}
                                            />
                                            <p className="h5 mt-1">{element.name}</p>
                                            <p>
                                                <a className="old-price">{element.buyPrice}</a>&nbsp;
                                                <a className="new-price">${element.promotionPrice}</a>
                                            </p>
                                        </Row>
                                    </Col>
                                )
                            }

                        })
                        :
                        null
                }
            </Row>

            {/* Pagination */}
            <Grid className="mb-5 d-flex justify-content-end">
                <Pagination count={pageAmount} defaultPage={pageIndex} onChange={onPageIndexChange} />
            </Grid>
        </>
    )
}

export default ContentComponent
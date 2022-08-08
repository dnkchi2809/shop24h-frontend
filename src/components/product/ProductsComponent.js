import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Grid } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";

function ContentComponent() {
    const { productList, lowPrice, highPrice, productType } = useSelector((reduxData) => reduxData.reducers);

    const limit = 9;

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

    const search = useLocation().search;
    const keyword = new URLSearchParams(search).get('name');

    useEffect(() => {
        //setPageIndex(1);
        onPageIndexChange(null, 1);
    }, [pageAmount]);

    useEffect(() => {
        if (keyword) {
            const resultFilter = [];
            productList.map((element, index) => {
                let vInput = keyword.toLowerCase();
                let vElement = element.name.toLowerCase();
                if (vElement.search(vInput) >= 0) {
                    resultFilter.push(element)
                }
                setData(resultFilter.filter((element, index) => {
                    return element.promotionPrice >= lowPrice && element.promotionPrice <= highPrice
                }))
            })
        }
        else if (productType !== "") {
            setData(productList.filter((element, index) => {
                return element.promotionPrice >= lowPrice && element.promotionPrice <= highPrice && element.type == productType
            }));
        }
        else {
            setData(productList.filter((element, index) => {
                return element.promotionPrice >= lowPrice && element.promotionPrice <= highPrice
            }));
        }

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
                                    <Grid className="col-product-card-component">
                                        <ProductCard product={element} />
                                    </Grid>
                                )
                            }

                        })
                        :
                        null
                }
            </Row>

            {/* Pagination */}
            <Grid className="mb-5 d-flex justify-content-end">
                <Pagination count={pageAmount} page={pageIndex} onChange={onPageIndexChange} />
            </Grid>
        </>
    )
}

export default ContentComponent
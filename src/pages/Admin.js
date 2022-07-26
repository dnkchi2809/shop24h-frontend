import { Row, Col } from "react-bootstrap"
import ContentAdmin from "../components/admin/ContentAdmin"
import FooterAdmin from "../components/admin/FooterAdmin"
import HeaderAdmin from "../components/admin/HeaderAdmin"
import MenuAdmin from "../components/admin/MenuAdmin"

function Admin(){
    return (
        <>
        <HeaderAdmin/>
        <Row>
            <Col>
                <MenuAdmin/>
            </Col>
            <Col>
                <ContentAdmin/>
            </Col>
        </Row>
        <FooterAdmin/>
        </>
    )
}

export default Admin
import { Grid } from "@mui/material"
import { Row, Col } from "react-bootstrap"
import ContentAdmin from "../components/admin/ContentAdmin"
import FooterAdmin from "../components/admin/FooterAdmin"
import HeaderAdmin from "../components/admin/HeaderAdmin"
import MenuAdmin from "../components/admin/MenuAdmin"

function Admin() {
    return (
        <Grid className="hold-transition sidebar-mini layout-fixed">
            <div class="wrapper">
            <HeaderAdmin />

            <MenuAdmin />

            <ContentAdmin />

            <FooterAdmin />
            </div>
        </Grid>
    )
}

export default Admin
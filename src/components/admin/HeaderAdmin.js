import { Grid } from "@mui/material"

function HeaderAdmin() {
    return (
        <>
            <Grid>
                <nav className="main-header navbar navbar-expand navbar-light navbar-light">
                    
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <a href="#" className="nav-link">Shop Management</a>
                        </li>
                    </ul>

                    
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                                <i className="fas fa-expand-arrows-alt"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
            </Grid>
        </>
    )
}

export default HeaderAdmin
import { Grid } from "@mui/material"
import { Row, Col } from "reactstrap"

function MenuAdmin(){
    return (
        <>
        <Grid>
        <aside className="main-sidebar sidebar-dark-warning elevation-4">
            
            <a href="quanlydonhang.html" className="brand-link">
                <span className="brand-text font-weight-light">Task 49.10</span>
            </a>

            
            <div className="sidebar">
                
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                        
                        <li className="nav-item">
                            <a href="quanlydonhang.html" className="nav-link">
                                <i className="nav-icon fas fa-home"></i>
                                <p>Trang chủ</p>
                            </a>
                        </li>
                        <li className="nav-item menu-open">
                            
                            <a href="#" className="nav-link active">
                                <i className="nav-icon fas fa-list"></i>
                                <p>
                                    Nội dung quản lý
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="quanlydonhang.html" className="nav-link">
                                        &emsp;&ensp;<i className="nav-icon fas fa-dot-circle"></i>
                                        <p>Danh sách đơn hàng</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                
            </div>
            
        </aside>
        </Grid>
        </>
    )
}

export default MenuAdmin
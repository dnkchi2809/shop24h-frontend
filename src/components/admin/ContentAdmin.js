function ContentAdmin() {
    return (
        <>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <div className="row bg-danger">
                                    <h1 className="m-0">Danh sách đơn hàng</h1>
                                    <button className="ml-3 btn btn-warning" id="btn-create-order">
                                        <i className="nav-icon fas fa-plus"></i>&nbsp; Thêm mới
                                    </button>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="quanlydonhang.html">Home</a></li>
                                    <li className="breadcrumb-item active">Order List</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ContentAdmin
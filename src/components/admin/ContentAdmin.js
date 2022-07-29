import { useSelector, useDispatch } from "react-redux";
import CustomerTable from "./content/CustomerTable";
import OrderTable from "./content/OrderTable";
import ProductTable from "./content/ProductTable";
import ProductTypeTable from "./content/ProductTypeTable";

function ContentAdmin() {
    const { headerAdmin, breadcrumbAdmin1, breadcrumbAdmin2 } = useSelector((reduxData) => reduxData.reducers);
    return (
        <>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <div className="row">
                                    <h1 className="m-0">{headerAdmin}</h1>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/admin">Home</a></li>
                                    {
                                        breadcrumbAdmin1 !== null
                                            ?
                                            <li className="breadcrumb-item active">{breadcrumbAdmin1}</li>
                                            :
                                            null
                                    }
                                    {
                                        breadcrumbAdmin2 !== null
                                            ?
                                            <li className="breadcrumb-item active">{breadcrumbAdmin2}</li>
                                            :
                                            null
                                    }
                                </ol>
                            </div>
                        </div>
                        {/* content table*/}
                        {
                            breadcrumbAdmin2 == "Customer"
                                ?
                                <CustomerTable />
                                :
                                null
                        }
                        {
                            breadcrumbAdmin2 == "Order"
                                ?
                                <OrderTable />
                                :
                                null
                        }
                        {
                            breadcrumbAdmin2 == "Product"
                                ?
                                <ProductTable />
                                :
                                null
                        }
                        {
                            breadcrumbAdmin2 == "Product Type"
                                ?
                                <ProductTypeTable />
                                :
                                null
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default ContentAdmin
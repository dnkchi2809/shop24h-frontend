const initialState = {
    user: null,
    openLoginModal: false,
    openSignInModal: false,
    openOrderModal: false,
    productList: [],
    lowPrice: 0,
    highPrice: 999999999999,
    productType: "",
    openSnackbar: false,
    totalAmount: 0,
    alertString: "",
    alertSeverity: "error",
    breadcrumb1: null,
    breadcrumb2: null,
    breadcrumb3: null,
    headerAdmin: "Shop Management",
    breadcrumbAdmin1: null,
    breadcrumbAdmin2: null,

    openCreateUserModal: false,
    openEditUserModal: false,
    openDeleteUserModal: false,

    openCreateOrderModal: false,
    openEditOrderModal: false,
    openDeleteOrderModal: false,

    openCreateProductModal: false,
    openEditProductModal: false,
    openDeleteProductModal: false,

    openCreateProductTypeModal: false,
    openEditProductTypeModal: false,
    openDeleteProductTypeModal: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload.user
            };
            break;
        case "LOGIN_MODAL":
            return {
                ...state,
                openLoginModal: action.payload.openLoginModal
            };
            break;
        case "SIGNIN_MODAL":
            return {
                ...state,
                openSignInModal: action.payload.openSignInModal
            };
            break;
        case "ORDER_MODAL":
            return {
                ...state,
                openOrderModal: action.payload.openOrderModal
            };
            break;
        case "GET_PRODUCT_LIST":
            return {
                ...state,
                productList: action.payload.productList
            };
            break;
        case "SET_PRICE_LOW":
            return {
                ...state,
                lowPrice: action.payload.lowPrice
            };
            break;
        case "SET_PRICE_HIGH":
            return {
                ...state,
                highPrice: action.payload.highPrice
            };
            break;
        case "SET_PRODUCT_TYPE":
            return {
                ...state,
                productType: action.payload.productType
            };
            break;
        case "OPEN_SNACKBAR":
            return {
                ...state,
                openSnackbar: action.payload.openSnackbar,
                alertString: action.payload.alertString
            };
            break;
        case "ALERT_SEVERITY":
            return {
                ...state,
                alertSeverity: action.payload.alertSeverity
            };
            break;
        case "SET_TOTAL_AMOUNT":
            return {
                ...state,
                totalAmount: action.payload.totalAmount
            };
            break;
        case "SET_BREADCRUMB":
            return {
                ...state,
                breadcrumb1: action.payload.breadcrumb1,
                breadcrumb2: action.payload.breadcrumb2,
                breadcrumb3: action.payload.breadcrumb3
            };
            break;
        case "SET_HEADER_ADMIN":
            return {
                ...state,
                headerAdmin: action.payload.headerAdmin,
            };
            break;
        case "SET_BREADCRUMB_ADMIN":
            return {
                ...state,
                breadcrumbAdmin1: action.payload.breadcrumbAdmin1,
                breadcrumbAdmin2: action.payload.breadcrumbAdmin2
            };
            break;
        case "CREATE_USER_MODAL":
            return {
                ...state,
                openCreateUserModal: action.payload.openCreateUserModal
            };
            break;
        case "EDIT_USER_MODAL":
            return {
                ...state,
                openEditUserModal: action.payload.openEditUserModal
            };
            break;
        case "DELETE_USER_MODAL":
            return {
                ...state,
                openDeleteUserModal: action.payload.openDeleteOrderModal
            };
            break;
        case "CREATE_ORDER_MODAL":
            return {
                ...state,
                openCreateOrderModal: action.payload.openCreateOrderModal
            };
            break;
        case "EDIT_ORDER_MODAL":
            return {
                ...state,
                openEditOrderModal: action.payload.openEditOrderModal
            };
            break;
        case "DELETE_ORDER_MODAL":
            return {
                ...state,
                openDeleteOrderModal: action.payload.openDeleteOrderModal
            };
            break;
        case "CREATE_PRODUCT_MODAL":
            return {
                ...state,
                openCreateProductModal: action.payload.openCreateProductModal
            };
            break;
        case "EDIT_PRODUCT_MODAL":
            return {
                ...state,
                openEditProductModal: action.payload.openEditProductModal
            };
            break;
        case "DELETE_PRODUCT_MODAL":
            return {
                ...state,
                openDeleteProductModal: action.payload.openDeleteProductModal
            };
            break;
        case "CREATE_PRODUCTTYPE_MODAL":
            return {
                ...state,
                openCreateProductTypeModal: action.payload.openCreateProductTypeModal
            };
            break;
        case "EDIT_PRODUCTTYPE_MODAL":
            return {
                ...state,
                openEditProductTypeModal: action.payload.openEditProductTypeModal
            };
            break;
        case "DELETE_PRODUCTTYPE_MODAL":
            return {
                ...state,
                openDeleteProductTypeModal: action.payload.openDeleteProductTypeModal
            };
            break;
        default:
            return initialState;
            break;
    }
}

export default appReducer;
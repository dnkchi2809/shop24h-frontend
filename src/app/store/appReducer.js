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
    alertString: "",
    alertSeverity: "error"
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
        default:
            return initialState;
            break;
    }
}

export default appReducer;
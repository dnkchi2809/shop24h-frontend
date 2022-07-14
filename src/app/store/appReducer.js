const initialState = {
    user: null,
    openLoginModal: false,
    openSignInModal: false,
    productList: [],
    lowPrice: 0,
    highPrice: 999999999999
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
        default:
            return initialState;
            break;
    }
}

export default appReducer;
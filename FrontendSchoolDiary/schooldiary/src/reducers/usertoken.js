const initState = {
    isStartingRequest: false,
    isErrorRequest: false,
    isResultedRequest: false,
    isResultedRequestWithError: false,
    items: {}
};

export default function usertoken(state = initState, action){
    switch (action.type) {
        case "REQUEST_USERTOKEN_STARTING":
            return {
                isStartingRequest: true,
                isErrorRequest: false,
                isResultedRequest: false,
                isResultedRequestWithError: false,
                items: {}
            };
        case "REQUEST_USERTOKEN_ERROR":
            return {
                isStartingRequest: false,
                isErrorRequest: true,
                isResultedRequest: false,
                isResultedRequestWithError: false,
                items: {}
            };
        case "REQUEST_USERTOKEN_RESULTED":
            return {
                isStartingRequest: false,
                isErrorRequest: false,
                isResultedRequest: true,
                isResultedRequestWithError: false,
                items: action.payload
            };
        case "REQUEST_USERTOKEN_RESULTED_WITH_ERROR":
            return {
                isStartingRequest: false,
                isErrorRequest: false,
                isResultedRequest: false,
                isResultedRequestWithError: true,
                items: action.payload
            };
        case "USERTOKEN_LOGOUT":
            return initState;
        default:
            return state;
    }
}
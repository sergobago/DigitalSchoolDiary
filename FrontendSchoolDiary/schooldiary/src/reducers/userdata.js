const initState = {
    isStartingRequest: false,
    isErrorRequest: false,
    isResultedRequest: false,
    isResultedRequestWithError: false,
    items: {}
};

export default function userdata(state = initState, action){
    switch (action.type) {
        case "REQUEST_USERDATA_STARTING":
            return {
                isStartingRequest: true,
                isErrorRequest: false,
                isResultedRequest: false,
                isResultedRequestWithError: false,
                items: {}
            };
        case "REQUEST_USERDATA_ERROR":
            return {
                isStartingRequest: false,
                isErrorRequest: true,
                isResultedRequest: false,
                isResultedRequestWithError: false,
                items: {}
            };
        case "REQUEST_USERDATA_RESULTED":
            return {
                isStartingRequest: false,
                isErrorRequest: false,
                isResultedRequest: true,
                isResultedRequestWithError: false,
                items: action.payload
            };
        case "REQUEST_USERDATA_RESULTED_WITH_ERROR":
            return {
                isStartingRequest: false,
                isErrorRequest: false,
                isResultedRequest: false,
                isResultedRequestWithError: true,
                items: action.payload
            };
        default:
            return state;
    }
}
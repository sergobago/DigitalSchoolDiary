const initState = {
    isStartingRequest: false,
    isErrorRequest: false,
    isResultedRequest: false,
    isResultedRequestWithError: false,
    items: []
};

export default function diary(state = initState, action){
    switch (action.type) {
        case "REQUEST_TEACHERSTUDENTSMARKS_STARTING":
            return {
                isStartingRequest: true,
                isErrorRequest: false,
                isResultedRequest: false,
                isResultedRequestWithError: false,
                items: []
            };
        case "REQUEST_TEACHERSTUDENTSMARKS_ERROR":
            return {
                isStartingRequest: false,
                isErrorRequest: true,
                isResultedRequest: false,
                isResultedRequestWithError: false,
                items: []
            };
        case "REQUEST_TEACHERSTUDENTSMARKS_RESULTED":
            return {
                isStartingRequest: false,
                isErrorRequest: false,
                isResultedRequest: true,
                isResultedRequestWithError: false,
                items: action.payload
            };
        case "REQUEST_TEACHERSTUDENTSMARKS_RESULTED_WITH_ERROR":
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
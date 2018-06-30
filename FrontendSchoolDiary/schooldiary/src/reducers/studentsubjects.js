const initState = {
    isStartingRequest: false,
    isErrorRequest: false,
    isResultedRequest: false,
    isResultedRequestWithError: false,
    items: []
};

export default function studentsubjects(state = initState, action){
    switch (action.type) {
        case "REQUEST_STUDENTSUBJECTS_STARTING":
            return {
                isStartingRequest: true,
                isErrorRequest: false,
                isResultedRequest: false,
                isResultedRequestWithError: false,
                items: []
            };
        case "REQUEST_STUDENTSUBJECTS_ERROR":
            return {
                isStartingRequest: false,
                isErrorRequest: true,
                isResultedRequest: false,
                isResultedRequestWithError: false,
                items: []
            };
        case "REQUEST_STUDENTSUBJECTS_RESULTED":
            return {
                isStartingRequest: false,
                isErrorRequest: false,
                isResultedRequest: true,
                isResultedRequestWithError: false,
                items: action.payload
            };
        case "REQUEST_STUDENTSUBJECTS_RESULTED_WITH_ERROR":
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
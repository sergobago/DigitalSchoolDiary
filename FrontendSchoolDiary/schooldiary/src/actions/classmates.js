import axios from 'axios';
import { url_path_main_server } from './../configurePath';
import {actionUserDataLogout} from './logout';

export const asyncRequestClassmates = (history, token) => dispatch => {
    dispatch({ type:"REQUEST_CLASSMATES_STARTING" });
    axios.get(url_path_main_server + '/getstudentclassmates', { headers: {'jwt-token-x-api-key': token} }).then(function (response) {
        if(response.status === 200){
            const result_payload = response.data[0];
            if(result_payload.status === 200){
                dispatch({ type:"REQUEST_CLASSMATES_RESULTED", payload: result_payload.classmates });
            }else{
                dispatch({ type:"REQUEST_CLASSMATES_RESULTED_WITH_ERROR", payload: result_payload });
                if(result_payload.logout) dispatch(actionUserDataLogout(history));
            }
        }else{
            dispatch({ type:"REQUEST_CLASSMATES_ERROR" });
            console.log("Error request " + response.status);
        }
    }).catch(function (error) {
        dispatch({ type:"REQUEST_CLASSMATES_ERROR" });
        console.log(error);
    });
};